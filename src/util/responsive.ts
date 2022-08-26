import { ResponsiveValue } from '../types'
import { isNumber, isString, isUndefined } from './is'

export const analyzeResponsiveValue = (
  span: ResponsiveValue | undefined,
  width: number
): number | undefined => {
  if (isUndefined(span)) {
    return undefined
  }
  if (isNumber(span)) {
    return span
  }
  if (isString(span)) {
    return parseInt(span, 10)
  }
  if (width < 576) {
    return span.xs || span.sm || span.md || span.lg || span.xl || span.xxl
  }
  if (width >= 576 && width < 768) {
    return span.sm || span.md || span.lg || span.xl || span.xxl || span.xs
  }
  if (width >= 768 && width < 992) {
    return span.md || span.lg || span.xl || span.xxl || span.sm || span.xs
  }
  if (width >= 992 && width < 1200) {
    return span.lg || span.xl || span.xxl || span.md || span.sm || span.xs
  }
  if (width >= 1200 && width < 1600) {
    return span.xl || span.xxl || span.lg || span.md || span.sm || span.xs
  }
  // >=1600
  return span.xxl || span.xl || span.lg || span.md || span.sm || span.xs
}
