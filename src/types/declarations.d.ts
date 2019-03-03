interface IMineMapTheme {
  accessToken: string;
  solution: number;
}

interface MyWindow extends Window {
  config: {
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

      minemap: {
        host: string;
        jsLink: string;
        cssLink: string;
        themes: {
          normal: IMineMapTheme;
          midnight: IMineMapTheme;
        };
      };
    };
  }
  BMapLib: any;
  BMap: any;
  BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW: any;
  minemap: any;
  env: any;
}