import { Component, Vue } from 'vue-property-decorator'
@Component<VtWaterMarker>({
  name: 'vt-water-marker',
  props: {
    visible: {type: Boolean, default: false},
    content: {type: String, default: '防拍水印'},
    allowDelete: {type: Boolean, default: false},
    color: {type: String, default: 'rgba(233, 30, 99, 0.6)'},
    font: {type: String, default: getComputedStyle(document.body).font},
  },
  watch: {
    visible(val) {
      if (val) {
        if (!this.checkHasMark()) {
          this.$nextTick(() => {
            this.visible && this.init()
          })
        }
      } else {
        if (!this.allowDelete) return;
        this.removeMaskDiv();
      }
    },
    content(val) {
      if (!this.checkHasMark()) return;
      if (this.allowDelete) {
        this.reset();
      } else {
        this.observer && this.observer.disconnect();
        this.reset();
      }
    },
    allowDelete(val) {
      if (val) {
        this.observer && this.observer.disconnect();
      } else {
        this.monitor();
      }
    }

  }
})
export default class VtWaterMarker extends Vue {
  readonly visible!: boolean;
  readonly content!: string;
  readonly allowDelete!: boolean;
  readonly color!: string;
  readonly font!: string;
  
  maskDiv = {} as any;
  observer = {} as any;

  render() {
    return (
      <div></div>
    );
  }
  mounted() {
    // 确认DOM渲染后再执行
    this.$nextTick(() => {
      // 创建水印节点
      this.visible && this.init();
      if (!this.allowDelete) {
        this.monitor();
      }
    })

  }

  init() {
    let canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 200;
    canvas.height = 130;
    this.maskDiv = document.createElement('div');
    let ctx = canvas.getContext('2d') as any;
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.rotate(30 * Math.PI / 180);
    ctx.fillText(this.content, 30, 20);
    let src = canvas.toDataURL('image/png');
    this.maskDiv.style.position = 'fixed';
    this.maskDiv.style.zIndex = '9999';
    this.maskDiv.id = '_waterMark';
    this.maskDiv.style.top = '30px';
    this.maskDiv.style.left = '0'
    this.maskDiv.style.height = '100%';
    this.maskDiv.style.width = '100%';
    this.maskDiv.style.pointerEvents = 'none';
    this.maskDiv.style.backgroundImage = 'URL(' + src + ')';
    document.body.appendChild(this.maskDiv);
  }

  monitor() {
    let body = document.getElementsByTagName('body')[0];
    let options = {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    };
    this.observer = new MutationObserver(this.callback);
    this.observer.observe(body, options); // 监听body节点
  }

  // DOM改变执行callback
  callback(mutations: any, observer: any) {
    if (this.allowDelete) return;
    // 当attribute属性被修改
    if (mutations[0].target.id === '_waterMark') {
      this.removeMaskDiv()
    }
    // 当id被改变时
    if (mutations[0].attributeName === 'id' && !this.checkHasMark()) {
      this.reset();
    }
    // 当节点被删除
    if (mutations[0].removedNodes[0] && mutations[0].removedNodes[0].id === '_waterMark' && !this.checkHasMark()) {
      this.reset();
    }
  }

  removeMaskDiv() {
    if (!this.checkHasMark()) return;
    document.body.removeChild(this.checkHasMark() as any)
  }

  reset() {
    this.removeMaskDiv();
    this.init();
  }

  checkHasMark() {
    return document.getElementById('_waterMark');
  }
}