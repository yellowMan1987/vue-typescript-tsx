const getRealVal = (obj:any) => obj && obj.value;
const formValueObj = (value:any) => ({ value });

export const Cache = {
  localGet(key:any) {
    try {
      return getRealVal(JSON.parse(window.localStorage.getItem(key) as any));
    } catch (error) {
      console.error(error);
    }
  },
  localSet(key:any, value:any) {
    window.localStorage.setItem(key, JSON.stringify(formValueObj(value)));
  },
  localRemove(key:any) {
    window.localStorage.removeItem(key);
  },
  localClear() {
    window.localStorage.clear();
  },
}