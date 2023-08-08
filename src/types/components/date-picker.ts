import { ShortcutType, Size, TriggerProps } from '@arco-design/web-vue'
import {
  DisabledTimeProps,
  FormatFunc,
  WeekStart
} from '@arco-design/web-vue/es/date-picker/interface'
import { TimePickerProps } from '@arco-design/web-vue/es/time-picker/interface'

export type DatePickerCommonProps = {
  /**
   * @zh 国际化配置，用于覆盖locale中的 `datePicker` 字段
   * @en Internationalization configuration, used to cover the locale file in the `datePicker` field
   */
  locale?: Record<string, any>
  /**
   * @zh 没有触发元素，只显示选择面板
   * @en There is no trigger element, only the selection panel is displayed
   * */
  hideTrigger?: boolean
  /**
   * @zh 是否允许清除
   * @en Whether to allow clear
   * @defaultValue true
   * */
  allowClear?: boolean
  /**
   * @zh 是否为只读
   * @en Whether it is read-only
   * */
  readonly?: boolean
  /**
   * @zh 是否为错误状态
   * @en Whether it is an error state
   */
  error?: boolean
  /**
   * @zh 日期选择器的尺寸
   * @en The size of the date picker
   * @values 'mini','small','medium','large'
   * @defaultValue 'medium'
   */
  size?: Size
  /**
   * @zh 预设时间范围快捷选择
   * @en Quick selection of preset time range
   */
  shortcuts?: ShortcutType[]
  /**
   * @zh 预设范围在面板上的位置，默认放在下方，侧边一般用于大量预设时间的场景
   * @en The position of the preset range on the panel, which is placed at the bottom by default, and the side is generally used for scenes with a large number of preset times
   * @defaultValue 'bottom'
   */
  shortcutsPosition?: 'left' | 'bottom' | 'right'
  /**
   * @zh 弹出的框的位置
   * @en The position of the pop-up box
   * @defaultValue 'bl'
   */
  position?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br'
  /**
   * @zh 默认弹出框是打开或者关闭
   * @en The default pop-up box is open or closed
   * @defaultValue false
   */
  defaultPopupVisible?: boolean
  /**
   * @zh 可以传入 `Trigger` 组件的参数
   * @en You can pass in the parameters of the `Trigger` component
   */
  triggerProps?: TriggerProps
  /**
   * @zh 是否在隐藏的时候销毁DOM结构
   * @en Whether to destroy the DOM structure when hiding
   */
  unmountOnClose?: boolean
  /**
   * @zh 提示文案
   * @en Prompt copy
   */
  placeholder?: string
  /**
   * @zh 不可选取的日期
   * @en Unselectable date
   */
  disabledDate?: (current?: Date) => boolean
  /**
   * @zh 不可选取的时间
   * @en Unselectable time
   */
  disabledTime?: (current: Date) => DisabledTimeProps
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for pop-up box
   */
  popupContainer?: string | HTMLElement | null | undefined
  /**
   * @zh 展示日期的格式，参考字符串解析格式(https://arco.design/vue/component/date-picker#%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A7%A3%E6%9E%90%E6%A0%BC%E5%BC%8F)
   * @en Mount container for pop-up box
   */
  format?: string | FormatFunc
  /**
   * @zh 值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。如果没有指定，将格式化为字符串，格式同 `format`。
   * @en The format of the value, valid for `value` `defaultValue` `pickerValue` `defaultPickerValue` and the return value in the event, supports setting as timestamp, Date and string (refer to [String parsing format](#string-parsing-format) ). If not specified, it will be formatted as a string, in the same format as `format`.
   * @version 2.16.0
   */
  valueFormat?: 'timestamp' | 'Date' | string
  /**
   * @zh 是否要预览快捷选择的结果
   * @en Whether to preview the result of the shortcut
   * @version 2.28.0
   * @defaultValue true
   */
  previewShortcut?: boolean
  /**
   * @zh 是否显示确认按钮，`showTime = true` 的时候始终显示。
   * @en Whether to show the confirm button, always show when `showTime = true`.
   * @version 2.29.0
   */
  showConfirmBtn?: boolean
  /**
   * @zh 是否展示时间
   */
  showTime?: boolean
  /**
   * @zh 时间选择器属性
   */
  timePickerProps?: Partial<TimePickerProps>
  /**
   * @zh 是否显示 `showTime` 时，选择当前时间的按钮
   * @en Whether to display `showTime`, select the button of the current time
   */
  showNowBtn?: boolean
  /**
   * @zh 周开始日期
   * @defaultValue 0
   */
  dayStartOfWeek?: WeekStart
  /**
   * @zh 默认值
   */
  defaultValue?: Date | string | number
  /**
   * @zh 是否禁止键盘输入日期
   * @en Whether input is disabled with the keyboard.
   * @version 2.43.0
   * @defaultValue false
   */
  disabledInput?: boolean
  /**
   * @zh 是否启用缩写
   * @en Whether to enable abbreviation
   * @version 2.45.0
   * @defaultValue true
   */
  abbreviation?: boolean
}

