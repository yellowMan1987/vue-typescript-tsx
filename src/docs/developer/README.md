<p align="center"><a href="https://www.laoge.mobi" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a></p>

<p align="center">
  <a href="https://www.laoge.mobi"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
</p>


## 概要
> * 使用TypeScript + JSX + vue-class-component的组合方式。
> * 实现 class 风格 tsx 格式组件文件输出。
> * 支持Vue Templeat模板语.vue文件输出。
> * 支持Sass。
> * 仅提供学习与参考。

## 集成的小功能
- [x] 多语言
- [x] 主题更换
- [x] 右键菜单
- [x] 防拍水印
- [x] 图片绘制
- [x] 富文本编辑器
- [x] 离线百度地图
- [x] 视频播放器
- [x] 视频录制
- [x] live2d


## 主要方案
> * Vue + Vue-Cli3 + Vuex + ES6/ES7 + TypeScript + JSX + Sass +  ElementUI

## 主要结构
``` 
    bin                    // 命令
    src 
      /assets              // 静态资源
      /components          // 公共组件
      /directive           // 指令注册
      /plugins             // 第三方库
      /locale              // 语言
      /store               // Vuex store
      /themes              // 样式主题
      /types               // 类型
      /utils               // 工具
      /views               // 业务
      /router              // 路由
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



## vue-cli3

```
## Project setup
npm install

### Compiles and hot-reloads for development
npm run serve

### Compiles and minifies for production
npm run build

### Run your tests
npm run test

### Lints and fixes files
npm run lint
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).