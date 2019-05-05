import { Component, Vue } from "vue-property-decorator";
import { loadMapFiles } from './utils'
import { getArrow, createCustomMarker, loadFiles, loadCss } from './mapUtils';
import coordtransform from "coordtransform";
export interface IPoint {
  x: number;
  y: number;
}

export const trackColors = [
  '#4285f4',
  '#666666',
  '#ff1c27',
  '#4489f1',
  '#ffffff',
];
@Component<BaiduMap>({
  props: {
    id: {
      required: true,
      type: String
    },
    needClearOverlays: {
      type: Boolean,
      default: false,
    },
  }
})
export default class BaiduMap extends Vue {
  readonly id!: string;
  readonly needClearOverlays!: boolean;

  map: any;
  bgclass = '';
  heatmapOverlay = null as any;
  heatmapTimer = null as any;
  markerClusterer = null as any;
  markerClustererSelected = null as any;
  clusterTimer = null as any;
  hasResize = false;
  timerHandle = null as any;
  style = '';

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
  initialize(args: { center: any; minScale: any; maxScale: any; style: string; scale: any; }, cb: () => void) {
    const BMap = (window as MyWindow).BMap;
    const center = this.decodeCors(args.center);
    this.map = new BMap.Map(this.$refs.map, {
      minZoom: args.minScale,
      maxZoom: args.maxScale,
      enableMapClick: false,
    });
    this.style = args.style;
    const point = new BMap.Point(center.x, center.y);
    const navigation = new BMap.NavigationControl({anchor: 'BMAP_ANCHOR_TOP_RIGHT', type: 'BMAP_NAVIGATION_CONTROL_SMALL'});
    this.map.centerAndZoom(point, args.scale);
    this.map.enableScrollWheelZoom();
    this.map.disableInertialDragging();
    this.map.disableContinuousZoom();
    this.map.addControl(new BMap.MapTypeControl({
      // mapTypes:[
      //   BMap.BMAP_SATELLITE_MAP,
      //   BMap.BMAP_HYBRID_MAP,
      // ],
    }));
    this.map.addControl(navigation);
    cb();
  }


  resetLocation(center: IPoint, scale: any, bounds:any) {
    if (bounds) {
      const BMap = (window as MyWindow).BMap;
      const points = Object.values(JSON.parse(bounds))
        .map((point: any) => this.decodeCors(point))
        .map((point: any) => new BMap.Point(point.x, point.y));
      this.map.setViewport(points);
      this.setZoom(scale);
    } else {
      this.setCenter(center);
      this.setZoom(scale);
    }
  }

  resizeMap() {
    const { map } = this;
    if (!this.hasResize) {
      const mapParentHeight = this.$el.clientHeight * 1;
      const mapHeight = (this.$el as any).querySelector('.BMap_mask').style.height.replace('px', '') * 1;
      if (mapParentHeight !== 0 && mapParentHeight - 5 > mapHeight) {
        this.hasResize = true;
        const center = map.getCenter();
        map.checkResize();
        map.setCenter(center);
      } if (mapParentHeight === mapHeight) {
        this.hasResize = true;
      } else {
        this.timerHandle = setTimeout(
          () => {
            this.resizeMap();
          },
          1000);
      }
    }
  }

  getCenter() {
    const point = this.map.getCenter();
    return this.encodeCors({
      x: point.lng,
      y: point.lat,
    });
  }

  drawBoundries(boundries: any[]) {
    const BMap = (window as MyWindow).BMap;
    const count = boundries.length; // 行政区域的点有多少个
    let points: any[] | never[] = [];
    for (let i = 0; i < count; i = i + 1) {
      const ply = new BMap.Polygon(boundries[i], {
        strokeWeight: 2,
        strokeColor: '#ff0000',
      }); // 建立多边形覆盖物
      ply.setFillColor('none');
      this.map.addOverlay(ply); // 添加覆盖物
      points = points.concat(this.getPoints(boundries[i]) as any || [] as any);
    }
    this.fitBounds(points); // 调整视野
  }
  fitBounds(points: any[]) {
    this.map.setViewport(points); // 调整视野
  }

