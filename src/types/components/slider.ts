export type SliderType = {
  type: 'slider'
  /**
   * @zh 滑动的步长
   * @en Sliding step
   * @defaultValue 1
   */
  step?: number
  /**
   * @zh 滑动范围的最小值
   * @en Minimum sliding range
   * @defaultValue 0
   */
  min?: number
  /**
   * @zh 滑动范围的最大值
   * @en Maximum sliding range
   * @defaultValue 100
   */
  max?: number
  /**
   * @zh 设置显示的标签
   * @en Set the displayed label
   */
  marks?: Record<number, string>
  /**
   * @zh 是否显示刻度线
   * @en Whether to show ticks
   * @defaultValue false
   */
  showTicks?: boolean
  /**
   * @zh 是否显示输入框
   * @en Whether to show the input
   * @defaultValue false
   */
  showInput?: boolean
  /**
   * @zh 是否显示tooltip
   * @en Whether to show tooltip
   * @version 2.42.0
   * @defaultValue true
   */
  showTooltip?: boolean
  /**
   * @zh tooltip提示文字
   * @en the text of tooltip
   * @version 2.42.0
   * @defaultValue true
   */
  formatTooltip?: Function
}
