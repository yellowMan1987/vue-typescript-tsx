const config = (window as MyWindow).config.map as any;

export const loadMapFiles = () =>
  new Promise((resolve, reject) => {
    const jsElm = document.createElement('script');
    if (config.type === 'baidu') {
      jsElm.src = config[`baidu_${config.net}`];
    } else {
      const minemapCconfig = config[`minemap_${config.net}`];
      jsElm.src = minemapCconfig.jsLink;
      const cssElm = document.createElement('link');
      cssElm.rel = 'stylesheet';
      cssElm.href = minemapCconfig.cssLink;
      document.head.appendChild(cssElm);
    }
    jsElm.onload = () => {
      resolve();
    };
    document.head.appendChild(jsElm);
  });

export const loadFiles = (url: string) => {
  return new Promise((resolve, reject) => {
    if (config.plugins && config.plugins[url]) {
      resolve();
    } else {
      config.plugins = config.plugins ? config.plugins : {};
      config.plugins[url] = 1;
      const jsElm = document.createElement('script');
      jsElm.src = url;
      jsElm.async = false;
      jsElm.onload = () => {
        resolve();
      };
      document.head.appendChild(jsElm);
    }
  });
};

export const loadCss = (url: string) => {
  return new Promise((resolve, reject) => {
    if (config.plugins && config.plugins[url]) {
      resolve();
    } else {
      config.plugins = config.plugins ? config.plugins : {};
      config.plugins[url] = 1;
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => {
        resolve();
      };
      document.head.appendChild(link);
    }
  });
};



export const getArrow = (
  linePoint: any[] | { lng: any; lat: any; }[],
  color: string,
  weight: number,
  opacity: number,
  pointToPixel: { (point: any): any; (arg0: any): void; (arg0: any): void; },
  pixelToPoint: { (px: any, py: any): any; (arg0: any, arg1: any): void; (arg0: any, arg1: any): void; },
  draw: { (points: any): any; (arg0: any[]): void; },
) => {
  // 绘制箭头的函数
  const length = 8;
  const angleValue = Math.PI / 7;
  const arrowCount = linePoint.length;
  for (let i = 1; i < arrowCount; i = i + 1) {
    // 在拐点处绘制箭头
    const pixelStart = pointToPixel(linePoint[i - 1]);
    const pixelEnd = pointToPixel(linePoint[i]);
    const angle = angleValue; // 箭头和主线的夹角
    const r = length; // r/Math.sin(angle)代表箭头长度
    let delta = 0; // 主线斜率，垂直时无斜率
    let param = 0; // 代码简洁考虑
    let pixelTemX;
    let pixelTemY; // 临时点坐标
    let pixelX; 
    let pixelY; 
    let pixelX1; 
    let pixelY1; // 箭头两个点
    if (pixelEnd.x - pixelStart.x === 0) {
      // 斜率不存在时
      pixelTemX = pixelEnd.x;
      if (pixelEnd.y > pixelStart.y) {
        pixelTemY = pixelEnd.y - r;
      } else {
        pixelTemY = pixelEnd.y + r;
      }
      // 已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
      pixelX = pixelTemX - r * Math.tan(angle);
      pixelX1 = pixelTemX + r * Math.tan(angle);
      pixelY = pixelY1 = pixelTemY;
    } else {
      // 斜率存在时
      delta = (pixelEnd.y - pixelStart.y) / (pixelEnd.x - pixelStart.x);
      param = Math.sqrt(delta * delta + 1);

      if (pixelEnd.x - pixelStart.x < 0) {
        // 第二、三象限
        pixelTemX = pixelEnd.x + r / param;
        pixelTemY = pixelEnd.y + delta * r / param;
      } else {
        // 第一、四象限
        pixelTemX = pixelEnd.x - r / param;
        pixelTemY = pixelEnd.y - delta * r / param;
      }
      // 已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
      pixelX = pixelTemX + Math.tan(angle) * r * delta / param;
      pixelY = pixelTemY - Math.tan(angle) * r / param;

      pixelX1 = pixelTemX - Math.tan(angle) * r * delta / param;
      pixelY1 = pixelTemY + Math.tan(angle) * r / param;
    }

    const pointArrow = pixelToPoint(pixelX, pixelY);
    const pointArrow1 = pixelToPoint(pixelX1, pixelY1);
    const arrow = draw([pointArrow, linePoint[i], pointArrow1]);
    return arrow;
  }
};

