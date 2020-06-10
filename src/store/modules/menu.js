import {
  $http
} from '@commonbox/utils';

const menu = {
  state: {
    selectMenuObj: null,
    menuList: []
  },
  mutations: {
    SET_MENU: (state, selectMenu) => {
      state.selectMenuObj = selectMenu;
    },
    QUERY_MENU: (state, getMenus) => {
      state.menuList = getMenus;
    }
  },
  actions: {
    queryMenuList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        $http.get('/api2/appcenter/applist/id').then((res) => {
          let asideMenu = res.data.result.slice(-4);
          commit('QUERY_MENU', asideMenu);
          resolve(asideMenu);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  },
};

export default menu;
