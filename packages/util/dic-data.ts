import { filterProps } from './filter'
import { isArray, isObject, isUndefined } from './is'
import { deepClone } from './util'
import { getHttp } from './http'

export type DicItem = {
  value: any
  label: string
  data: any
}

export type DicData = Array<DicItem>

export const initDicData = async (option: any): Promise<DicData> => {
  let dicData = deepClone(option.dicData)
  const dicProps = filterProps(option.props)
  if (option.dicUrl) {
    try {
      const http = getHttp()
      if (isUndefined(option.params)) {
        return await http.get(option.dicUrl)
      }
      dicData = await http.post(option.dicUrl, option.params)
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
