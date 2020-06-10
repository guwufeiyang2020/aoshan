import Layout from '../layout/Layout.vue';

export const routers = [
  // 带头部，尾部页面
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [{
      path: '/appList/:module?/:appId?/:spaceId?',
      name: 'appList',
      component: () => import('../pages/appList/appList.vue'),
      meta: {
        name: '列表页',
      },
    }, {
      path: '/detail/:module?/:appId?/:spaceId?/:form?',
      name: 'detail',
      meta: {
        name: '详情页',
      },
      component: () => import('../pages/appDetail/appDetail.vue')
    }],
  }, {
    path: '/messageAlert',
    name: 'messageAlert',
    meta: {
      name: '消息弹窗',
    },
    component: () => import('../pages/messageAlert/messageAlert.vue')
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      name: '登录',
    },
    component: () => import('../pages/login/login.vue'),
  },

];
