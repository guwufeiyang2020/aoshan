import Vue from 'vue';
import Vuex from 'vuex';

import creatPersistedstate from 'vuex-persistedstate';

import user from './modules/user';
import menu from './modules/menu';
import {
  getters
} from './getters';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    loginDialog: false,
  },
  mutations: {
    changeLoginDialog(state, isShow) {
      state.loginDialog = isShow;
    },
  },
  modules: {
    user,
    menu
  },
  getters,
  strict: debug,
  plugins: [
    creatPersistedstate({
      storage: window.localStorage,
      paths: ['user', 'menu']
    }),
  ],
});
