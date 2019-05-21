
## ContextMenu 右键菜单

:::demo

```html
<template>
    <div class="demo-container">
      <div
        :style="{
          height: '1rem',
          width: '2rem',
          color: '#fff',
          background:'#444'
        }"
        v-rightMouseClick="showContextMenu"
      >点击灰色区域</div>
    <vt-context-menu :mousePosition="rightMouseClickPosition" :menuOptionsList="contextMenuOpsList"><vt-context-menu>

    <div>
</template>
<script>
import VtContextMenu from '~/VtContextMenu';
export default {
  components: {
    'vt-context-menu': VtContextMenu,
  } ,
  data() {
    return {
      rightMouseClickPosition: {
        clientX: 0,
        clientY: 0,
      },
      contextActiveData: null,
      contextMenuOpsList: [
        {
          txt: "右键操作项",
          class: "",
          disable: false,
          handle: this.handleContextMenuClick
        },
        {
          txt: "右键操作项",
          class: "",
          disable: false,
          handle: this.handleContextMenuClick
        },
        {
          txt: "右键操作项",
          class: "",
          disable: true, // 不显示布控
          handle: this.handleContextMenuClick
        },
        {
          txt: "右键操作项",
          class: "",
          disable: false,
          handle: this.handleContextMenuClick
        }
      ]
    }
  },
  methods: {
    showContextMenu(event,data) {
      const { clientX, clientY } = event;
      this.rightMouseClickPosition = { clientX, clientY };
      this.contextActiveData = data;
    },
    handleContextMenuClick() {

    }
  }
}
</script>
```

:::


### methods
| 方法           | 说明             | 类型   | 参数 | 返回 |
| -------------   | ---------------- | ------ | ------ | -------- |
| v-rightMouseClick | 全局指令         | function | —    | event,data |



### Attributes

| 参数           | 说明             | 类型   | 可选值 | 默认值 |
| -------------   | ---------------- | ------ | ------ | -------- |
| mousePosition  | 鼠标点击的位置      | object | —    | —    |
| menuOptionsList  | 多选项数组      | array | —    | —    |

