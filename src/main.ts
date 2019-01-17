import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import {loadMapFiles} from './components/Map/utils';
import '@/themes/default/index.scss';

import { language, i18n } from '@/locale';

import "./plugins";

Vue.config.productionTip = false;
loadMapFiles().then(() => {
  new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
})

