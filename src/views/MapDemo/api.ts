export function drawLine(parmas: { data: any; bmap: any; refsMap: any; }) {
  const { data, bmap, refsMap } = parmas;
  data.map((item: { name: string; polygon: { coordinates: any[]; }; }, index: any) => {
    if (item.name !== '深圳市') {
      item.polygon.coordinates.map((p) => {
        // this.polygon = this.polygon.concat(p);
        addPolygon(bmap, p);
      });
    } else {
      refsMap.renderMapcoveredLocuse(item.polygon.coordinates[0]);
    }
  });
}

// 绘制初始化区域
export function addPolygon(map: { addOverlay: (arg0: any) => void; }, rs: { map: (arg0: (item: any) => void) => void; }) {
  const BMap = (window as MyWindow).BMap;
  const polygons: any[] = [];
  rs.map((item) => {
    polygons.push(new BMap.Point(item[0], item[1]));
  });
  const polygon = new BMap.Polyline(polygons, { strokeColor: 'red', strokeWeight: 2, strokeOpacity: 0.9 });  // 创建多边形
  // const polygon = new BMap.Polygon(polygons, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.9});  //创建多边形
  map.addOverlay(polygon);   // 增加多边形
}

  // 绘制热力图
export function drawHeatMap(params: { data: any; heatThreshold: any; map: any; }) {
  const { data, heatThreshold, map } = params;
  const points: any[] | { count_value: any; latitude: any; longitude: any; record_date: string; }[] = [];

  data.map((i: { alarmCount: any; latitude: any; longitude: any; }) => {
    points.push(
      {
        count_value: i.alarmCount,
        latitude: i.latitude,
        longitude: i.longitude,
        record_date: '',
      },
    );
  });
  map.drawHeatMap(points, heatThreshold);
}