import type { CrcoOptions } from './types'

const COMPONENT_PREFIX = 'C'

// eslint-disable-next-line import/prefer-default-export
export const getComponentPrefix = (options?: CrcoOptions) => {
  return options?.componentPrefix ?? COMPONENT_PREFIX
}
