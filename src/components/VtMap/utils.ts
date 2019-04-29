// const config = window.config.map;

export const loadMapFiles = () =>
  new Promise((resolve, reject) => {
    const jsElm = document.createElement('script');
    jsElm.src = process.env.NODE_ENV === 'development' ? 
    'http://api.map.baidu.com/getscript?v=2.0&ak=0EdgN8Esqj7WbNqjiSnNwarkP3Ck0KQV':
    'https://api.map.baidu.com/getscript?v=2.0&ak=0EdgN8Esqj7WbNqjiSnNwarkP3Ck0KQV';

    // if (config.type === 'baidu') {
      // jsElm.src = config.baidu;
    // } else {
      // const minemapCconfig = config.minemap;
      // jsElm.src = minemapCconfig.jsLink;
      // const cssElm = document.createElement('link');
      // cssElm.rel = 'stylesheet';
      // cssElm.href = minemapCconfig.cssLink;
      // document.head.appendChild(cssElm);
    // }
    jsElm.onload = () => {
      resolve();
    };
    document.head.appendChild(jsElm);
  });