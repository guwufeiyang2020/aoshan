import Mock from 'mockjs';
import homeApi from './home';
// 设置200-2000毫秒延时请求数据
Mock.setup({
  timeout: '200-2000',
});

// 拦截的是/home/getBannerData
Mock.mock(/\/home\/getBannerData/, 'get', homeApi.getBannerData);

/* const debug = 1;
if (debug) {
  Mock.mock(/login/, {
    data: {
      'userId': '@integer(1,10)',
      'userName|1': ['鲁班七号', '夏侯惇', '蔡文姬', '王昭君', '妲己'],
      'token': '@string(30)'
    },
    msg: 'Success',
    status: 'YQ-000'
  });
  Mock.mock(/getMenu/, {
    data: {
      menu: [
        {
          name: '企业基本信息管理',
          name_en: 'Projects',
          router: '/EntIndex',
          icon: 'el-icon-time',
          children: [
            {
              name: '企业信息',
              name_en: 'Notes',
              router: '/EntIndex',
              icon: 'el-icon-date'
            }, {
              name: '物资信息',
              name_en: 'Notes',
              router: '/AdminIndex',
              icon: 'el-icon-date'
            }
          ]
        },

        {
          name: '组织体系管理',
          name_en: 'Cube',
          icon: 'el-icon-menu',
          children: []
        },
        {
          name: '应急预案管理',
          name_en: 'Cube',

          icon: 'el-icon-menu',
          children: []
        },
        {
          name: '培训管理',
          name_en: 'Cube',

          icon: 'el-icon-menu',
          children: []
        },
        {
          name: '历史应急能力评估',
          name_en: 'Cube',

          icon: 'el-icon-menu',
          children: []
        }
      ]
    },
    msg: 'Success',
    status: 'YQ-000'
  });
}
 */
