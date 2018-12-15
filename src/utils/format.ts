// 16进制颜色值转为 rgba
export function hex2rgba(hexColor:any, opacity:any) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const result = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  return result;
}

// 添加千分位分隔符
export function formatNumber(number: number | string) {
  const num = +number;
  let result;
  if (!num) {
    result = '0';
  } else {
    const str = '' + num;
    const rev = str
      .split('')
      .reverse()
      .join('');
    const added = rev.replace(/\d{3}(?!$)/g, s => s + ',');
    result = added
      .split('')
      .reverse()
      .join('');
  }
  return result;
}