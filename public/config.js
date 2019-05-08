window.config = {
  map: {
    type: 'baidu',
    net: 'offline',
    initialLocation: {
      x: 114.062252,
      y: 22.549791,
    },
    initialZoom: 12,
    maxZoom: 18,
    minZoom: 5,
    heatRadius: 40,
    baidu_offline: './static/offlineMap/map_load.js',
    baidu_offline_loadUrl: './static/offlineMap/tiles',
    baidu_offline_home: './static/offlineMap/',
    baidu_online: 'http://api.map.baidu.com/getscript?v=2.0&ak=slcEipuAs0barmp2cNcIrXMcCC2WGtaG&services=&t=20171031174121',
  },
};
