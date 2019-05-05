import { Component, Vue } from "vue-property-decorator";
import { getRandomId } from '@/utils/global';
import BaiduMap from '@/components/VtMap/BaiduMap';
import { loadMapFiles } from './utils';

const DEFAULT_MAP_SCALE = 14;
const DEFAULT_MAP_MAX_SCALE = 18;
const DEFAULT_MAP_MIN_SCALE = 5;
const DEFAULT_MAP_LOCATION = {
  x: 116.397507,
  y: 40.025193
};

@Component({
  components: {
    'baidu-map': BaiduMap,
  },
  props: {
    width: {
      type: [Number, String],
    },
    height: {
      type: [Number, String],
    },
    
  }
})


export default class VtMap extends Vue {
  readonly width!: number | string; // 地图宽度（px/百分比）
  readonly height!: number | string; // 地图高度（px/百分比）

  $refs: any;
  id = getRandomId()
  render() {
    let mapWidth = this.width ? `${Number(this.width) * 0.01}rem` : '100%';
    let mapHeight = this.height ? `${Number(this.height) * 0.01}rem` : '100%';

    // 如果宽高是百分比
    if (typeof this.width === 'string') {
      mapWidth = this.width as string;
    }
    if (typeof this.height === 'string') {
      mapHeight = this.height as string;
    }
    return (
      <div
        style={{
          width: mapWidth,
          height: mapHeight,
          margin: '0 auto'
        }}
      >
        <baidu-map
          ref="map"
          id={`${this.id}`}
        />
      </div>
    );
  }
  mounted() {

    this.$nextTick(() => {
      loadMapFiles().then(() => {
        this.initMap();
      })
    })
  }

  initMap(cb?: any) {
    this.$refs.map.initialize(
      {
        center: DEFAULT_MAP_LOCATION,
        scale: DEFAULT_MAP_SCALE,
        maxScale: DEFAULT_MAP_MAX_SCALE,
        minScale: DEFAULT_MAP_MIN_SCALE,
      },
      (event: any) => {
        // if (this.$refs.map && event.type == "load") {
        if (this.$refs.map) {


        } else {
          console.error("地图没有正确安装", this.$refs);
        }
      },
    );
    cb && cb();
  }
}