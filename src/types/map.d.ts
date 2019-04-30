interface IPoint {
  x: number;
  y: number;
}

interface ILocus {
  id?: string;
  points: ILocusPoint[];
  color: string;
  width?: number;
  opacity?: number;
  isHighlight: boolean;
  hoverHandler?: Function;
  blurHandler?: Function;
  clickHandler?: Function;
  renderCustomElements?: () => any[];
  pointsMap: any;
  markerPoints: any[];
}

interface ILocusPoint {
  location: IPoint;
  hasCustomElement?: boolean;
  customElementOffset?: {
    x: number;
    y: number;
  };
  id: number;
}

interface IMarker {
  id?: string;
  location: IPoint;
  renderCustomElement?: Function;
  customElementOffset?: {
    x: number;
    y: number;
  };
  hasMarker?: boolean; // 是否显示小标注
  icon?: {
    url: string;
    width: number;
    height: number;
  };
  movable?: boolean;
}

interface IAreaMask {
  points: IPoint[];
  borderWidth?: number;
  color?: string;
  fillOpacity?: string;
}
