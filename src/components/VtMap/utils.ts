const config = (window as MyWindow).config.map as any;

export const loadMapFiles = () =>
  new Promise((resolve, reject) => {
    const jsElm = document.createElement('script');
    if (config.type === 'baidu') {
      jsElm.src = process.env.NODE_ENV === 'development' ? 
      'http://api.map.baidu.com/getscript?v=2.0&ak=0EdgN8Esqj7WbNqjiSnNwarkP3Ck0KQV':
      config[`baidu_${config.net}`];
    }
    jsElm.onload = () => {
      resolve();
    };
    document.head.appendChild(jsElm);
  });
