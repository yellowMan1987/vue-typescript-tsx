import componentsNav from './nav-components'



function createNav() {
  const componentRoutes = [] as any;
  componentsNav.forEach((nav: any) => {
    nav.list.forEach((item: any) => {
      componentRoutes.push({
        name: item.title,
        path: `/components/${item.path}`,
        component: () => 
          nav.navPath === 'docs' ?
          import(/* webpackChunkName: "docs-content" */ `../docs/${item.path}/README.md`) :
          item.path === 'TaskDemo' ? 
          import(/* webpackChunkName: "task-demo" */ '../views/Task/index') :
          import(/* webpackChunkName: "components-demo" */ `../components/${item.path}/README.md`)
      })
    });
  })
  return componentRoutes;
}

const componentRouters = [{
  name: 'components',
  path: '/components',
  redirect: '/components/developer',
  component: () => import(/* webpackChunkName: "components-container" */ '../views/Demo/index'),
  children: createNav(),
},]

export default componentRouters
