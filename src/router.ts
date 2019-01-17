import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/post',
      name: 'post',
      component: () => import(/* webpackChunkName: "post" */ './views/Post/index.vue'),
    },
    {
      path: '/task',
      name: 'task',
      component: () => import(/* webpackChunkName: "task" */ './views/Task/index.vue'),
    },
    {
      path: '/css',
      name: 'css',
      component: () => import(/* webpackChunkName: "css" */ './views/CSSDemo/index.vue'),
    },
  ],
});
