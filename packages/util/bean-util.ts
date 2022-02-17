// BeanUtils
const beanUtil = {
  /**
   * @param source source
   * @param target target
   * @returns quota.vue
   */
  copyPropertiesNotEmpty(source: any, target: any) {
    if (!source) {
      return source
    }
    const isObject = source.constructor === Object
    const isArray = source.constructor === Array
    if (isArray) {
      // eslint-disable-next-line no-param-reassign
      target = []
      for (let i = 0, len = source.length; i < len; i += 1) {
        target.push(this.copyPropertiesNotEmpty(source[i], target[i]))
      }
    } else if (isObject) {
      if (!target) {
        // eslint-disable-next-line no-param-reassign
        target = {}
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const key in source) {
        // eslint-disable-next-line no-prototype-builtins
        if (source.hasOwnProperty(key)) {
          // eslint-disable-next-line no-param-reassign
          target[key] = this.copyPropertiesNotEmpty(source[key], target[key])
        }
      }
    } else {
      // eslint-disable-next-line no-param-reassign
      target = source
    }
    return target
  },
  deepClone(data: any): any {
    const type = Object.prototype.toString.call(data)
    let obj
    // 数组的话遍历拷贝
    if (type === '[object Array]') {
      obj = []
      for (let i = 0, len = data.length; i < len; i += 1) {
        obj.push(this.deepClone(data[i]))
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
          obj[key] = this.deepClone(data[key])
        }
      }
    }
    // 其他类型直接返回
    else {
      // 不再具有下一层次
      return data
    }
    return obj
  },
  // Defining patterns
  dateFormat(date: Date, format = 'yyyy-MM-dd hh:mm:ss') {
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
}

export default beanUtil
