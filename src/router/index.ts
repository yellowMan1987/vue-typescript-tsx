import Vue from 'vue'
import Router from 'vue-router'

import viewsRouter from './views-router'

Vue.use(Router)

let routes = [] as any[];

routes = routes.concat(viewsRouter);

export default new Router({
  base: process.env.BASE_URL,
  routes
})
