
interface MyWindow extends Window {
  config: {
    space: {
      heatThreshold: any,
      cameraShowNum: any,
      shenzhenCenter: any;
      polygonCenter: any[];
      coverageList: any[];
      cameraType: any[];
      targetType: any[];
      sceneTypeTotal: any[];
      targetTypeTotal: any[];
      targetTypeIncludeTotal: any[];
      targetTypeNotIncludeTotal: any[];
    };
    map: {
      type: string;
      net: string;
      initialLocation: {
        x: number;
        y: number;
      };
      initialInvalidLocation: {
        x: number;
        y: number;
      };
      plugins: {};
      initialZoom: number;
      maxZoom: number;
      minZoom: number;
      heatRadius: number;
      bounds: {
        sw: {
          x: any,
          y: any,
        },
        ne: {
          x: any,
          y: any,
        }
      }
      baidu_online: string;
      baidu_offline: string;
      baidu_offline_loadUrl: string;
      baidu_offline_home: string;
    };
  }
  BMapLib: any;
  BMap: any;
  BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW: any;
  env: any;

}