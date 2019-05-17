const config = (window as MyWindow).config.map as any;
const memoize = require('lodash').memoize;

export const loadMapFiles = () => {
  const scriptAssets: string[] = [];
  const styleAssets: string[] = [];

  // 需要理清哪些地图需要哪些依赖
  if (config.type === 'baidu') {
    if (config.net === 'online' || process.env.NODE_ENV === 'development') {
      scriptAssets.push(config.baidu_online);
    } else {
      scriptAssets.push('./static/offlineMap/map_load.js');
      scriptAssets.push('./static/offlineMap/map.js');
      scriptAssets.push('./static/offlineMap/map_plus.js');
      scriptAssets.push('./static/offlineMap/map_city.js');
      styleAssets.push('./static/offlineMap/css/map.css');
    }
  }
  return Promise.all(
    scriptAssets.map(loadJs).concat(
      styleAssets.map(loadCss),
    ),
  );
}

export const loadFiles = (scriptAssets: any,styleAssets:any) => {

  return Promise.all(
    scriptAssets.map(loadJs).concat(
      styleAssets.map(loadCss),
    ),
  );
}

export const loadJs = memoize((url: string) =>
  new Promise((resolve, reject) => {
    const jsElm = document.createElement('script');
    jsElm.src = url;
    jsElm.async = false;
    jsElm.onload = resolve;
    jsElm.onerror = reject;
    document.head.appendChild(jsElm);
  }),
);

export const loadCss = memoize((url: string) =>
  new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  }),
);
