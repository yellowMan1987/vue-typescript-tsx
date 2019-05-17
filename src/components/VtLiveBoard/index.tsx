import { Component, Vue } from 'vue-property-decorator';
import { loadFiles } from '../VtMap/utils';
import './style.scss';
@Component({
  name: 'vt-live-board',
  props: {},
  computed: {},
  methods: {},
  watch: {},
})
export default class VtLive2d extends Vue {
  render() {
    return (
      <div id="landlord">
        <div class="message" style="opacity:0"></div>
        <canvas id="live2d" width="480" height="800" class="live2d"></canvas>
        <div class="hide-button">隐藏</div>
      </div>
    );
  }
  created() { }
  mounted() {
    const js = ['https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js','./static/live2d/js/live2d.js','./static/live2d/js/message.js'] as any;
    loadFiles(js,[])
    .then(() => {
      let loadlive2d = (window as MyWindow).loadlive2d;
      // loadlive2d("live2d", "./static/live2d/model/tia/model.json");
      // loadlive2d("live2d", "./static/live2d/model-p/model.json");
      // loadlive2d("live2d", "./static/live2d/model-1/model.json");
      loadlive2d("live2d", "./static/live2d/model-2/model.json");
    }) 

  }
  beforeDestroy() { }
}