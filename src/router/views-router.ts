const viewsRouter = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/tsx-components',
    name: 'components',
    component: () => import(/* webpackChunkName: "home" */ '../views/Example/index'),
  },
  {
    path: '/cssdemo',
    name: 'cssdemo',
    component: () => import(/* webpackChunkName: "cssdemo" */ '../views/CSSDemo/index.vue'),
  },
  {
    path: '/mapdemo',
    name: 'mapdemo',
    component: () => import(/* webpackChunkName: "cssdemo" */ '../views/MapDemo/index'),
  },
] as any[];


export default viewsRouter
