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
    showAddContinue: false,
    searchOption: {
      resetBtn: {
        display: false,
        layout: 'horizontal'
      },
      span: {
        xxl: 6,
        xl: 6,
        lg: 6,
        md: 6,
        sm: 8,
        xs: 24
      },
      gutter: {
        xxl: 16,
        xl: 16,
        lg: 16,
        md: 16,
        sm: 16,
        xs: 16
      }
    }
  },
  listForm: {
    showAddContinue: false
  }
}
type CrcoOpt = typeof globalCrcoOption

export const getOption = (): CrcoOpt => {
  return globalCrcoOption
}

export const setOption = (options?: CrcoOptions) => {
  copyPropertiesNotEmpty(options || {}, globalCrcoOption)
}
