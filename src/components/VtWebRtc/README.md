
## WabRtc 视频录制

:::demo

```html
<template>
    <div class="demo-container">
      <el-button type="primary" @click="$refs.webRtc.show()">打开摄像头</el-button>
      <vt-web-rtc ref="webRtc"/>
    <div>
</template>
<script>
import VtWebRtc from '~/VtWebRtc';
export default {
  components: {
    'vt-web-rtc': VtWebRtc,
  },
  data(){
    return {
    }
  },
}
</script>
```

:::


### methods
| 方法           | 说明             | 类型   | 参数 | 返回 |
| -------------   | ---------------- | ------ | ------ | -------- |
| show()         | 通过 $refs.webRtc.show()| function | —    | —    |



### Attributes

| 参数           | 说明             | 类型   | 可选值 | 默认值 |
| -------------   | ---------------- | ------ | ------ | -------- |
| —         | —           | — | —    | —    |

