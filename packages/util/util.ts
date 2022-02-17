export function deepClone(data: any): any {
  const type = Object.prototype.toString.call(data)
  let obj
  // 数组的话遍历拷贝
  if (type === '[object Array]') {
    obj = []
    for (let i = 0, len = data.length; i < len; i += 1) {
      obj.push(deepClone(data[i]))
    }
  }
  // 对象的话遍历属性拷贝
  else if (type === '[object Object]') {
    obj = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        // @ts-ignore
        obj[key] = deepClone(data[key])
      }
    }
  }
  // 其他类型直接返回
  else {
    // 不再具有下一层次
    return data
  }
  return obj
}
