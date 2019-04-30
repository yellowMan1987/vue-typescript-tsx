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
    baidu:
      'https://api.map.baidu.com/getscript?v=2.0&ak=IXdnlKGwXtwh1gzs9cgxOuSciPRgQOXE&s=1',
    baidu_offline: '/static/offlineMap/map_load.js',
    baidu_offline_loadUrl: './static/offlineMap/tiles',
    baidu_offline_home: './static/offlineMap/',
  },
};
