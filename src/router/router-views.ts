const viewsRouter = [
  { path: '/', redirect: '/post' },
  {
    name: 'post',
    path: '/post',
    component: () => import(/* webpackChunkName: "home" */ '../views/Post/index.vue'),
  },
  {
    name: 'cssdemo',
    path: '/cssdemo',
    component: () => import(/* webpackChunkName: "cssdemo" */ '../views/CSSDemo/index.vue'),
  },
  {
    name: 'taskdemo',
    path: '/taskdemo',
    component: () => import(/* webpackChunkName: "cssdemo" */ '../views/Task'),
  },
  {
    name: 'mapdemo',
    path: '/mapdemo',
    component: () => import(/* webpackChunkName: "cssdemo" */ '../views/MapDemo/index'),
  },
] as any[];


export default viewsRouter