  setViewport(pointList: { map: (arg0: (point: any) => { x: any; y: any; }) => { map: (arg0: (point: any) => any) => void; }; }) {
    const BMap = (window as MyWindow).BMap;
    const points = pointList
      .map((point: { x: any; y: any; }) => this.decodeCors(point))
      .map((point: { x: any; y: any; }) => new BMap.Point(point.x, point.y));
    this.map.setViewport(points);
  }

  flyTo(point: { x: any; y: any; }) {
    const BMap = (window as MyWindow).BMap;
    const formattedPoint = this.decodeCors(point);
    this.map.panTo(new BMap.Point(formattedPoint.x, formattedPoint.y)); // 平滑过渡到对应的点上
  }

  getContainer() {
    return this.map.getContainer();
  }

  getPoints(str: { split: (arg0: string) => void; }) {
    const BMap = (window as MyWindow).BMap;
    const tmp = [];
    const points = str.split(';') as any;
    for (const o in points) {
      const m = points[o].split(',');
      tmp.push(new BMap.Point(m[0], m[1]));
    }
    return tmp;
  }

  setCenterAndZoom(center: any, zoom: any) {
    this.map.centerAndZoom(center, zoom);
  }

  setCenter(point: IPoint) {
    const BMap = (window as MyWindow).BMap;
    const formattedPoint = this.decodeCors(point);
    this.map.setCenter(new BMap.Point(formattedPoint.x, formattedPoint.y));
  }
  
  attachClick(handler: (arg0: { x: any; y: any; }) => void) {
    this.map.addEventListener('click', (e: { point: { lng: any; lat: any; }; }) => {
      if (this.needClearOverlays) {
        this.map.clearOverlays();
      }
      const point = {
        x: e.point.lng,
        y: e.point.lat,
      };
      handler(this.encodeCors(point));
    });
  }

  attachMove(handler: (arg0: { x: any; y: any; }) => void) {
    this.map.addEventListener('mousemove', (e: { point: { lng: any; lat: any; }; }) => {
      const point = {
        x: e.point.lng,
        y: e.point.lat,
      };
      handler(this.encodeCors(point));
    });
  }

  attachZoom(handler: any) {
    this.map.addEventListener('zoomend', handler);
  }

  attachDrag(handler: any) {
    this.map.addEventListener('moveend', handler);
  }

  attachEventForOverlay(overlay: { addEventListener: (arg0: any, arg1: (e: any) => any) => void; }, event: any, handler: (arg0: any) => void) {
    overlay.addEventListener(event, (e: { domEvent: any; }) => handler(e.domEvent));
  }

  clearOverlays() {
    this.map.clearOverlays();
  }

  removeOverlay(overlay: { remove: () => void; hide: () => void; }) {
    if (overlay) {
      if (overlay.remove) {
        overlay.remove();
      } else if (overlay.hide) {
        overlay.hide();
      }
    }
  }

  loadDrawTool() {

  }

  showDrawManager() {
    const BMAP_ANCHOR_BOTTOM_LEFT = 1;
    const BMapLib = (window as MyWindow).BMapLib;
    const BMap = (window as MyWindow).BMap;
    const styleOptions = {
      strokeColor: '#ccc',    // 边线颜色。
      fillColor: 'rgba(#4c4c4c,0.15)',      // 填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 2,       // 边线的宽度，以像素为单位。
      strokeOpacity: 0.8,	   // 边线透明度，取值范围0 - 1。
      fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
      strokeStyle: 'solid', // 边线的样式，solid或dashed。
    };
    const drawingManager = new BMapLib.DrawingManager(this.map, {
      isOpen: false, // 是否开启绘制模式
      enableDrawingTool: true, // 是否显示工具栏
      drawingToolOptions: {
        anchor: BMAP_ANCHOR_BOTTOM_LEFT, // 位置
        offset: new BMap.Size(5, 5), // 偏离值
      },
      rectangleOptions: styleOptions, // 矩形的样式
    });
    drawingManager.addEventListener('overlaycomplete', this.overlaycomplete);
  }

