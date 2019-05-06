const viewsRouter = [
  { path: '/', redirect: '/home' },
  {
    name: 'home',
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    name: 'cssdemo',
    path: '/cssdemo',
    component: () => import(/* webpackChunkName: "cssdemo" */ '../views/CSSDemo/index.vue'),
  },
  {
    name: 'mapdemo',
    path: '/mapdemo',
    component: () => import(/* webpackChunkName: "cssdemo" */ '../views/MapDemo/index'),
  },
] as any[];


export default viewsRouter
