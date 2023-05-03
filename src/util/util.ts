import { isBoolean, isNumber, isObject, isArray, isUndefined, isFunction, isPromise } from './is'

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

/**
 * @param source source
 * @param target target
 * @returns quota.vue
 */
export function copyPropertiesNotEmpty(source: any, target: any) {
  if (!source) {
    return source
  }
  // const isArray = source.constructor === Array
  if (isArray(source)) {
    // eslint-disable-next-line no-param-reassign
    target = []
    for (let i = 0, len = source.length; i < len; i += 1) {
      target.push(copyPropertiesNotEmpty(source[i], target[i]))
    }
  } else if (isObject(source)) {
    if (!target) {
      // eslint-disable-next-line no-param-reassign
      target = {}
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const key in source) {
      // eslint-disable-next-line no-prototype-builtins
      if (source.hasOwnProperty(key)) {
        // eslint-disable-next-line no-param-reassign
        target[key] = copyPropertiesNotEmpty(source[key], target[key])
      }
    }
  } else {
    // eslint-disable-next-line no-param-reassign
    target = source
  }
  return target
}

interface DebounceOption {
  wait?: number
  leading?: boolean // 开始前调用,true
  trailing?: boolean // 结束后调用,false
}
export function debounce(func: Function, option?: DebounceOption | number) {
  if (typeof func !== 'function') {
    throw new TypeError('debounce need a function arguments')
  }
  let timer: any = null
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
    if (timer) {
      clearTimeout(timer)
      return
    }
    if (leading) {
      func()
    }
    timer = setTimeout(() => {
      if (trailing) {
        func()
      }
      timer = undefined
    }, wait)
  }
}

export function dateFormat(date: Date, format = 'yyyy-MM-dd hh:mm:ss') {
  if (date) {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      return ''
    }
    const o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'D+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'H+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds() // millisecond
    }
    let fmt = format
    if (/(y+)/.test(format) || /(Y+)/.test(format)) {
      fmt = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        fmt = fmt.replace(
          RegExp.$1,
          // @ts-ignore
          RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
        )
      }
    }
    return fmt
  }
  return ''
}

/**
 * 执行回调获取结果值
 * @param callback 可能是基础类型、函数、promise等
 * @param data 需要传递给回调的值
 * @returns RES获取的值，REJ出错值
 */
export function runCallback(callback: any, ...data: any): Promise<any> {
  return new Promise((RES, REJ) => {
    if (isUndefined(callback)) {
      REJ(Error('value is undefined'))
    } else if (isFunction(callback)) {
      const func = callback(...data)
      if (isPromise(func)) {
        func
          .then((res: any) => {
            RES(res)
          })
          .catch((err: any) => {
            REJ(err)
          })
      } else {
        RES(func)
      }
    } else if (isPromise(callback)) {
      callback(...data)
        .then((res: any) => {
          RES(res)
        })
        .catch((err: any) => {
          REJ(err)
        })
    } else {
      RES(callback)
    }
  })
}

/**
 *
 * callback: (a,b,done)=>{
 *    // ...
 *    done()
 * }
 *
 * callback: (a,b)=>{
 *    return new Promise((RES)=>{
 *       RES()
 *    })
 * }
 *
 * 提供方法执行异步
 * @param callback 可能是基础类型、函数、promise等
 * @param data 数据
 * @returns primise
 */
export function runDone(callback: any, ...data: any): Promise<any> {
  return new Promise((RES, REJ) => {
    if (isUndefined(callback)) {
      REJ(Error('value is undefined'))
    } else if (isFunction(callback)) {
      const func = callback(...data)
      if (isPromise(func)) {
        func
          .then((res: any) => {
            RES(res)
          })
          .catch((err: any) => {
            REJ(err)
          })
      } else if (!isUndefined(func)) {
        RES(func)
      }
    } else if (isPromise(callback)) {
      callback(...data)
        .then((res: any) => {
          RES(res)
        })
        .catch((err: any) => {
          REJ(err)
        })
    } else {
      RES(callback)
    }
  })
}
