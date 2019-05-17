import { Component, Vue } from 'vue-property-decorator';
import { loadFiles } from './utils';
import axios from 'axios';
import './style.scss';
import models from './models';


@Component<VtLive2d>({
  name: 'vt-live-board',
  props: {},
  computed: {},
  methods: {},
  watch: {},
})
export default class VtLive2d extends Vue {
  loadlive2d = null as any;
  modelVisible = false;
  refs!: {
    modelWrap: any,
    message: any
  };
  currModel =   {
    name: 'model-2',
    height: '750',
    width: '500',
    message: '我是 model-2 点击能触发一个音效',
    offset: '93%',
  }
  message = this.currModel.message;
  hitokoto = '';
  // 定时器
  hitokotoTimer = null as any;
  messageTimer = null as any;

  render() {
    return (
      <div ref="modelWrap" class="model-wrap" style={{ width: `${this.currModel.width}px`, height: `${this.currModel.height}px` }}>
        <div class="message" ref="message" style={{ bottom: this.currModel.offset }}>{this.message}</div>
        <canvas id="live2d" onClick={this.click2dCanvas} width={this.currModel.width} height={this.currModel.height} class="live2d"></canvas>
        <div class="hide-button" onClick={this.hideModel}>隐藏</div>
        <ul class="change-model-tool">
          {
            models.map((i, index) => {
              return <li class={['change-model', this.currModel.name === `model-${index + 1}` ? 'model-li-avtive' : '']}
                onClick={() => { this.changeModel(i) }}>{`${i.name}`}</li>
            })
          }
        </ul>
      </div>
    );
  }
  mounted() {
    this.initLoadLive2d();
    this.timerManager();
  }

  // 初始化 live2d
  initLoadLive2d() {
    loadFiles('./static/live2d/js/live2d.js')
      .then(() => {
        this.loadlive2d = (window as MyWindow).loadlive2d
        this.loadlive2d("live2d", `./static/live2d/${this.currModel.name}/model.json`);
        this.showMessage();
        this.modelVisible = true;

      })
  }

  // 更换 model 
  changeModel(model: any) {
    this.currModel = model;
    this.message = model.message;
    setTimeout(() => { this.loadlive2d("live2d", `./static/live2d/${model.name}/model.json`); }, 100)
  }



  // 点击 model
  click2dCanvas() {
    console.log('点击 model 计划做一些交互')
    this.showMessage();
  }

  enter2dCanvas() {
    this.showMessage();
  }
  // 计时器管理 
  timerManager() {
    this.hitokotoTimer = setInterval(() => {this.fetchHitokoto()}, 15000);
  }

  // message管理
  messageManager(msg: any) {
    this.message = msg;
  } 

  fetchHitokoto() {
    this.modelVisible && axios.get('https://v1.hitokoto.cn/?c=c')
    .then((res) => {
      let msg = `『${res.data.hitokoto}』`
      this.messageManager(msg);
      this.showMessage();
      this.hideMessage()

    })
  }

  showMessage() {
    this.$refs.message && (this.$refs.message as any).style.opacity = 1
  }

  hideMessage() {
    setTimeout(() => {this.$refs.message && (this.$refs.message as any).style.opacity = 0;},5000);
  }
  // 隐藏 model
  hideModel() {
    this.modelVisible = false;
    this.$refs.modelWrap && (this.$refs.modelWrap as any).style.display = 'none';
  }

  // 显示 model
  showModel() {
    this.modelVisible = true;
    this.$refs.modelWrap && (this.$refs.modelWrap as any).style.display = 'block';
  }
  

  beforeDestroy() {
    this.hitokotoTimer = null;
    this.messageTimer = null;
  }
}
