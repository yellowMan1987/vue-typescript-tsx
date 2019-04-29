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

})


export default class VtMap extends Vue {
  $refs: any;
  id = getRandomId()

  render() {
    return (
      <div
        style={{
          width: '8.6rem',
          height: '6rem',
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