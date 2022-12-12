import { isArray, isObject, isString } from './is'
import { runCallback } from './util'
import { request } from './http'

/**
 * 解析dicData和dicUrl
 *
 * @param option
 * @returns
 */
export const runDicData = async (column: any): Promise<any[]> => {
  let dicData
  try {
    dicData = await runCallback(column.dicData, column)
    // eslint-disable-next-line no-empty
  } catch (e) {}
  if (!isArray(dicData) && isString(column.dicUrl)) {
    try {
      dicData = await request({
        type: 'dic',
        url: column.dicUrl,
        params: column.params
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('init dicData error:', error)
      return []
    }
  }
  if (!isArray(dicData)) {
    return []
  }
  // 如果
  return dicData.map((item) => {
    if (isObject(item)) {
      return item
    }
    return {
      value: item,
      label: item
    }
  })
}
