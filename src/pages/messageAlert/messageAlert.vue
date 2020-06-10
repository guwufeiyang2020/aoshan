<template>
	<!-- 头部 -->
	<div class="message-wrapper">
		<div class="section-wrapper">
			<span class="label">请添加短信接收人:</span>
			<div class="section-content">
				<div>
					<button class="btn" @click="openOrgDialog">+</button
					><span class="tip">请点击按钮，添加短信接收人员</span>
				</div>
				<div class="select-person" v-if="selectPersons.length > 0">
					已选人员: {{ selectPersons }}
				</div>
			</div>
		</div>
		<div class="section-wrapper">
			<span class="label">短信内容:</span>
			<div class="msgContent">
				【岙山学院】中化安全与应急学院培训管理系统：XXX，您好，“中国昊华HSE管理人员培训项目”的班主任李凤云向推送了一条教务/后勤信息，需要您尽快确认，请尽快处理。
			</div>
		</div>
		<div class="section-wrapper">
			<span class="label"></span>
			<div class="section-content">
				<el-button type="primary" @click="sendMsg">发送短信</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { showOrgDialog } from '@qycloud/lego';

export default {
  name: 'org-dialog',
  data() {
    return {
      selectPersons: [],
      selecteds: []
    };
  },
  methods: {
    openOrgDialog() {
      showOrgDialog({
        /* id: 'J_labelShareDialog', */
        selected: null, // 默认选中的节点
        showRoles: null, // 选择节点的范围
        isMember: true, // 是否显示用户
        onlyMember: true, // 只显示用户
        isShowOrg: true, // 是否显示组织架构节点
        isFastContacts: true, // 是否显示用户组和常用联系人
        isSingle: false, // 是否为单选
        count: true, // 是否显示常用联系人的人数统计
        search: true, // 是否显示搜索框
        extendedShowRoles: true, // 额外显示上一级节点
        callBack: null, // 确定按钮回调函数，参数：displayName: 展示名称，selected: 当前选中
        cancel: null, // 取消按钮回调函数,
        isRootSelected: true, // 根节点是否可选（parent:'0'时判断为根节点）
        spaceId: AY.getSpaceInfoOfCurrentPage().spaceId,
        confirm: (selected) => {
          this.selectPersons = [];

          selected.forEach((item) => {
            this.selectPersons.push(item.name);
          });
          this.selecteds = selected;
        }
      });
    },
    sendMsg() {
      let selectedParams = {
        blacklist: JSON.stringify(this.selecteds)
      };
      this.$http.post('/sdkcollege/enclosure/sendMsg', selectedParams).then((res) => {
        this.$message({
          message: res.data,
          type: 'success'
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.message-wrapper {
	width: 100%;
	padding: 30px;
	font-size: 14px;
}
.btn {
	width: 80px;
	height: 34px;
	background-color: #409eff;
	color: #fff;
	font-size: 24px;
	border-radius: 2px;
}
.section-wrapper {
	display: flex;
	margin-bottom: 20px;
	.label {
		width: 116px;
		text-align: right;
		line-height: 34px;
	}
	.section-content {
		margin-left: 20px;
	}
	.tip {
		margin-left: 20px;
		line-height: 34px;
		color: #999;
	}
	.select-person {
		line-height: 40px;
	}
	.msgContent {
		width: 400px;
		padding: 10px;
		// height: 400px;
		background: #f2f2f2;
		border: 1px solid #d8d8d8;
		margin-left: 20px;
	}
}
</style>