  overlaycomplete(e: { overlay: { getBounds: () => void; remove: () => void; }; }) {
    const bounds = e.overlay.getBounds();
    this.$emit('drawSelectReg', bounds);
    setTimeout(
      () => {
        e.overlay.remove();
      },
      100);
  }

  openInfo(content: any,e: { target: any; }) {
    const p = e.target;
    const opts = {
      width : 250, // 信息窗口宽度
      height: 40, // 信息窗口高度
      enableMessage:true , // 设置允许信息窗发送短息
    };
    const BMap = (window as MyWindow).BMap;
    const point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    const infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
    this.map.openInfoWindow(infoWindow, point); // 开启信息窗口
  }

  drawHeatMap(data: any, max: any,heatRadius: any) {
    loadFiles('./static/libs/heatmap_min.js').then(() => {
      clearTimeout(this.heatmapTimer);
      this.heatmapTimer = setTimeout(
        () => {
          this.handleHeatMap(data, max, heatRadius);
        },
        500,
      );
    });
  }

  handleHeatMap(data: { map: (arg0: (d: any) => void) => void; }, max: any,heatRadius: any) {
    const points: any[] | {}[] = [];
    data.map((d: { [x: string]: any; }) => {
      const [longitude, latitude] = coordtransform.gcj02tobd09(d['longitude'], d['latitude']);
      const tmp = {} as any;
      tmp['lat'] = latitude;
      tmp['lng'] = longitude;
      tmp['count'] = d['count_value'];
      points.push(tmp);
    });
    const BMapLib = (window as MyWindow).BMapLib;
    if (!this.heatmapOverlay && BMapLib.HeatmapOverlay) {
      const param = { radius: heatRadius };
      this.heatmapOverlay = new BMapLib.HeatmapOverlay(param);
      this.map.addOverlay(this.heatmapOverlay);
    }
    BMapLib.HeatmapOverlay && this.heatmapOverlay.setDataSet({ max, data: points });
    if (this.style === 'midnight') {
      const gradient = {
        .4: '#78e045',
        .5: '#ffda0f',
        .6: '#ff8b0f',
        .7: '#e24b46',
      };
      this.heatmapOverlay.setOptions({ gradient });
    }
  }

  removeHeatMap() {
    clearTimeout(this.heatmapTimer);
    this.heatmapOverlay && this.heatmapOverlay.remove();
    this.heatmapOverlay = null;
  }

  showHeatMap() {
    this.heatmapOverlay && this.heatmapOverlay.show();
  }

  hideHeatMap() {
    this.heatmapOverlay && this.heatmapOverlay.hide();
  }


  
  drawPolygonLine(
    start: IPoint,
    end: IPoint,
    color: string,
    weight: number,
    opacity: number,
  ) {
    const BMap = (window as MyWindow).BMap;
    const formattedStart = this.decodeCors(start);
    const formattedEnd = this.decodeCors(end);
    const polyline = new BMap.Polyline(
      [new BMap.Point(formattedStart.x, formattedStart.y), new BMap.Point(formattedEnd.x, formattedEnd.y)],
      {
        strokeColor: color,
        strokeWeight: weight,
        strokeOpacity: opacity,
      },
    );
    polyline.disableMassClear();
    this.map.addOverlay(polyline);
    return polyline;
  }



