import { common } from '../common';
const getDataKey: any = function(target:any) {
  const dataKey = target.getAttribute('rightmousedataid');
  if (!dataKey && target.parentNode) {
    return getDataKey(target.parentNode || {})
  }
  return dataKey;
};
const rightMouseCallback = (event:any) => {
  if (event.which !== 3) {
    return;
  }
  const target = event.target || {};
  const transferKey = getDataKey(target || {});
  const { bindFunc } = common.rightMouseParam[transferKey];
  bindFunc(event);
};
// 获取key , 有可能点击的是一个子元素,找父级的rightmousedataid,一直到找到为止


let isContextCover = false;
export default {
  inserted(el:any, binding:any, vnode:any) {

    // 获取要绑定的方法调用,    
    const bindFunc = binding.value;
    if (!bindFunc || typeof bindFunc !== 'function') {
      return;
    }
    // 获取节点的监听事件回调,用来回调用户绑定在el上的事件监听方法
    const listeners = common.getListeners(vnode);

    // 作为唯一key 存储
    const transferKey = common.getRandomId();
    // 只覆盖一次,避免重复执行
    if (!isContextCover) {
      // 移除默认的右键点击事件
      document.oncontextmenu = () => {
        return false;
      };
      isContextCover = true;
    }
    // 设置数据存储key
    el.setAttribute('rightmousedataid', transferKey);

    // 这个数据会被Callback 使用
    common.rightMouseParam[transferKey] = {
      transferKey,
      bindFunc,
      listeners,
      binding,
      vnode,
    };
    // 不能监听click click事件只会在单击鼠标左键和中键时触发，单击右键时不会触发
    el.addEventListener(
      'mousedown',
      rightMouseCallback,
      false,
    );
  },

  // 组件更新,拖拽的数据更新,比如图片路径更新
  componentUpdated(el:any, binding:any, vnode:any) {

    // 作为唯一key 存储
    const targetParamId = getDataKey(el);

    // 获取target的参数
    let { transferKey } = common.rightMouseParam[targetParamId];

    // 删除 common 上的传递数据 ,避免数据冗余
    delete common.rightMouseParam[transferKey];

    // 获取要绑定的方法调用,更新避免参数更新,没有及时更新
    const bindFunc = binding.value;
    // 生成新的共享数据并设置key
    transferKey = common.getRandomId();
    el.setAttribute('rightmousedataid', transferKey);

    const listeners = common.getListeners(vnode);
    // 这个数据会被dargStart Callback 使用
    common.rightMouseParam[transferKey] = {
      transferKey,
      bindFunc,
      listeners,
      binding,
      vnode,
    };

    if (!bindFunc || typeof bindFunc !== 'function') {
      return;
    }
    el.removeEventListener(
      'mousedown',
      rightMouseCallback,
      false,
    );
    el.addEventListener(
      'mousedown',
      rightMouseCallback,
      false,
    );
    if (!isContextCover) {
      // 移除默认的右键点击事件
      document.oncontextmenu = () => {
        return false;
      };
      isContextCover = true;
    }
  },
  unbind(el:any, binding:any, vnode:any) {
    // 作为唯一key 存储
    const targetParamId = getDataKey(el);

    // 获取target的参数
    const { transferKey } = common.rightMouseParam[targetParamId];

    // 删除 common 上的传递数据 ,避免数据冗余
    delete common.rightMouseParam[transferKey];

    isContextCover = false;
    el.removeEventListener(
      'mousedown',
      rightMouseCallback,
      false,
    );
  },
};