export const createCustomMarker = (
  location: { x: any; y: any; },
  element: any,
  elementOffset = { x: 0, y: 0 },
  options: { enableMassClear: boolean; },
) => {
  const BMap = (window as MyWindow).BMap;
  function customMarkerOverlayClass(this: any,point: any, element: any, offset: { x: number; y: number; }, options: any) {
    this._point = point;
    this._element = element;
    this._element.style.position = 'absolute';
    this._offset = offset;
    this._options = options;
  }
  customMarkerOverlayClass.prototype = new BMap.Overlay();
  customMarkerOverlayClass.prototype.initialize = function (map: any) {
    this._map = map;
    this._map.getPanes().labelPane.appendChild(this._element);

    if (!this._options.enableMassClear) {
      this._map.addEventListener('clearoverlays', () => {
        this._map.addOverlay(this);
      });
    }

    return this._element;
  };
  customMarkerOverlayClass.prototype.draw = function () {
    const pixel = this._map.pointToOverlayPixel(this._point);

    // 地图覆盖物的默认位置是左上角对应经纬度，所以需要调整偏移值以符合 UI 需求
    this._element.style.left = pixel.x + this._offset.x + 'px';
    this._element.style.top = pixel.y + this._offset.y + 'px';
  };

  return new (customMarkerOverlayClass as any)(
    new BMap.Point(location.x, location.y),
    element,
    elementOffset,
    options,
  );
};

// MineMap 中设置标注点可拖拽：http://minedata.cn/minemapapi/demo/index.html#gongan-movemarker-9
export const setElementMovable = (map: { getCanvasContainer: () => void; dragPan: { disable: () => void; enable: () => void; }; on: (arg0: string, arg1: (e: any) => void) => void; off: (arg0: string, arg1: (e: any) => void) => void; }, marker: any, el: { onmouseover: () => void; onmouseout: () => void; onmousedown: () => void; onmouseup: () => void; marker: any; }, handler: (arg0: { x: any; y: any; }) => void) => {
  // 标记鼠标拖拽状态
  let draggingFlag: boolean;
  // 标记鼠标是否在点图层上面
  let cursorOverPointFlag: boolean;
  // 选定的marker
  let selectedMarker: { setLngLat: (arg0: any) => void; getLngLat: () => void; } | any;

  const container = map.getCanvasContainer() as any;

  function mouseMovePoint(e: { lngLat: any; }) {
    if (!draggingFlag) return;
    container.style.cursor = 'grabbing';
    selectedMarker.setLngLat(e.lngLat);
  }

  // marker标签监听鼠标是否移入
  el.onmouseover = function () {
    cursorOverPointFlag = true;
    map.dragPan.disable();
  };
  // marker标签监听鼠标是否移出
  el.onmouseout = function () {
    cursorOverPointFlag = false;
    map.dragPan.enable();
  };
  // marker标签监听鼠标是否点击
  el.onmousedown = function () {
    if (!cursorOverPointFlag) return;
    selectedMarker = this.marker;
    draggingFlag = true;
    container.style.cursor = 'grab';
    map.on('mousemove', mouseMovePoint);
  };
  // marker标签监听鼠标是否鼠标按键抬起
  el.onmouseup = function () {
    if (!draggingFlag) return;

    container.style.cursor = '';
    draggingFlag = false;
    map.off('mousemove', mouseMovePoint);

    const location = selectedMarker.getLngLat();
    handler({
      x: location.lng,
      y: location.lat,
    });
  };

  el.marker = marker;
};

// 获取中心点: http://blog.csdn.net/liumengcheng/article/details/78541326
export const getCenter = (points: { y: string | number; }[] | any) => {
  let sumX = 0;
  let sumY = 0;
  let sumArea = 0;
  let p1 = points[1];
  for (let i = 2; i < points.length; i = i + 1) {
    const p2 = points[i];
    const area = getArea(points[0], p1, p2);
    sumArea += area;
    sumX += (points[0].x + p1.x + p2.x) * area;
    sumY += (points[0].y + p1.y + p2.y) * area;
    p1 = p2;
  }
  const xx = sumX / sumArea / 3;
  const yy = sumY / sumArea / 3;

  return {
    x: xx,
    y: yy,
  };
};

function getArea(p0: { x: number; y: number; }, p1: { y: number; x: number; }, p2: { y: number; x: number; }) {
  const area =
    p0.x * p1.y +
    p1.x * p2.y +
    p2.x * p0.y -
    p1.x * p0.y -
    p2.x * p1.y -
    p0.x * p2.y;
  return area / 2;
}

// 画轨迹的时候，线需要比两个点实际距离略短，留出空隙放标记
const EMPTY_GAP = 20;
export const calculateShorterLinePoints = (start: { x: number; y: number; }, end: { x: number; y: number; }) => {
  const distance = Math.sqrt(
    Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2),
  );
  if (start.x === end.x) {
    return;
  }
};
