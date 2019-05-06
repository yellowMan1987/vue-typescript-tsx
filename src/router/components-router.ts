import componentsNav from './components-nav'


function createComponentRoute(groups: { forEach: (arg0: (group: any) => void) => void; }, navPath: string) {

  let routes: any[] | {
  name: any; path: any;
    // https://github.com/webpack/webpack/issues/6680
    component: () => Promise<any>; // 在动态import时，不能使用变量
  }[] = []
  groups.forEach((group: { list: any; }) => {
    const list = group.list
    list.forEach((item: { path: { split: (arg0: string) => { filter: (arg0: (i: any) => any) => void; }; }; }) => {
      const cmpNames = item.path.split('/').filter((i: any) => i) as any;
      if (!cmpNames.length) {
        console.warn(item, "没有正常的配置好路径")
        return;
      }
      const cmpPath =navPath !== "doc"? cmpNames.join('/') : "docs/" + cmpNames.join('/');

      const cmpName = cmpNames[cmpNames.length - 1];
      routes.push({
        name: cmpName,
        path: item.path,
        // https://github.com/webpack/webpack/issues/6680
        component: () => import(`../${cmpPath}/README.md`) // 在动态import时，不能使用变量
      })
    })
  })
  return routes
}

function createNav() {
  let componentRoutes = [] as any[];

  componentsNav.forEach((nav: { groups: any; navPath: any; }) => {
    createComponentRoute(nav.groups, nav.navPath).forEach(item => componentRoutes.push(item));
  })

  return componentRoutes;
}

export default createNav()
