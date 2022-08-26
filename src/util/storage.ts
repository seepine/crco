const keyName = 'crco-store-'
/**
 * 存储localStorage
 */
export const setStore = (key: string, value: any, isSession = false) => {
  const cacheName = keyName + key
  const obj = {
    dataType: typeof value,
    content: value,
    isSession,
    datetime: new Date().getTime()
  }
  if (isSession) {
    window.sessionStorage.setItem(cacheName, JSON.stringify(obj))
  } else {
    window.localStorage.setItem(cacheName, JSON.stringify(obj))
  }
}
/**
 * 获取localStorage
 */

export const getStore = (key: string, isSession = false) => {
  const cacheName = keyName + key
  let obj
  let content
  if (isSession) {
    obj = window.sessionStorage.getItem(cacheName)
  } else {
    obj = window.localStorage.getItem(cacheName)
  }
  if (!obj) return null
  try {
    obj = JSON.parse(obj)
  } catch (e) {
    return obj
  }
  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    content = JSON.parse(obj.content)
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return content
}
/**
 * 删除localStorage
 */
export const removeStore = (key: string, isSession = false) => {
  const cacheName = keyName + key
  if (isSession) {
    window.sessionStorage.removeItem(cacheName)
  } else {
    window.localStorage.removeItem(cacheName)
  }
}
