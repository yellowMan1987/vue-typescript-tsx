
## ImageDrawer 图片绘制

:::demo

```html
<template>
    <div class="demo-container">
      <el-button type="primary" size="small" @click="imageDrawerData.drawingPolygon = true">画多边形</el-button>
      <el-button size="small" @click="imageDrawerData.drawingRect = true">画矩形</el-button>
      <el-button
        size="small"
        @click="imageDrawerData.drawingRect = false ,imageDrawerData.drawingPolygon = false"
      >取消绘制</el-button>
      <el-button
        size="small"
        type="primary"
        @click="downloadImage"
      >下载图片</el-button>
      <vt-image-drawer
        :imageUrl="imagePolygonDrawerImgUrl"
        :polygons="imageDrawerData.polygons"
        :rects="imageDrawerData.rects"
        :drawingPolygon="imageDrawerData.drawingPolygon"
        :drawingRect="imageDrawerData.drawingRect"
        @finish="finish"
        :style="{
          width: '8.6rem',
          height: '6rem'
        }"
      />
    <div>
</template>
<script>
import { toDataUrl, clickDownload } from '@/utils/image';

export default {
  data() {
    return {
      imagePolygonDrawerImgUrl:'http://ossweb-img.qq.com/images/lol/web201310/skin/big145000.jpg',
      imageDrawerData: {
        drawingPolygon: false,
        drawingRect: false,
        polygons: [
          {
            points: [
            {"x":530.6046511627907,"y":276.83720930232556},{"x":530.6046511627907,"y":311.44186046511624},{"x":484.4651162790697,"y":360.4651162790697},{"x":523.3953488372092,"y":382.09302325581393},{"x":547.906976744186,"y":413.8139534883721},{"x":586.8372093023255,"y":422.4651162790697},{"x":624.3255813953488,"y":367.6744186046511},{"x":653.1627906976744,"y":341.7209302325581},{"x":687.767441860465,"y":302.7906976744186},{"x":687.767441860465,"y":284.04651162790697},{"x":667.5813953488372,"y":245.11627906976742},{"x":581.0697674418604,"y":209.06976744186045},{"x":527.7209302325581,"y":203.30232558139534}]
          }
        ],
        rects: [
          {
            leftTop: { x: 565.6, y: 25.6 },
            rightBottom: { x: 688, y: 157.2 }
          }
        ]
      },
    }
  },
  methods: {
      finish(val) {
        this.imageDrawerData.drawingPolygon = false;
        this.imageDrawerData.drawingRect = false;
      },

      async downloadImage(e) {
        e.preventDefault();
        e.stopPropagation();
        const fileName = `laoge-${new Date().getTime()}.jpg`;
        let href;
        href = await toDataUrl(this.imagePolygonDrawerImgUrl);
        clickDownload({ href, download: fileName });
      }
  }
}
</script>
```

:::


### methods
| 方法           | 说明             | 类型   | 参数 | 返回 |
| -------------   | ---------------- | ------ | ------ | -------- |
| finish()  | 交汇后触发方法         | — | —    | —    |



### Attributes

| 参数           | 说明             | 类型   | 可选值 | 默认值 |
| -------------   | ---------------- | ------ | ------ | -------- |
| —         | —           | — | —    | —    |

