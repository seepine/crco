import { TriggerProps } from '@arco-design/web-vue'

export type TimePickerType = {
  /**
   * @zh 日期选择器
   */
  type: 'time'
  /**
   * @zh 选择器模式，'time-range'为范围选择
   */
  mode?: 'time-range'
  /**
   * @zh 是否允许清除
   * @en Whether to allow clear
   * @defaultValue true
   */
  allowClear?: boolean
  /**
   * @zh 展示日期的格式，参考[字符串解析格式](#字符串解析格式)
   * @en Display the format of the date, refer to [String Parsing Format](#String Parsing Format)
   * @defaultValue 'HH:mm:ss'
   */
  format?: string
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for pop-up box
   */
  popupContainer?: string | HTMLElement
  /**
   * @zh 12 小时制
   * @en 12 hour clock
   */
  use12Hours?: boolean
  /**
   * @zh 设置 时 / 分 / 秒 的选择间隔
   * @en Set the hour/minute/second selection interval
   */
  step?: {
    hour?: number
    minute?: number
    second?: number
  }
  /**
   * @zh 禁用的部分小时选项
   * @en Disabled partial hour options
   */
  disabledHours?: () => number[]
  /**
   * @zh 禁用的部分分钟选项
   * @en Disabled some minutes options
   */
  disabledMinutes?: (selectedHour?: number) => number[]
  /**
   * @zh 禁用的部分秒数选项
   * @en Disabled partial seconds option
   */
  disabledSeconds?: (selectedHour?: number, selectedMinute?: number) => number[]
  /**
   * @zh 隐藏禁止选择的选项
   * @en Hide prohibited options
   */
  hideDisabledOptions?: boolean
  /**
   * @zh 禁用确认步骤，开启后直接点选时间不需要点击确认按钮
   * @en Disable the confirmation step, click the time directly after opening, without clicking the confirmation button
   *  @defaultValue false
   */
  disableConfirm?: boolean
  /**
   * @zh 弹出的位置
   * @en Pop-up position
   * @defaultValue 'bl'
   */
  position?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br'
  /**
   * @zh 可以传入 `Trigger` 组件的参数
   * @en You can pass in the parameters of the `Trigger` component
   */
  triggerProps?: TriggerProps
  /**
   * @zh 是否在关闭后销毁 dom 结构
   * @en Whether to destroy the dom structure after closing
   */
  unmountOnClose?: boolean
}
