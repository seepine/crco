import { isBoolean, isNumber, isObject } from './is'

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

interface DebounceOption {
  wait?: number
  leading?: boolean // 开始前调用,true
  trailing?: boolean // 结束后调用,false
}
export function debounce(func: Function, option: DebounceOption | number) {
  if (typeof func !== 'function') {
    throw new TypeError('debounce need a function arguments')
  }
  let timeid: any = null
  let wait = 500
  let leading = true
  let trailing = false

  if (isNumber(option)) {
    wait = option
  } else if (isObject(option)) {
    leading = isBoolean(option.leading) ? option.leading : leading
    trailing = isBoolean(option.trailing) ? option.trailing : trailing
  }
  return () => {
    if (timeid) {
      clearTimeout(timeid)
      return
    }
    if (leading) {
      func()
    }
    timeid = setTimeout(() => {
      if (trailing) {
        func()
      }
      timeid = undefined
    }, wait)
  }
}
