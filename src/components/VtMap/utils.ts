const config = (window as MyWindow).config.map as any;

export const loadMapFiles = () =>
  new Promise((resolve, reject) => {
    const jsElm = document.createElement('script');
    if (config.type === 'baidu') {
      jsElm.src = config[`baidu_${config.net}`];
    }
    jsElm.onload = () => {
      resolve();
    };
    document.head.appendChild(jsElm);
  });
