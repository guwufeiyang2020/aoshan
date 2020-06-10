/* eslint-disable no-restricted-globals */
import Vue from 'vue';

import './icons';
import './utils/rem';

import router from './router';
import store from './store';

import '@qycloud/lego/dist/lego.css';
import './assets/styles/index.scss';

import 'babel-polyfill';
import './assets/js/install';

Vue.config.productionTip = false;

window.addEventListener('storage', (e) => {
  if (e.key === 'login-reload') {
    window.location.reload();
  }
});
new Vue({
  router,
  store,
  template: '<router-view></router-view>',
}).$mount('#app');
