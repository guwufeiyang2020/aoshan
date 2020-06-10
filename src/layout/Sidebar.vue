<template>
	<!-- 菜单 -->
	<div class="sidebar-wrapper">
		<el-menu
			:default-active="activeIndex"
			class="el-menu-vertical-demo"
			background-color="#2a3651"
			text-color="#fff"
			active-text-color="#ffd04b"
			:unique-opened="true"
		>
			<el-submenu :index="item.id" v-for="(item, index) in asideMenu" :key="index">
				<template slot="title">
					<i class="iconss qycloud iconBg" :class="item.icon_name"></i>
					<span slot="title">{{ item.name }}</span>
				</template>
				<el-menu-item-group>
					<el-menu-item
						:index="subItem.id"
						v-for="(subItem, subIndex) in item.children"
						:key="subIndex"
						@click="clickMenu(subItem)"
					>
						<i class="iconss qycloud iconBg" :class="subItem.icon_name"></i>
						<span slot="title">{{ subItem.name }}</span>
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Sidebar',
  data() {
    return {
      activeIndex: '',
      operateMenus: []
    };
  },
  computed: {
    ...mapState({
      selectMenu: state => state.menu.selectMenuObj,
      asideMenu: state => state.menu.menuList
    })
  },
  created() {},
  methods: {
    clickMenu(subItem) {
      this.$store.commit('SET_MENU', subItem);
      this.$router.push({
        path: `/appList/${subItem.app_type}/${subItem.app_id}/aoshanxueyuan`
      });
    },

    initData() {
      this.$store.dispatch('queryMenuList').then((asideMenu) => {
        asideMenu.forEach((item) => {
          item.children.forEach((subItem) => {
            this.operateMenus.push({
              id: subItem.id,
              appType: subItem.app_type,
              appId: subItem.app_id
            });
          });
        });
        // console.log(this.operateMenus);
        let firstMenu = this.operateMenus[0];
        if (this.selectMenu && this.selectMenu.id) {
          this.activeIndex = this.selectMenu.id;
        } else {
          this.activeIndex = firstMenu.id;
        }
        if (this.activeIndex && (this.$route.path === '/appList' || this.$route.path === '/')) {
          this.$router.push({
            path: `/appList/${firstMenu.appType}/${firstMenu.appId}/aoshanxueyuan`
          });
        }
      });
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-menu-item-group__title {
	padding: 0;
}
.el-menu {
	border-right: 0 none;
}
.iconBg:before {
	background: transparent;
}
.iscurrent {
	color: #41b883;
}
.iconss {
	font-size: 20px;
	display: inline-block;
	width: 40px;
	height: 40px;
	line-height: 40px !important;
	position: relative;
	&:before {
		position: absolute;
		top: 0;
		left: -4px;
		display: inline-block;
		width: 40px;
		height: 40px;
	}
}
</style>
