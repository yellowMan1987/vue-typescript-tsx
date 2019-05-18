const viewsRouter = [
  { path: '/', redirect: '/home' },
  {
    name: 'home',
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    name: 'post',
    path: '/post',
    component: () => import(/* webpackChunkName: "home" */ '../views/Post/index.vue'),
  },
  {
    name: 'mapdemo',
    path: '/mapdemo',
    component: () => import(/* webpackChunkName: "cssdemo" */ '../views/MapDemo'),
  },
] as any[];


export default viewsRouter
