<template>
  <div class="vtx-example">
    <!-- <div class="vtx-example__block">
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
    </div>-->
    <div class="vtx-example__block">
      <h2>map</h2>
      <Map></Map>
    </div>
    <div class="vtx-example__block">
      <h1>ImageDrawer</h1>
      <ImageDrawer
        :imageUrl="PicturePolygonDrawerImgUrl"
        :polygons="pictureData.polygons"
        :rects="pictureData.rects"
        :drawingPolygon="pictureData.drawingPolygon"
        :drawingRect="pictureData.drawingRect"
        @finish="finish"
        :style="{
          width: '800px',
          height: '600px'
        }"
      />
      <el-button type="primary" size="small" @click="pictureData.drawingPolygon = true">画多边形</el-button>
      <el-button size="small" @click="pictureData.drawingRect = true">画矩形</el-button>
      <el-button size="small" @click="pictureData.drawingRect = false ,pictureData.drawingPolygon = false">取消绘制</el-button>
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

  PicturePolygonDrawerImgUrl: string =
    "https://i0.hdslb.com/bfs/article/669b74844e47c4ca9774aad43dc62b0d879fbcd6.jpg";
  pictureData = {
    drawingPolygon: false,
    drawingRect: false,
    polygons: [
      {
        points: [
          {
            x: 177.77777777777777,
            y: 143.36917562724014
          },
          {
            x: 491.2783751493429,
            y: 185.42413381123058
          },
          {
            x: 286.7383512544803,
            y: 391.8757467144564
          },
          {
            x: 177.77777777777777,
            y: 143.36917562724014
          }
        ]
      },
      {
        points: [
          {
            x: 1124.0143369175628,
            y: 546.7144563918757
          },
          {
            x: 1473.8351254480287,
            y: 684.3488649940263
          },
          {
            x: 1154.599761051374,
            y: 808.6021505376344
          },
          {
            x: 1124.0143369175628,
            y: 546.7144563918757
          }
        ]
      }
    ],
    rects: [
      {
        leftTop: {
          x: 170.13142174432497,
          y: 600.2389486260454
        },
        rightBottom: {
          x: 485.5436081242533,
          y: 831.5412186379929
        }
      },
      {
        leftTop: {
          x: 728.31541218638,
          y: 443.48864994026286
        },
        rightBottom: {
          x: 1129.7491039426523,
          y: 753.1660692951016
        }
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

  finish(val:any) {
    console.log('完成绘制',JSON.stringify(val));
    this.pictureData.drawingPolygon = false;
    this.pictureData.drawingRect = false;
  }
}
</script>
