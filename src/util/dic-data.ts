import { filterProps } from './filter'
import { isArray, isObject, isUndefined } from './is'
import { deepClone } from './util'
import { request } from './http'
import { DicItem } from '../types/column'

export const initDicData = async (option: any): Promise<Array<DicItem>> => {
  let dicData = deepClone(option.dicData)
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
