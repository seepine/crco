import type { CrcoOptions } from '../types'

const COMPONENT_PREFIX = 'C'

export const getComponentPrefix = (options?: CrcoOptions) => {
  return options?.componentPrefix ?? COMPONENT_PREFIX
}
