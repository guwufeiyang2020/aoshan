<template>
	<div class="login-wrapper">
		<img src="../../assets/images/logo.png" class="logo" />
		<div class="login-box">
			<ul class="login-title-list">
				<li class="login-title-item active">账号登录</li>
				<li class="login-title-item">二维码登录</li>
			</ul>
			<div class="login-body">
				<el-form
					autocomplete="off"
					:model="loginForm"
					:rules="loginRules"
					ref="loginForm"
					label-position="left"
					label-width="0px"
					class="card-box login-form"
				>
					<el-form-item prop="username">
						<svg-icon icon-class="user" class="icon-svg" />
						<el-input placeholder="请输入邮箱" type="text" v-model="loginForm.username" />
					</el-form-item>
					<el-form-item prop="password">
						<svg-icon icon-class="password" class="icon-svg" />
						<el-input placeholder="请输入密码" type="password" v-model="loginForm.password" />
					</el-form-item>
					<el-form-item prop="verifycode" class="form-item-captcha">
						<el-input placeholder="请输入验证码" type="captcha" v-model="loginForm.verifycode" />
						<span @click="refreshCode" class="yzm">
							<s-identify :identifyCode="identifyCode"></s-identify>
						</span>
					</el-form-item>
					<el-form-item class="login-wrap">
						<el-button type="primary" :loading="loading" style="width:100%;" @click="handleLogin">登录</el-button>
					</el-form-item>
				</el-form>
				<div class="login-footer">
					<el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
					<span>忘记密码?</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import SIdentify from './identify.vue';
import { encryptDes } from '../../assets/js/utils/des';

export default {
  name: 'Login',
  components: {
    SIdentify
  },
  data() {
    // 验证码自定义验证规则
    const validateVerifycode = (rule, value, callback) => {
      let newVal = value.toLowerCase();
      let identifyStr = this.identifyCode.toLowerCase();
      if (newVal === '') {
        callback(new Error('请输入验证码'));
      } else if (newVal !== identifyStr) {
        callback(new Error('验证码不正确!'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
        verifycode: ''
      },
      identifyCodes: '1234567890ABCDEFGHIGKLMNOPQRSTUVWXYZ',
      identifyCode: '',
      rememberPassword: true,
      loading: false,
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        verifycode: [{ required: true, trigger: 'blur', validator: validateVerifycode }]
      }
    };
  },
  methods: {
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const loginParams = {
            loginUserId: this.loginForm.username,
            password: encryptDes(this.loginForm.password)
          };
          this.$store.dispatch('login', loginParams).then((res) => {
            this.loading = false;
            if (res.status === 200) {
              this.$store.commit('SET_USER_INFO', res.data.onlineUserInfo);
              this.$router.push({ path: '/' });
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    // 验证码初始化
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
  }
};
</script>

<style lang="scss" scoped>
.login-wrapper {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: url('../../assets/images/login-bg.png') no-repeat center center;
}
.logo {
	position: absolute;
	top: 30px;
	left: 30px;
}
.login-box {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 408px;
	padding-top: 16px;
	background: #fff;
	border-radius: 3px;
}
.login-title-list {
	height: 52px;
	line-height: 52px;
	display: flex;
	.login-title-item {
		flex: 1;
		margin: 0 60px;
		text-align: center;
		cursor: pointer;
		font-size: 16px;
		font-weight: 600;
		color: #333;
		&.active {
			color: #1b85ff;
			border-bottom: 2px solid #1b85ff;
		}
	}
}
.login-body {
	padding: 36px 32px;
}
.el-form-item {
	position: relative;
	.icon-svg {
		position: absolute;
		left: 9px;
		top: 11px;
		width: 18px;
		height: 18px;
		z-index: 10;
	}
	/deep/ .el-input__inner {
		padding-left: 32px;
	}
}
.form-item-captcha {
	/deep/ .el-form-item__content {
		height: 40px;
	}
	/deep/ .el-input {
		width: 220px;
		margin-right: 10px;
		float: left;
		/deep/ .el-input__inner {
			padding-left: 12px;
		}
	}
	.yzm {
		width: 94px;
		height: 40px;
	}
}
/deep/ .el-button--primary {
	background: #1b85ff;
	outline: none;
	border: 0 none;
}
.login-footer {
	display: flex;
	justify-content: space-between;
	color: #333;
	cursor: pointer;
}
</style>
