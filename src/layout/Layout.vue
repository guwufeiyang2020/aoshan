<template>
	<div>
		<v-header></v-header>
		<div class="main-box">
			<v-sidebar class="sidebar"></v-sidebar>
			<div class="right-content">
				<transition name="fade" mode="out-in">
					<router-view :key="new Date().getTime()"></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import VHeader from '@/layout/Header.vue';
import VSidebar from '@/layout/Sidebar.vue';

export default {
  name: 'VLayout',
  data() {
    return {};
  },
  components: {
    VHeader,
    VSidebar
  }
};
</script>

<style lang="scss" scoped>
.main-box {
	position: absolute;
	top: 60px;
	left: 0;
	right: 0;
	bottom: 0;
}
.sidebar {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 220px;
	overflow-y: auto;
	background: #2a3651;
	color: #fff;
	font-size: 14px;
}
.right-content {
	position: absolute;
	top: 0;
	left: 220px;
	bottom: 0;
	right: 0;
	background: #fff;
	color: #333;
	font-size: 14px;
	overflow-y: auto;
}
</style>
