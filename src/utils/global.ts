import Vue from "vue";


export const EventBus = new Vue();

const debounceTimer = {} as any;
// 一段时间 只触发第一次，key的定义 要根据当前的组件的路径 + 名称 + 用途的方式进行设置 防止重复
export function debounceByKey(key: string, func: any, timeout:number) {
  const str = `${key}#p6478==`;
  if (!debounceTimer[str]) {
    debounceTimer[str] = setTimeout(
      () => {
        func();
        clearTimeout(debounceTimer[str]);
        delete debounceTimer[str];
      },
      timeout);
  }
}

// 生成一个随机的 id：http://blog.csdn.net/mr_raptor/article/details/52280753
export const getRandomId = () => {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};


export function resizeWindow(callback:any) {
  window.addEventListener('resize', (event) => {
    debounceByKey('resizeWindow', () => { callback(event); }, 800);
  });
}

export function setHTMLfontSize() {
  // rely on CSS for scale for better performance and more responsive
  // see reset.scss
  const width = window.innerWidth;
  const HTML = document.getElementsByTagName('html')[0];
  HTML.style.fontSize = `${(width / 1920) * 100}px`;

  // Should be marked as deprecated?
  const win: any = window;
  win.reSetHtmlFontSizeEvent && win.reSetHtmlFontSizeEvent();
  EventBus.$emit('viewport-resize');
}


