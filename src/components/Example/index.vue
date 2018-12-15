<template>
  <div class="vtx-example">
    <div class="vtx-example__block">
      <h1>{{this.$t('lang')}}</h1>
      <Language/>
    </div>
    <div class="vtx-example__block">
      <h1>{{this.$t('theme')}}</h1>
      <Theme/>
    </div>
    <div class="vtx-example__block">
      <h2>{{this.$t('msg')}}</h2>
      <el-button type="primary" @click="openMsg">msg</el-button>
    </div>
    <div class="vtx-example__block">
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
    <div class="vtx-example__block">
      <h2>{{this.$t("map")}}</h2>
      <Map></Map>
    </div>
    <div class="vtx-example__block">
      <h2>{{this.$t("polygonDrawer")}}</h2>
      <ImageDrawer
        :imageUrl="imagePolygonDrawerImgUrl"
        :polygons="imageDrawerData.polygons"
        :rects="imageDrawerData.rects"
        :drawingPolygon="imageDrawerData.drawingPolygon"
        :drawingRect="imageDrawerData.drawingRect"
        @finish="finish"
        :style="{
          width: '800px',
          height: '600px'
        }"
      />
      <el-button type="primary" size="small" @click="imageDrawerData.drawingPolygon = true">画多边形</el-button>
      <el-button size="small" @click="imageDrawerData.drawingRect = true">画矩形</el-button>
      <el-button
        size="small"
        @click="imageDrawerData.drawingRect = false ,imageDrawerData.drawingPolygon = false"
      >取消绘制</el-button>
    </div>
    <ContextMenu :mousePosition="rightMouseClickPosition" :menuOptionsList="contextMenuOpsList"></ContextMenu>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Language from "@/components/Language/index.vue";
import Theme from "@/components/Theme/index.vue";
import ContextMenu, {
  IMenuOptionItem
} from "@/components/ContextMenu/index.vue";
import Map from "@/components/Map/index.vue";
import ImageDrawer from "@/components/ImageDrawer/index.vue";
import "./style.scss";
@Component<Example>({
  components: {
    Theme,
    Language,
    ContextMenu,
    Map,
    ImageDrawer
  },
  props: {},
  computed: {},

  watch: {}
})
export default class Example extends Vue {
  updateThemes!: (res: any) => void;
  rightMouseClickPosition = {
    clientX: 0,
    clientY: 0
  };
  contextActiveData: any;

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

  imagePolygonDrawerImgUrl: string =
    "https://i0.hdslb.com/bfs/article/669b74844e47c4ca9774aad43dc62b0d879fbcd6.jpg";
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
  created() {}
  mouted() {}
  befordestoyed() {}

  // msg
  openMsg() {
    this.$message({
      duration: 1000,
      message: "错误的提示信息",
      type: "error"
    });
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
}
</script>
