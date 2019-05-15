import componentsNav from './nav-components'



function createNav() {
  const componentRoutes = [] as any;
  componentsNav.forEach((nav: any) => {
    nav.list.forEach((item: any) => {
      componentRoutes.push({
        name: item.title,
        path: `/components/${item.path}`,
        component: () => nav.navPath === 'docs' ? import(`../docs/${item.path}/README.md`) : import(`../components/${item.path}/README.md`)
      })
    });
  })
  return componentRoutes;
}

const componentRouters = [{
  name: 'components',
  path: '/components',
  redirect: '/components/developer',
  component: () => import(/* webpackChunkName: "home" */ '../views/Demo/index'),
  children: createNav(),
},]

export default componentRouters