  drawLine(
    start: IPoint,
    end: IPoint,
    color: string,
    weight: number,
    opacity: number,
    withArrow?: boolean, // 是否需要画轨迹：http://nerdruns.com/index.php/2017/02/15/baidu_map_api_show_trace_with_direction_arrow/
  ) {
    const BMap = (window as MyWindow).BMap;
    const BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW = (window as MyWindow).BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW;
    const formattedStart = this.decodeCors(start);
    const formattedEnd = this.decodeCors(end);
    const options: any = {
      strokeColor: color,
      strokeWeight: weight,
      strokeOpacity: opacity,
    };
    let arrow = null;
    if (withArrow) {
      arrow = new BMap.IconSequence(
        new BMap.Symbol(
          BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW,
          {
            scale: weight / 10,
            strokeWeight: 3,
            rotation: 90,
            fillColor: trackColors[4],
            fillOpacity: 1,
            strokeColor: trackColors[4],
          },
        ),
        '10',
        '0',
        false,
      ),
        options.icons = [arrow];
    } else {
      // 画箭头
      arrow = this.drawArrow(
        start,
        end,
        color,
        weight,
        opacity,
      );
    }

    const polyline = new BMap.Polyline(
      [new BMap.Point(formattedStart.x, formattedStart.y), new BMap.Point(formattedEnd.x, formattedEnd.y)],
      options,
    );
    polyline.disableMassClear();
    this.map.addOverlay(polyline);
    return { arrow, line: polyline };
  }

  addOverlay(data: any) {
    this.map.addOverlay(data);
  }

  openInfoWindow(infowindow: any, point: any) {
    this.map.openInfoWindow(infowindow, point)
  }
  drawCurveLine(
    start: IPoint,
    end: IPoint,
    color: string,
    weight: number,
    opacity: number,
    withArrow?: boolean, // 是否需要画轨迹：http://nerdruns.com/index.php/2017/02/15/baidu_map_api_show_trace_with_direction_arrow/
  ) {
    const BMapLib = (window as MyWindow).BMapLib;
    const BMap = (window as MyWindow).BMap;
    const BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW = (window as MyWindow).BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW;
    const formattedStart = this.decodeCors(start);
    const formattedEnd = this.decodeCors(end);
    const options: any = {
      strokeColor: color,
      strokeWeight: weight,
      strokeOpacity: opacity,
    };
    let icon = null;
    if (withArrow) {
      icon = new BMap.IconSequence(
        new BMap.Symbol(
          BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW,
          {
            scale: weight / 10,
            strokeWeight: 3,
            rotation: 90,
            fillColor: trackColors[4],
            fillOpacity: 1,
            strokeColor: trackColors[4],
          },
        ),
        '10',
        '80',
        false,
      ),
        options.icons = [icon];
    }
    const curveline = new BMapLib.CurveLine(
      [new BMap.Point(formattedStart.x, formattedStart.y), new BMap.Point(formattedEnd.x, formattedEnd.y)],
      options,
    );
    curveline.disableMassClear();
    this.map.addOverlay(curveline);
    return { arrow: icon, line: curveline };
  }

  drawCircle(point: { x: any; y: any; }, radius: any, opts: any) {
    const BMap = (window as MyWindow).BMap;
    const formattedPoint = this.decodeCors(point);
    const circle = new BMap.Circle(new BMap.Point(formattedPoint.x, formattedPoint.y), radius, opts);
    circle.disableMassClear();
    this.map.addOverlay(circle);
    return circle;
  }

  drawPolygon(points: { map: (arg0: (p: any) => { x: any; y: any; }) => void; }, color: any, weight: any, opacity: any, fillOpacity: any) {
    const BMap = (window as MyWindow).BMap;
    const formattedPoints = points.map((p: { x: any; y: any; }) => this.decodeCors(p)) as any;
    const pointsOnMap = formattedPoints.map((p: { x: any; y: any; }) => new BMap.Point(p.x, p.y));
    const mask = new BMap.Polygon(pointsOnMap, {
      fillOpacity,
      strokeColor: color,
      strokeWeight: weight,
      strokeOpacity: opacity,
    });
    mask.disableMassClear();
    this.map.addOverlay(mask);
    return mask;
  }

  drawArrow(s: IPoint, e: IPoint, color: string, weight: number, opacity: number) {
    const BMap = (window as MyWindow).BMap;
    const start = this.decodeCors(s);
    const end = this.decodeCors(e);
    const arrow = getArrow(
      [
        {
          lng: start.x,
          lat: start.y,
        },
        {
          lng: end.x,
          lat: end.y,
        },
      ],
      color,
      weight,
      opacity,
      (point: any) => {
        return this.map.pointToPixel(point);
      },
      (px: any, py: any) => {
        return this.map.pixelToPoint(new BMap.Pixel(px, py));
      },
      (points: any) => {
        return new BMap.Polygon(points, {
          strokeColor: color,
          strokeWeight: weight,
          strokeOpacity: opacity,
          fillOpacity: opacity,
          fillColor: color,
        });
      },
    );
    arrow.disableMassClear();
    this.map.addOverlay(arrow);
    return arrow;
  }