export type DatePickerType = DatePickerCommonProps & {
  /**
   * @zh 日期选择器
   */
  type: 'date' | 'datetime'
}

export type MonthPickerType = DatePickerCommonProps & {
  /**
   * @zh 月份选择器
   */
  type: 'month'
  /**
   * @zh 展示日期的格式，参考字符串解析格式(https://arco.design/vue/component/date-picker#%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A7%A3%E6%9E%90%E6%A0%BC%E5%BC%8F)   * @en Display the format of the date, refer to [String Parsing Format](#String Parsing Format)
   * @defaultValue 'YYYY-MM'
   */
  format?: string
}

export type QuarterPickerType = DatePickerCommonProps & {
  /**
   * @zh 季度选择器
   */
  type: 'month'
  /**
   * @zh 展示日期的格式，参考字符串解析格式(https://arco.design/vue/component/date-picker#%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A7%A3%E6%9E%90%E6%A0%BC%E5%BC%8F)   * @en Display the format of the date, refer to [String Parsing Format](#String Parsing Format)
   * @defaultValue 'YYYY-[Q]Q'
   */
  format?: string
  /**
   * @zh 值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。
   * @en The format of the value, valid for `value` `defaultValue` `pickerValue` `defaultPickerValue` and the return value in the event, supports setting as timestamp, Date and string (refer to [String parsing format](#string-parsing-format) ).
   * @version 2.16.0
   * @defaultValue 'YYYY-MM'
   */
  valueFormat?: string
}

export type WeekPickerType = DatePickerCommonProps & {
  /**
   * @zh 周选择器
   */
  type: 'week'
  /**
   * @zh 展示日期的格式，参考字符串解析格式(https://arco.design/vue/component/date-picker#%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A7%A3%E6%9E%90%E6%A0%BC%E5%BC%8F)   * @en Display the format of the date, refer to [String Parsing Format](#String Parsing Format)
   * @defaultValue 'gggg-wo'
   */
  format?: string
  /**
   * @zh 值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。
   * @en The format of the value, valid for `value` `defaultValue` `pickerValue` `defaultPickerValue` and the return value in the event, supports setting as timestamp, Date and string (refer to [String parsing format](#string-parsing-format) ).
   * @version 2.16.0
   * @defaultValue 'YYYY-MM-DD'
   */
  valueFormat?: string
}

export type YearPickerType = DatePickerCommonProps & {
  /**
   * @zh 周选择器
   */
  type: 'year'
  /**
   * @zh 展示日期的格式，参考字符串解析格式(https://arco.design/vue/component/date-picker#%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A7%A3%E6%9E%90%E6%A0%BC%E5%BC%8F)   * @en Display the format of the date, refer to [String Parsing Format](#String Parsing Format)
   * @defaultValue 'YYYY'
   */
  format?: string
}

