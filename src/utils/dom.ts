
export const on = (
  element: HTMLElement | Element | HTMLDocument,
  event: string,
  handler: EventListenerOrEventListenerObject
) => {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
};

export const off = (
  element: HTMLElement | Element | HTMLDocument,
  event: string,
  handler: EventListenerOrEventListenerObject
) => {
  if (element && event) {
    element.removeEventListener(event, handler, false);
  }
};

export function swallowEvent(ev: Event) {
  ev.stopPropagation();
  ev.preventDefault();
}

export function offset(element: any) {
  let left = 0;
  let top = 0;
  const { width, height } = element.getBoundingClientRect();
  if (element.offsetParent) {
    do {
      left += element.offsetLeft;
      top += element.offsetTop;
    } while ((element = element.offsetParent as HTMLElement));
  }
  return { left, top, width, height };
}


export function handleMarkerPositionOnDom(event:any, containerDom:any, targetDom:any) {
  const containerOffset = offset(containerDom);
  const targetOffset = offset(targetDom);
  // 鼠标位置在container上的右边距下边距
  const rightEdge = containerOffset.width - event.clientX;
  const bottomEdge = containerOffset.height - event.clientY;
  const position = {
    left: 0,
    top: 0,
  };
  // 目标元素的宽和右边距作比较,调整左坐标
  if (targetOffset.width > rightEdge) {
    position.left = containerDom.scrollLeft + event.clientX - targetOffset.width;
  } else {
    position.left = containerDom.scrollLeft + event.clientX;
  }
  /*如果从鼠标位置到容器下边的空间小于菜单的高度，就定位菜单的上坐标（Top）为当前鼠标位置向上一个菜单高度*/
  if (targetOffset.height > bottomEdge) {
    position.top = containerDom.scrollTop + event.clientY - targetOffset.height;
  } else {
    /*否则，就定位菜单的上坐标为当前鼠标位置*/
    position.top = containerDom.scrollTop + event.clientY;
  }
  return position;
}