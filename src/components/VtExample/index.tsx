import { Component, Vue } from 'vue-property-decorator'
import { IMenuOptionItem } from "@/components/VtContextMenu/index_vue.vue";
import { toDataUrl, clickDownload } from '@/utils/image';
import "./style.scss";


@Component({
  props: {},
  computed: {},
  methods: {},
  watch: {},
})
export default class VtExample extends Vue {

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

  imagePolygonDrawerImgUrl: string = 'http://ossweb-img.qq.com/images/lol/web201310/skin/big145000.jpg'
  imageDrawerData = {
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
  };
  message = '一段信息';
  xiangjiao = require("../../../public/static/image/timg.jpg");
  mp4url = require("../../../public/static/video/lol_kda.mp4");
  // 只看阿卡丽
  videoDataKeyTime =  [
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

  ];

  render() {
    return (
      <div class="vtx-example" ref="example">
        <h2>{this.$t('lang')}</h2>
        <div class="vtx-example__block">
          <vt-language/>
        </div>
        <h2>{this.$t('theme')}</h2>
        <div class="vtx-example__block">
          <vt-theme/>
        </div>
      </div>
    );
  }
  updateThemes!: (res: any) => void;
  
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

  setData() {
    console.log('setData')
  }
}