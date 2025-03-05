import type { CrcoOptions } from '../types'
import { copyPropertiesNotEmpty } from './util'

const COMPONENT_PREFIX = 'C'

export const getComponentPrefix = (options?: CrcoOptions) => {
  return options?.componentPrefix ?? COMPONENT_PREFIX
}

const globalCrcoOption = {
  form: {
    resetBtn: true,
    autoLabelWidth: true,
    span: {
      xxl: 8,
      xl: 8,
      lg: 8,
      md: 12,
      sm: 12,
      xs: 24
    },
    gutter: {
      xxl: 32,
      xl: 24,
      lg: 16,
      md: 12,
      sm: 12,
      xs: 8
    }
  },
  table: {
    searchOption: {
      resetBtn: {
        display: false,
        layout: 'horizontal'
      }
    }
  }
}
type CrcoOpt = typeof globalCrcoOption

export const getOption = (): CrcoOpt => {
  return globalCrcoOption
}

export const setOption = (options?: CrcoOptions) => {
  copyPropertiesNotEmpty(options || {}, globalCrcoOption)
}
