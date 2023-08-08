import {
  ScrollbarProps,
  SelectFieldNames,
  SelectOptionData,
  SelectOptionGroup,
  Size,
  TriggerProps
} from '@arco-design/web-vue'
import { VirtualListProps } from '@arco-design/web-vue/es/_components/virtual-list-v2/interface'

export type SelectType = {
  type: 'select'
  /**
   * @zh 是否开启多选模式（多选模式默认开启搜索）
   * @en Whether to open multi-select mode (The search is turned on by default in the multi-select mode)
   * @defaultValue false
   */
  multiple?: boolean
  /**
   * @zh 输入框大小
   * @en Input size
   * @values 'mini','small','medium','large'
   * @defaultValue 'medium'
   */
  size?: Size
  /**
   * @zh 提示文字
   * @en Prompt text
   */
  placeholder?: string
  /**
   * @zh 是否为错误状态
   * @en Whether it is an error state
   */
  error?: boolean
  /**
   * @zh 是否允许清空输入框
   * @en Whether to allow the input to be cleared
   * @defaultValue false
   */
  allowClear?: boolean
  /**
   * @zh 是否允许搜索
   * @en Whether to allow searching
   * @defaultValue false (single) \| true (multiple)
   */
  allowSearch?: boolean
  /**
   * @zh 是否允许创建
   * @en Whether to allow creation
   * @defaultValue false
   */
  allowCreate?: boolean
  /**
   * @zh 多选模式下，最多显示的标签数量。0 表示不限制
   * @en In multi-select mode, the maximum number of labels displayed. 0 means unlimited
   * @defaultValue 0
   */
  maxTagCount?: number
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for popup
   */
  popupContainer?: string | HTMLElement
  /**
   * @zh 是否显示输入框的边框
   * @en Whether to display the border of the input box
   * @defaultValue true
   */
  bordered?: boolean
  /**
   * @zh 是否在无值时默认选择第一个选项
   * @en Whether to select the first option by default when there is no value
   * @version 2.43.0
   * @defaultValue true
   */
  defaultActiveFirstOption?: boolean
  /**
   * @zh 弹出框默认是否可见（非受控模式）
   * @en Whether the popup is visible by default (uncontrolled mode)
   * @defaultValue false
   */
  defaultPopupVisible?: boolean
  /**
   * @zh 是否在下拉菜单关闭时销毁元素
   * @en Whether to destroy the element when the dropdown is closed
   * @defaultValue false
   */
  unmountOnClose?: boolean
  /**
   * @zh 是否过滤选项
   * @en Whether to filter options
   * @defaultValue true
   */
  filterOption?: boolean | ((inputValue: string, option: SelectOptionData) => boolean)
  /**
   * @zh 选项数据
   * @en Option data
   */
  options?: (string | number | SelectOptionData | SelectOptionGroup)[]
  /**
   * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)
   * @en Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)
   * @type VirtualListProps
   */
  virtualListProps?: VirtualListProps
  /**
   * @zh 下拉菜单的触发器属性
   * @en Trigger props of the drop-down menu
   * @type TriggerProps
   */
  triggerProps?: TriggerProps
  /**
   * @zh 格式化显示内容
   * @en Format display content
   */
  formatLabel?: (data: SelectOptionData) => string
  /**
   * @zh 自定义值中不存在的选项
   * @en Options that do not exist in custom values
   * @version 2.10.0
   * @defaultValue false, 虽然arco默认是true，但crco改为默认false
   */
  fallbackOption?:
    | boolean
    | ((value: string | number | Record<string, unknown>) => SelectOptionData)
  /**
   * @zh 是否在下拉菜单中显示额外选项
   * @en Options that do not exist in custom values
   * @version 2.10.0
   * @defaultValue true
   */
  showExtraOptions?: boolean
  /**
   * @zh 用于确定选项键值的属性名
   * @en Used to determine the option key value attribute name
   * @version 2.18.0
   * @defaultValue value
   */
  valueKey?: string
  /**
   * @zh 触发搜索事件的延迟时间
   * @en Delay time to trigger search event
   * @version 2.18.0
   * @defaultValue 500
   */
  searchDelay?: number
  /**
   * @zh 多选时最多的选择个数
   * @en Maximum number of choices in multiple choice
   * @version 2.18.0
   * @defaultValue 0
   */
  limit?: number
  /**
   * @zh 自定义 `SelectOptionData` 中的字段
   * @en Customize fields in `SelectOptionData`
   * @version 2.22.0
   */
  fieldNames?: SelectFieldNames
  /**
   * @zh 是否开启虚拟滚动条
   * @en Whether to enable virtual scroll bar
   * @version 2.38.0
   * @defaultValue true
   */
  scrollbar?: boolean | ScrollbarProps
  /**
   * @zh 空状态时是否显示header
   * @en Whether to display the header in the empty state
   * @defaultValue false
   */
  showHeaderOnEmpty?: boolean
  /**
   * @zh 空状态时是否显示footer
   * @en Whether to display the footer in the empty state
   * @defaultValue false
   */
  showFooterOnEmpty?: boolean
}
