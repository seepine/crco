const opt = Object.prototype.toString

export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]'
}

export function isNull(obj: any): obj is null {
  return opt.call(obj) === '[object Null]'
}

export function isBoolean(obj: unknown): obj is boolean {
  return opt.call(obj) === '[object Boolean]'
}

export function isObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === '[object Object]'
}

export function isString(obj: any): obj is string {
  return opt.call(obj) === '[object String]'
}

export function isNumber(obj: any): obj is number {
  return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}

export function isRegExp(obj: any) {
  return opt.call(obj) === '[object RegExp]'
}

export function isDate(obj: any) {
  return opt.call(obj) === '[object Date]'
}

function isHex(color: any) {
  return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color)
}

function isRgb(color: any) {
  return /^rgb\((\s*\d+\s*,?){3}\)$/.test(color)
}

function isRgba(color: any) {
  return /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(color)
}

export function isColor(color: any): boolean {
  return isHex(color) || isRgb(color) || isRgba(color)
}

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined
}

export function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === 'function'
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0
}

export function isBlank(obj?: string): boolean {
  return !isString(obj) || obj === ''
}

export function isNotBlank(obj?: string): boolean {
  return isString(obj) && obj !== ''
}

export function isExist(obj: any): boolean {
  return obj || obj === 0
}

export function isPromise(obj: any): boolean {
  return opt.call(obj) === '[object Promise]'
}

export function isImage(file: any): boolean {
  let url
  if (isString(file)) {
    url = file
  } else if (isObject(file)) {
    if (file.type && file.type.indexOf('image/') === 0) {
      return true
    }
    url = file.url
  } else {
    return false
  }
  if (!url) return false
  if (url.toLowerCase().indexOf('jpg') > 0) {
    return true
  }
  if (url.toLowerCase().indexOf('png') > 0) {
    return true
  }
  if (url.toLowerCase().indexOf('jpeg') > 0) {
    return true
  }
  if (url.toLowerCase().indexOf('bmp') > 0) {
    return true
  }
  if (url.toLowerCase().indexOf('webp') > 0) {
    return true
  }
  if (url.toLowerCase().indexOf('gif') > 0) {
    return true
  }
  return false
}
