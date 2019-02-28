import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import '@/themes/default/index.scss';
import '@/themes/iconfont/iconfont.css';

import { language, i18n } from '@/locale';

import "./plugins";

Vue.config.productionTip = false;
console.log('process.env.NODE_ENV :)',process.env.NODE_ENV)
new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');

