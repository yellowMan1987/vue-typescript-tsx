## live2d 看板娘

:::demo

```html
<template>
  <el-button type="primary" size="small" @click="$refs.live2d.showModel()">打开看板娘</el-button>
  <el-button type="primary" size="small" @click="$refs.live2d.hideModel()">关闭看板娘</el-button>
  <vt-live-board ref="live2d"/>
</template>
<script>
export default {
}
</script>
```

:::


### 说明
1.有 6 个 model 可以切换查看.

2.model2 model3 有音效.

3.支持显示/隐藏

4.切换时偶尔尺寸不适配,重新切换即可正常显示,待解决..


