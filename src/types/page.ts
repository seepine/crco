export interface PageRes {
  /**
   * 列内容
   */
  current: number
  size: number
  total: number
  records: Array<any>
}
export interface PageCallback {
  (res?: PageRes): void
}
