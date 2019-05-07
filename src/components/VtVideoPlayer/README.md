
## VideoPlayer 视频播放器

:::demo

```html
<template>
    <div class="demo-container">
      <vt-video-player 
        :keyTimeOfVideo="keyTimeOfVideo"
        :url="mp4url"
      />
    <div>
</template>
<script>
export default {
  data(){
    return {
      mp4url: require("../../../public/static/video/lol_kda.mp4"),
      keyTimeOfVideo:  [
        {
          start: 12 * 1000,
          end: 20 * 1000,
        },
        {
          start: 33 * 1000,
          end: 46 * 1000,
        },
        {
          start: 82 * 1000,
          end: 180 * 1000,
        },
      ],
    }
  },
}
</script>
```

:::


### methods
| 方法           | 说明             | 类型   | 参数 | 返回 |
| -------------   | ---------------- | ------ | ------ | -------- |
| —         | —           | — | —    | —    |



### Attributes

| 参数           | 说明             | 类型   | 可选值 | 默认值 |
| -------------   | ---------------- | ------ | ------ | -------- |
| url        | 播放地址           | string | —    | —    |
| keyTimeOfVideo  | 只看重点时间           | — | —    | —    |
| —         | —           | — | —    | —    |

