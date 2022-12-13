import { RequestOption } from '@arco-design/web-vue/es/upload/interfaces'
import axios from 'axios'
import { getHttp } from './http'
import { isArray, isBoolean, isNull, isString, isUndefined } from './is'
import { copyPropertiesNotEmpty, deepClone } from './util'

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
    tempVal = deepClone(val)
  }
  if (Object.prototype.toString.call(tempVal) === '[object Array]') {
    return `${tempVal[0]}至${tempVal[1]}`
  }
  return tempVal
}
export const filterValue = (record: any, column: any): string => {
  if (isUndefined(record) || isNull(record)) {
    return ''
  }
  const val = record[column.prop]
  if (isUndefined(val) || isNull(val)) {
    return ''
  }
  if (isBoolean(val)) {
    return val ? '是' : '否'
  }
  if (isUndefined(column.type)) {
    return val.toString()
  }
  if (isString(column.type)) {
    // 处理范围
    if (column.type.indexOf('range') > 0) {
      return filterRangeValue(column, val)
    }
    // 处理tag
    if (column.type.indexOf('tag') === 0 && val) {
      return val.toString()
    }
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
    children: 'children'
  }

  copyPropertiesNotEmpty(column.props, props)
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
