<template>
	<!-- 头部 -->
	<div class="header-wrapper">
		<img src="../assets/images/logo1.png" class="logo" />

		<div class="login-area">
			<el-dropdown v-if="userInfo && userInfo.realName">
				<div class="el-dropdown-link">
					{{ userInfo.realName }}
					<i class="ad" ref="guanliyuan"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="jumpUserInfo">个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="layout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'VHeader',
  data() {
    return {
      userImg: require('../assets/images/user.png')
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    // 退出登录
    layout() {
      this.$store.dispatch('layout');
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 60px;
	background: #16213a;
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.logo {
	width: 220px;
}
.login-area {
	font-size: 14px;
	color: #fff;
	cursor: pointer;
	.user {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
}
.login-btn {
	cursor: pointer;
}
.el-dropdown-link {
	display: flex;
	align-items: center;
	color: #fff;
	font-size: 14px;
	.user {
		margin-left: 10px;
	}
}
</style>
