import { isBlank, isFunction, isObject, isString, isUndefined } from './is'

export const filterBtnDisplay = (
  type: string,
  option: any,
  permissions: any,
  record: any
): boolean => {
  const key = `${type}Btn`
  if (permissions[key] === false) {
    return false
  }
  if (option[key] === false) {
    return false
  }
  if (isFunction(option[key])) {
    return option[key](record)
  }
  if (isObject(option[key])) {
    if (option[key].display === false) {
      return false
    }
    if (isFunction(option[key].display)) {
      return option[key].display(record)
    }
  }
  return true
}

export const filterDisplay = (type: string, column: any, record: any): boolean => {
  if (type === 'search') {
    return column.search === true
  }
  const key = isBlank(type) ? 'display' : `${type}Display`
  if (isFunction(column[key])) {
    return column[key](record)
  }
  return column[key] !== false
}

export const filterDisabled = (column: any, record: any): boolean => {
  // const key = isBlank(type) ? 'disabled' : `${type}Disabled`
  const key = 'disabled'
  if (isFunction(column[key])) {
    return column[key](record)
  }
  return column[key] === true
}

const getRules = (field: string, column: any, record: any) => {
  if (isFunction(column[field])) {
    return column[field](record)
  }
  if (!isUndefined(column[field])) {
    return column[field]
  }
  return undefined
}
export const filterRules = (type: string, column: any, record: any) => {
  const key = isBlank(type) ? 'rules' : `${type}Rules`
  const rules = getRules(key, column, record)
  if (isUndefined(rules) && type !== 'search') {
    return getRules('rules', column, record)
  }
  return rules
}

const getSpan = (spanValue: any, record: any) => {
  if (isFunction(spanValue)) {
    return spanValue(record)
  }
  return spanValue
}
export const filterSpan = (
  column: any, // {name:'',prop:'',span:..}
  option: any, // {span:.. ,columns:[...]}
  record: any,
  size: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs',
  defaultSpan: number,
  spanKey: string = 'span'
) => {
  // ??????column???span?????????
  const span = getSpan(column[spanKey], record)
  if (!isUndefined(span)) {
    // ??????????????????????????????
    if (!isObject(span)) {
      return span
    }
    // ????????????????????????
    // :xl="{ span: filterSpan('xl') }"
    // :lg="{ span: 12 }"
    // :md="{ span: 12 }"
    // :sm="{ span: 24 }"
    // :xs="{ span: 24 }"
    const sizeSpan = getSpan(span[size], record)
    if (!isUndefined(sizeSpan)) {
      return sizeSpan
    }
  }
  // ?????????span???
  const rootSpan = getSpan(option[spanKey], record)
  if (!isUndefined(rootSpan)) {
    // ??????????????????????????????
    if (!isObject(rootSpan)) {
      return rootSpan
    }
    // ????????????????????????
    // :xl="{ span: filterSpan('xl') }"
    // :lg="{ span: 12 }"
    // :md="{ span: 12 }"
    // :sm="{ span: 24 }"
    // :xs="{ span: 24 }"
    const sizeSpan = getSpan(rootSpan[size], record)
    if (!isUndefined(sizeSpan)) {
      return sizeSpan
    }
  }
  return defaultSpan
}

export const filterProps = (props: any): { value: string; label: string } => {
  return {
    value: isObject(props) && isString(props.value) ? props.value : 'value',
    label: isObject(props) && isString(props.label) ? props.label : 'label'
  }
}

export const filterCellStyle = (column: any) => {
  const style: any = {
    whiteSpace: column.nowrap === false ? 'unset' : 'nowrap'
  }
  if (column.minWidth) {
    style.minWidth = `${column.minWidth}px`
  }
  if (!column.ellipsis) {
    style.maxWidth = `300px`
    style.textOverflow = 'ellipsis'
    style.overflowX = 'hidden'
  }
  if (column.maxWidth) {
    style.maxWidth = `${column.maxWidth}px`
  }
  return {
    ...style,
    ...column.cellStyle
  }
}