  drawLineArrow(line: any) {
    return null;
  }

  createCustomMarker(id: any, location: { x: any; y: any; }, element: any, offset: any) {
    const formattedLocation = this.decodeCors(location);
    const overlay = createCustomMarker(formattedLocation, element, offset, {
      enableMassClear: false,
    });
    this.map.addOverlay(overlay);
    return overlay;
  }

  createNormalMarker(id: any, location: { x: any; y: any; }, icon: { url: any; width: any; height: any; }, movable: any) {
    const BMap = (window as MyWindow).BMap;
    const formattedLocation = this.decodeCors(location);
    let mapMarker;
    if (icon) {
      mapMarker = new BMap.Marker(new BMap.Point(formattedLocation.x, formattedLocation.y), {
        icon: new BMap.Icon(icon.url, new BMap.Size(icon.width, icon.height)),
      });
    } else {
      mapMarker = new BMap.Marker(new BMap.Point(formattedLocation.x, formattedLocation.y));
    }
    if (movable) {
      mapMarker.enableDragging();
      mapMarker.addEventListener('dragend', (event: { point: { lng: any; lat: any; }; }) => {
        this.$emit('markerDrag', {
          id,
          location: this.encodeCors({
            x: event.point.lng,
            y: event.point.lat,
          }),
        });
      });
    }
    mapMarker.disableMassClear();
    this.map.addOverlay(mapMarker);
    return mapMarker;
  }

  calculateDistance(first: IPoint, second: IPoint): number {
    const BMap = (window as MyWindow).BMap;
    const firstPoint = this.decodeCors(first);
    const secondPoint = this.decodeCors(second);
    const pixelFirst = this.map.pointToPixel(
      new BMap.Point(firstPoint.x, firstPoint.y),
    );
    const pixelSecond = this.map.pointToPixel(
      new BMap.Point(secondPoint.x, secondPoint.y),
    );
    const xDistance = pixelFirst.x - pixelSecond.x;
    const yDistance = pixelFirst.y - pixelSecond.y;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  }

  zoomIn() {
    this.map.zoomIn();
  }

  zoomOut() {
    this.map.zoomOut();
  }

  getZoom() {
    return this.map.getZoom();
  }

  setZoom(zoom: any) {
    return this.map.setZoom(zoom);
  }

  getBounds() {
    const bounds = this.map.getBounds();
    const bssw = bounds.getSouthWest(); // 可视区域左下角
    const bsne = bounds.getNorthEast(); // 可视区域右上角
    return {
      sw: this.encodeCors({
        x: bssw.lng,
        y: bssw.lat,
      }),
      ne: this.encodeCors({
        x: bsne.lng,
        y: bsne.lat,
      }),
    };
  }
  // 将外部坐标转为百度
  decodeCors(point: { x: any; y: any; }) {
    const [x, y] = coordtransform.gcj02tobd09(point.x, point.y);
    return {
      x,
      y,
    };
  }

  // 将百度转为外部坐标
  encodeCors(point: { x: any; y: any; }) {
    const [x, y] = coordtransform.bd09togcj02(point.x, point.y);
    return {
      x,
      y,
    };
  }
  pointToPixel(point: { x: any; y: any; }) {
    return this.map.pointToPixel(point.x, point.y);
  }

  pixelToPoint(point: { x: any; }) {
    return this.map.pixelToPoint(point.x,point)

  }

  destroyMap() {
    clearTimeout(this.timerHandle);
    this.timerHandle = null;
    this.map = null;
  }

  disableDragging() {
    this.map.disableDragging();
  }

  enableDragging() {
    this.map.enableDragging();
  }
}