import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import  { versionShow } from './utils/log';
import '@/themes/default/index.scss';
import '@/themes/iconfont/iconfont.css';

import { language, i18n } from '@/locale';

import "./plugins";

Vue.config.productionTip = false;
versionShow();
new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');

