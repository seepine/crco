import { RequestOption } from '@arco-design/web-vue/es/upload/interfaces'
import axios from 'axios'
import beanUtil from './bean-util'
import { filterProps } from './filter'
import { getHttp } from './http'
import { isArray, isNull, isObject, isString, isUndefined } from './is'
import { deepClone } from './util'

export const customRequest = (option: RequestOption) => {
  const { onProgress, onError, onSuccess, fileItem } = option
  if (isUndefined(fileItem.file)) {
    onError('not find file')
    return {}
  }
  const forms = new FormData()
  forms.append('file', fileItem.file)
  let cancel = () => {}
  if (!option.action) {
    return {
      abort() {
        cancel()
      }
    }
  }
  getHttp()
    .post(option.action, forms, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        onProgress(progressEvent.loaded / progressEvent.total, progressEvent)
      },
      cancelToken: new axios.CancelToken((c: any) => {
        cancel = c
      })
    })
    .then((res: any) => {
      onSuccess(res)
    })
    .catch((err: any) => {
      onError(err)
    })
  return {
    abort() {
      cancel()
    }
  }
}

export const initDicData = async (option: any): Promise<Array<any>> => {
  let dicData = deepClone(option.dicData)
  const dicProps = filterProps(option.props)
  if (option.dicUrl) {
    try {
      const http = getHttp()
      if (isUndefined(option.params)) {
        dicData = await http.get(option.dicUrl)
      } else {
        dicData = await http.get(option.dicUrl, { params: option.params })
      }
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
        data: item,
        // 兼容旧写法，下个大版本去除
        ...item
      }
    }
    return {
      value: item,
      label: item,
      data: item
    }
  })
}
const findValueByProps = (val: any, dicData: Array<any>, props: any) => {
  const findAll: Array<any> = []
  for (let i = 0; i < dicData.length; i += 1) {
    const item = dicData[i]

    if (isString(item) && i.toString() === val.toString()) {
      findAll.push(item)
    } else if (isArray(val) && val.indexOf(item[props.value]) >= 0) {
      findAll.push(item)
    } else if (item[props.value] === val) {
      findAll.push(item)
    }
  }
  if (findAll.length > 0) {
    let labels = ''
    findAll.forEach((item) => {
      if (isString(item)) {
        labels += `,${item}`
      } else {
        labels += `,${item[props.label]}`
      }
    })
    return labels.substring(1)
  }
  return String(val)
}
const filterRangeValue = (item: any, val: any): string => {
  if (!val) {
    return ''
  }
  let tempVal
  if (Object.prototype.toString.call(val) === '[object String]') {
    try {
      tempVal = JSON.parse(val)
      // eslint-disable-next-line no-empty
    } catch (error) {}
  } else {
    tempVal = beanUtil.deepClone(val)
  }
  if (Object.prototype.toString.call(tempVal) === '[object Array]') {
    return `${tempVal[0]}至${tempVal[1]}`
  }
  return tempVal
}
export const filterValue = (record: any, column: any): string => {
  const val = record[column.prop]
  if (isUndefined(val) || isNull(val)) {
    return ''
  }
  if (isUndefined(column.type)) {
    return val.toString()
  }
  // 处理范围
  if (column.type.indexOf('range') > 0) {
    return filterRangeValue(column, val)
  }
  // 处理tag
  if (column.type.indexOf('tag') === 0 && val) {
    return val.toString()
  }
  // 没有字典的话直接返回
  if (!column.dicData) {
    return val.toString()
  }
  // 有字典的话，进行处理
  const props = {
    // 字典的prop修改
    label: 'label',
    value: 'value',
    children: 'children',
    data: 'data'
  }
  beanUtil.copyPropertiesNotEmpty(column.props, props)
  // 及联选择
  if (val && column.type === 'cascader') {
    let dicData = JSON.parse(JSON.stringify(column.dicData))
    let label = ''
    for (let i = 0; i < val.length; i += 1) {
      const find = dicData.find((item: any) => item[props.value] === val[i])
      if (find) {
        dicData = find[props.children]
        label += `,${find[props.label]}`
      }
    }
    return label === '' ? '' : label.substring(1)
  }
  return findValueByProps(val, column.dicData, props)
}