export type RangePickerType = {
  /**
   * 范围选择器，通过mode指定类型，mode默认'date'
   */
  type: 'range'
  /**
   * @zh 范围选择器的类型
   * @en Type of range selector
   * @defaultValue 'date'
   */
  mode?: 'date' | 'year' | 'quarter' | 'month' | 'week'
  /**
   * @zh 默认值
   * @en Default value
   */
  defaultValue?: (Date | string | number)[]
  /**
   * @zh 默认面板显示的日期
   * @en The date displayed in the default panel
   * */
  pickerValue?: (Date | string | number)[]
  /**
   * @zh 面板显示的日期
   * @en Date displayed on the panel
   * */
  defaultPickerValue?: (Date | string | number)[]
  /**
   * @zh 每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。
   * @en The first day of the week starts on the day of the week, 0-Sunday, 1-Monday, and so on.
   * @type 0 | 1 | 2 | 3 | 4 | 5 | 6
   * @version 2-6 from 2.21.0
   * @defaultValue 0
   */
  dayStartOfWeek?: number
  /**
   * @zh 展示日期的格式，参考[字符串解析格式](#字符串解析格式)
   * @en Display the format of the date, refer to [String Parsing Format](#string-parsing-format)
   */
  format?: string
  /**
   * @zh 值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。如果没有指定，将格式化为字符串，格式同 `format`。
   * @en The format of the value, valid for `value` `defaultValue` `pickerValue` `defaultPickerValue` and the return value in the event, supports setting as timestamp, Date and string (refer to [String parsing format](#string-parsing-format) ). If not specified, it will be formatted as a string, in the same format as `format`.
   * @version 2.16.0
   */
  valueFormat?: 'timestamp' | 'Date' | string
  /**
   * @zh 是否增加时间选择
   * @en Whether to increase time selection
   * */
  showTime?: boolean
  /**
   * @zh 时间显示的参数，参考 [TimePickerProps](/vue/component/time-picker)
   * @en Time display parameters, refer to [TimePickerProps](/vue/component/time-picker)
   */
  timePickerProps?: Partial<TimePickerProps>
  /**
   * @zh 不可选的日期
   * @en Non-selectable date
   */
  disabledDate?: (current: Date, type: 'start' | 'end') => boolean
  /**
   * @zh 不可选取的时间
   * @en Unselectable time
   */
  disabledTime?: (current: Date, type: 'start' | 'end') => DisabledTimeProps
  /**
   * @zh 范围选择器输入框内的分割符号
   * @en The segmentation symbol in the input box of the range selector
   */
  separator?: string
  /**
   * @zh 时间是否会交换，默认情况下时间会影响和参与开始和结束值的排序，如果要固定时间顺序，可将其关闭。
   * @en Whether the time will be exchanged, by default time will affect and participate in the ordering of start and end values, if you want to fix the time order, you can turn it off.
   * @version 2.25.0
   * @defaultValue true
   */
  exchangeTime?: boolean

  popupContainer?: string | HTMLElement | null | undefined
  /**
   * @zh 国际化配置，用于覆盖locale中的 `datePicker` 字段
   * @en Internationalization configuration, used to cover the locale file in the `datePicker` field
   */
  locale?: Record<string, any>
  /**
   * @zh 没有触发元素，只显示选择面板
   * @en There is no trigger element, only the selection panel is displayed
   * */
  hideTrigger?: boolean
  /**
   * @zh 是否允许清除
   * @en Whether to allow clear
   * @defaultValue true
   * */
  allowClear?: boolean
  /**
   * @zh 是否为只读
   * @en Whether it is read-only
   * */
  readonly?: boolean
  /**
   * @zh 是否为错误状态
   * @en Whether it is an error state
   */
  error?: boolean
  /**
   * @zh 日期选择器的尺寸
   * @en The size of the date picker
   * @values 'mini','small','medium','large'
   * @defaultValue 'medium'
   */
  size?: Size
  /**
   * @zh 预设时间范围快捷选择
   * @en Quick selection of preset time range
   */
  shortcuts?: ShortcutType[]
  /**
   * @zh 预设范围在面板上的位置，默认放在下方，侧边一般用于大量预设时间的场景
   * @en The position of the preset range on the panel, which is placed at the bottom by default, and the side is generally used for scenes with a large number of preset times
   * @defaultValue 'bottom'
   */
  shortcutsPosition?: 'left' | 'bottom' | 'right'
  /**
   * @zh 弹出的框的位置
   * @en The position of the pop-up box
   * @defaultValue 'bl'
   */
  position?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br'
  /**
   * @zh 默认弹出框是打开或者关闭
   * @en The default pop-up box is open or closed
   * @defaultValue false
   */
  defaultPopupVisible?: boolean
  /**
   * @zh 可以传入 `Trigger` 组件的参数
   * @en You can pass in the parameters of the `Trigger` component
   */
  triggerProps?: TriggerProps
  /**
   * @zh 是否在隐藏的时候销毁DOM结构
   * @en Whether to destroy the DOM structure when hiding
   */
  unmountOnClose?: boolean
  /**
   * @zh 提示文案
   * @en Prompt copy
   */
  placeholder?: string
  /**
   * @zh 是否要预览快捷选择的结果
   * @en Whether to preview the result of the shortcut
   * @version 2.28.0
   * @defaultValue true
   */
  previewShortcut?: boolean
  /**
   * @zh 是否显示确认按钮，`showTime = true` 的时候始终显示。
   * @en Whether to show the confirm button, always show when `showTime = true`.
   * @version 2.29.0
   */
  showConfirmBtn?: boolean
  /**
   * @zh 是否禁止键盘输入日期
   * @en Whether input is disabled with the keyboard.
   * @version 2.43.0
   * @defaultValue false
   */
  disabledInput?: boolean
  /**
   * @zh 是否启用缩写
   * @en Whether to enable abbreviation
   * @version 2.45.0
   * @defaultValue true
   */
  abbreviation?: boolean
}
