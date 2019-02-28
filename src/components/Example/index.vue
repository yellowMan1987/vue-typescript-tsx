<template>
  <div class="vtx-example" ref="example">
    <!-- <div class="vtx-example__block">
      <div
        :style="{
          backgroundImage: `url(${xiangjiao})`,
          backgroundSize:'cover',
          backgroundRepeat: 'no-repeat',
          width:'400px',
          height:'300px',
        }"
      >
      </div>
    </div> -->
    <div class="vtx-example__block">
      <h1>{{this.$t('lang')}}</h1>
      <Language/>
    </div>
    <div class="vtx-example__block">
      <h1>{{this.$t('theme')}}</h1>
      <Theme/>
    </div>
    <div class="vtx-example__block" v-if="!mobi">
      <h2>WebRtc</h2>
      <el-button type="primary" @click="showWebRtc">打开摄像头</el-button>
    </div>
    <div class="vtx-example__block">
      <h1>{{this.$t('videoPlayer')}}</h1>
      <VideoPlayer/>
    </div>
    <div class="vtx-example__block">
      <h2>{{this.$t('waterMark')}}</h2>
      <el-button type="primary" @click="waterMarkVisible = !waterMarkVisible">打开防拍水印</el-button>
    </div>
    <div class="vtx-example__block" v-if="!mobi">
      <h2>{{this.$t('contextMenu')}}</h2>
      <div
        :style="{
          height: '1rem',
          color: '#fff',
          background:'#d9d9d9'
        }"
        v-rightMouseClick="showContextMenu"
      ></div>
    </div>
    <div class="vtx-example__block" v-if="!mobi">
      <h2>{{this.$t('contextMenu')}}</h2>
      <Task/>
    </div>
    <!-- <div class="vtx-example__block" v-if="!mobi">
      <h2>{{this.$t("map")}}</h2>
      <Map></Map>
    </div> -->
    <div class="vtx-example__block" v-if="!mobi">
      <h2>{{this.$t("polygonDrawer")}}</h2>
      <ImageDrawer
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
    </div>
    <ContextMenu :mousePosition="rightMouseClickPosition" :menuOptionsList="contextMenuOpsList" v-if="!mobi"></ContextMenu>
    <WebRtc ref="webRtc" v-if="!mobi"/>
    <WaterMark :visible="waterMarkVisible" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Language from "@/components/Language/index.vue";
import Theme from "@/components/Theme/index.vue";
import WebRtc from "@/components/WebRtc/index.vue";
import ContextMenu, {
  IMenuOptionItem
} from "@/components/ContextMenu/index.vue";
import Task from '@/components/Task/index.vue';
import Map from "@/components/Map/index.vue";
import ImageDrawer from "@/components/ImageDrawer/index.vue";
import WaterMark from "@/components/WaterMark/index.vue";
import VideoPlayer from "@/components/VideoPlayer/index.vue";
import { toDataUrl, clickDownload } from '@/utils/image';
import "./style.scss";

@Component<Example>({
  components: {
    Theme,
    Language,
    WebRtc,
    ContextMenu,
    Task,
    Map,
    ImageDrawer,
    WaterMark,
    VideoPlayer,
  },
  props: {},
  computed: {},

  watch: {}
})
export default class Example extends Vue {
  updateThemes!: (res: any) => void;
  waterMarkVisible = false;
  mobi = false;
  rightMouseClickPosition = {
    clientX: 0,
    clientY: 0
  };
  contextActiveData: any;
  refs: any;
  contextMenuOpsList = [
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
  ] as IMenuOptionItem[];

  imagePolygonDrawerImgUrl: string = 'https://foss.oss-cn-shenzhen.aliyuncs.com/laoge/image/ChMkJ1wcspmIRAZ3AAMCvbwwrIQAAt6UwLoOVMAAwLV134.jpg'
  imageDrawerData = {
    drawingPolygon: false,
    drawingRect: false,
    polygons: [
      {
        points: [
          { x: 276, y: 362.4 },
          { x: 254.3, y: 984 },
          { x: 444, y: 1010.4 },
          { x: 276, y: 362.4 }
        ]
      }
    ],
    rects: [
      {
        leftTop: { x: 1605.6, y: 45.6 },
        rightBottom: { x: 1848, y: 307.2 }
      }
    ]
  };

  xiangjiao = require("../../../static/image/timg.jpg");

  created() {
    this.mobi = window.innerWidth <= 900;
  }
  mounted() {}
  beforeDestroy() {}

  // msg
  openMsg() {
    this.$message({
      duration: 1000,
      message: "错误的提示信息",
      type: "error"
    });
  }
  // showWebRtc
  showWebRtc() {
    const webRtc = this.$refs.webRtc as any;
    webRtc.show();
  }

  // 右键操作
  showContextMenu(event: any, data: any) {
    const { clientX, clientY } = event;
    this.rightMouseClickPosition = { clientX, clientY };
    this.contextActiveData = data;
  }

  handleContextMenuClick() {}

  finish(val: any) {
    console.log("完成绘制", JSON.stringify(val));
    this.imageDrawerData.drawingPolygon = false;
    this.imageDrawerData.drawingRect = false;
  }

  async downloadImage(e:any) {
    e.preventDefault();
    e.stopPropagation();
    const fileName = `${new Date().getTime()}.jpg`;
    let href;
    href = await toDataUrl(this.imagePolygonDrawerImgUrl);
    clickDownload({ href, download: fileName });
  }
}
</script>
