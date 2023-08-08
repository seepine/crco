export type RateType = {
  /**
   * 复选框
   * @href <a href="https://arco.design/vue/component/cherateckbox">ArcoRate</a>
   */
  type: 'rate'
  /**
   * @zh 评分的总数
   * @en Total number of rate
   * @defaultValue 5
   */
  count?: number
  /**
   * @zh 是否允许半选
   * @en Whether to allow half selection
   * @defaultValue false
   */
  allowHalf?: boolean
  /**
   * @zh 是否允许清空输入框
   * @en Whether to allow the input to be cleared
   * @defaultValue false
   */
  allowClear?: boolean
  /**
   * @zh 是否开启笑脸分级
   * @en Whether to enable smile grading
   * @defaultValue false
   */
  grading?: boolean
  /**
   * @zh 是否为只读状态
   * @en Whether it is readonly
   * @defaultValue false
   */
  readonly?: boolean
  /**
   * @zh 颜色
   * @en Color
   * @version 2.18.0
   */
  color?: string | Record<string, string>
}
