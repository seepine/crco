import { isBlank, isFunction, isNumber, isObject, isString, isUndefined } from './is'

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

const getSpan = (field: string, column: any, record: any) => {
  if (isFunction(column[field])) {
    return column[field](record)
  }
  if (isNumber(column[field])) {
    return column[field]
  }
  return column[field]
}
export const filterSpan = (
  column: any,
  option: any,
  record: any,
  size: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs',
  defaultSpan: number
) => {
  const key = 'span'
  // key = span or addSpan or editSpan
  const span = getSpan(key, column, record)
  if (!isUndefined(span)) {
    // 非对象，可以直接返回
    if (!isObject(span)) {
      return span
    }
    // 是对象，继续解析
    // :xl="{ span: filterSpan('xl') }"
    // :lg="{ span: 12 }"
    // :md="{ span: 12 }"
    // :sm="{ span: 24 }"
    // :xs="{ span: 24 }"
    const sizeSpan = getSpan(size, span, record)
    if (!isUndefined(sizeSpan)) {
      return sizeSpan
    }
  }
  const rootSpan = getSpan(key, option, record)
  if (!isUndefined(rootSpan)) {
    // 非对象，可以直接返回
    if (!isObject(rootSpan)) {
      return rootSpan
    }
    // 是对象，继续解析
    // :xl="{ span: filterSpan('xl') }"
    // :lg="{ span: 12 }"
    // :md="{ span: 12 }"
    // :sm="{ span: 24 }"
    // :xs="{ span: 24 }"
    const sizeSpan = getSpan(size, rootSpan, record)
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
