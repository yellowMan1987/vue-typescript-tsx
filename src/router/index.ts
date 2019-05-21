import Vue from 'vue'
import Router from 'vue-router'

import viewsRouter from './router-views'
import componentRouters from './router-components'
import cssDemoRouters from './router-cssdemo'

Vue.use(Router)
let routes = [] as any[];

routes = routes.concat(viewsRouter);
routes = routes.concat(componentRouters);
routes = routes.concat(cssDemoRouters);
export default new Router({
  base: process.env.BASE_URL,
  routes
})
