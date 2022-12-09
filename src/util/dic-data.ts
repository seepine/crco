import { filterProps } from './filter'
import { isArray, isObject, isString, isUndefined } from './is'
import { runCallback } from './util'
import { request } from './http'
import { DicItem } from '../types/column'

export const initDicData = async (option: any): Promise<Array<DicItem>> => {
  let dicData
  try {
    dicData = await runCallback(option.dicData, option)
    // eslint-disable-next-line no-empty
  } catch (e) {}
  if (!isUndefined(dicData)) {
    return dicData
  }
  const dicProps = filterProps(option.props)
  if (!isUndefined(option.dicUrl)) {
    try {
      dicData = await request({
        type: 'dic',
        url: option.dicUrl,
        params: option.params
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('init dicData error:', error)
      return []
    }
  }
  if (!isArray(dicData) || dicData.length <= 0) {
    return []
  }
  return dicData.map((item) => {
    if (isObject(item)) {
      if (
        Object.prototype.hasOwnProperty.call(item, 'value') &&
        Object.prototype.hasOwnProperty.call(item, 'label')
      ) {
        return item as DicItem
      }
      return {
        value: item[dicProps.value],
        label: item[dicProps.label],
        data: item
      }
    }
    return {
      value: item,
      label: item,
      data: item
    }
  })
}
/**
 * 解析dicData和dicUrl
 *
 * @param option
 * @returns
 */
export const runDicData = async (option: any): Promise<any[]> => {
  let dicData
  try {
    dicData = await runCallback(option.dicData, option)
    // eslint-disable-next-line no-empty
  } catch (e) {}
  if (isArray(dicData)) {
    return dicData
  }
  if (isString(option.dicUrl)) {
    try {
      dicData = await request({
        type: 'dic',
        url: option.dicUrl,
        params: option.params
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('init dicData error:', error)
      return []
    }
  }
  if (isArray(dicData)) {
    return dicData
  }
  return []
}
