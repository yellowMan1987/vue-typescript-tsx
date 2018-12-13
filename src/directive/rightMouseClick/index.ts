// import vue from 'vue';
import rightMouseClick from './rightMouseClick';

export default {
  // directive 安装
  install(vue:any) {
    vue.directive('rightMouseClick', rightMouseClick);
  },
};