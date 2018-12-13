export const common = {
  rightMouseParamKey: null,
  rightMouseParam: {} as any,
  
  getListeners(vnode:any) {
    if (vnode.data && vnode.data.on) {
      // 这里返回一个对象,包含目标节点上的所有事件监听
      return vnode.data.on;
    }
    if (vnode.componentOptions && vnode.componentOptions.listeners) {
      return vnode.componentOptions.listeners;
    }
    return {};
  },
  // 获取修饰符内容
  getNamespace(binding:any, vnode:any) {
    const argument = binding.arg;
    if (typeof argument !== 'string') {
      return null;
    }
    if (binding.modifiers.dynamic) {
      const namespace = vnode.context[argument];
      return typeof namespace !== 'string' ? null : namespace;
    }
    return argument;
  },
  getRandomId() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
}
