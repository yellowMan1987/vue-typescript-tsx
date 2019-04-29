import { Component, Vue } from "vue-property-decorator";
import coordtransform from "coordtransform";

@Component<BaiduMap>({
  props: {
    id: {
      required: true,
      type: String
    }
  }
})
export default class BaiduMap extends Vue {
  readonly id!: string;

  map: any;
  bgclass = "";
  heatmapOverlay = null;
  heatmapTimer = null;
  markerClusterer = null;
  markerClustererSelected = null;
  clusterTimer = null;
  hasResize = false;
  timerHandle = null;

  render() {
    return (
      <div
        ref="map"
        style={{
          width: '100%',
          height: '100%'
        }}
      ></div>
    );
  }
  initialize(args: any, cb: any) {
    const mywindow = window as any;
    const BMap = mywindow.BMap as any;
    const center = this.decodeCors(args.center);
    this.map = new BMap.Map(this.$refs.map, {
      minZoom: args.minScale,
      maxZoom: args.maxScale,
      enableMapClick: false
    });
    const point = new BMap.Point(center.x, center.y);
    this.map.centerAndZoom(point, args.scale);
    this.map.enableScrollWheelZoom();
    this.map.disableInertialDragging();
    this.map.disableContinuousZoom();
    cb();
  }
  // 将外部坐标转为百度
  decodeCors(point: any) {
    const [x, y] = coordtransform.gcj02tobd09(point.x, point.y);
    return {
      x,
      y
    };
  }

  // 将百度转为外部坐标
  encodeCors(point: any) {
    const [x, y] = coordtransform.bd09togcj02(point.x, point.y);
    return {
      x,
      y
    };
  }
}