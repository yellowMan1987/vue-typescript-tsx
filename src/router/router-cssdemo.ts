import cssDemoNav from './nav-cssdemo';

function createNav() {
  const cssDemoRoutes = [] as any;
  cssDemoNav.forEach((nav: any) => {
    cssDemoRoutes.push({
      name: nav.name,
      path: nav.path,
      component: () => import(/* webpackChunkName: "css-demo" */ `../views/CSSDemo/${nav.name}.vue`),
    })
  })
  return cssDemoRoutes;
}

const cssDemoRouters =   {
  name: 'cssdemo',
  path: '/cssdemo',
  redirect: '/cssdemo/rocket',
  component: () => import(/* webpackChunkName: "css-container" */ '../views/CSSDemo/index.vue'),
  children: createNav()
}

export default cssDemoRouters;