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
    component: () => import(/* webpackChunkName: "post" */ '../views/Post/index.vue'),
  },
  {
    name: 'mapdemo',
    path: '/mapdemo',
    component: () => import(/* webpackChunkName: "map-demo" */ '../views/MapDemo'),
  },
] as any[];


export default viewsRouter
