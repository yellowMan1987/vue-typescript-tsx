
### WaterMarker

:::demo

```html
<template>
    <div class="demo-container">
      hahahahahahah
      
    <div>
</template>
<script>
export default {
  data(){
    return {
    }
  },
}
</script>
```

:::


### Attributes

| 参数           | 说明             | 类型   | 可选值 | 默认值 |
| -------------   | ---------------- | ------ | ------ | -------- |
| visible         | 是否显示           | boolean | —    | false    |
| content       | 水印内容          |  string | —      | 防拍水印    |      
| color           | 水印颜色          |  string | —      | rgba(66, 133, 244, 0.4)    |               
| font           | 水印字体属性          |  string | —      | getComputedStyle(document.body).font |               
| allowDelete  | 是否允许通过js或开发者工具等途径修改水印DOM节点（水印的id，attribute属性，节点的删除）| boolean | —    | true    |

