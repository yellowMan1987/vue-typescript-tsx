const viewsRouter = [
  { path: '/', redirect: '/components/VtWebRtc' },
  {
    name: 'home',
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    name: 'components',
    path: '/tsx-components',
    component: () => import(/* webpackChunkName: "home" */ '../views/Example/index'),
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
