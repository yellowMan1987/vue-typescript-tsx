# vue-cli3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## 工程概要
> * 与传统的Vue工程编码风格不同，本工程采用TypeScript + JSX + vue-class-component的组合方式。
> * 支持实现class风格tsx格式组件文件输出。
> * 支持Vue Templeat模板语.vue文件输出。
> * 支持sass。
> * 支持国际化/自适应/主题更换。


## 主要方案
> * Vue + Vue-Cli3 + Vuex + ES6/ES7 + TypeScript + JSX + Sass +  ElementUI

##目录结构
``` 
    order                  // 第三方指令
    src 
      /assets              // 静态资源
      /components          // 公共组件
      /plugins             // 第三方库
      /locale              // 国际化
      /store               // Vuex store
      /themes              // 样式主题
      /utils               // 公共方法
      /views               // 业务
      /router.ts           // 路由
      /global.ts           // 引用声明
      /app.tsx             
      /main.tsx
    tsconfig.json         // TypeScript配置
    package.json          // 依赖配置
    vue.config.js         // vue-cli3配置文件

```


## 开发规范

基础环境规范
> 基础规范采用 airbnb 的 javascript style guide，在 vscode 下的配置方法如下：
> 1. 全局安装 tslint 和 typescript：npm install -g tslint typescript
> 
> 2. 安装 vscode 的 tslint 插件：https://marketplace.visualstudio.com/items?itemName=eg2.tslint
> 3. 重新打开项目，即可出现提示


BEM规范
```
@include b(button) {
  @include e(demo) {
    @include m(loading) {}
  }
}
编译之后
.vtx-button__demo--loading {}
```

