import {
  FilterOption,
  SelectOptionData,
  SelectOptionGroup,
  TriggerProps
} from '@arco-design/web-vue'

export type AutoCompleteType = {
  type: 'autoComplete'
  /**
   * @zh 用于自动提示的数据
   * @en Data used for auto-complete
   */
  data?: (string | number | SelectOptionData | SelectOptionGroup)[]
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for popup
   */
  popupContainer?: string | HTMLElement | null | undefined
  /**
   * @zh 是否为严格校验模式
   * @en Whether it is strict verification mode
   * @defaultValue false
   */
  strict?: boolean
  /**
   * @zh 自定义选项过滤方法
   * @en Custom option filtering method
   * @defaultValue true
   */
  filterOption?: FilterOption
  /**
   * @zh trigger 组件属性
   * @en trigger props
   * @version 2.14.0
   */
  triggerProps?: TriggerProps
  /**
   * @zh 是否允许清空输入框
   * @en Whether to allow the input to be cleared
   * @version 2.23.0
   * @defaultValue false
   */
  allowClear?: boolean
}
