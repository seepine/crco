import { CascaderFieldNames, CascaderOption, Size, TriggerProps } from '@arco-design/web-vue'

export type CascaderType = {
  /**
   * 级联选择器
   * @href <a href="https://arco.design/vue/component/cascader">ArcoCascader</a>
   */
  type: 'cascader'
  /**
   * @zh 绑定值是否为路径
   * @en Whether the value is a path
   * @defaultValue false
   */
  pathMode?: boolean
  /**
   * @zh 是否为多选状态（多选模式默认开启搜索）
   * @en Whether it is a multi-selection state (The search is turned on by default in the multi-select mode)
   * @defaultValue false
   */
  multiple?: boolean
  /**
   * @zh 默认值（非受控状态）
   * @en Default value (uncontrolled state)
   * @defaultValue props.multiple ? [] : props.pathMode ? undefined : ''
   */
  defaultValue?:
    | string
    | number
    | Record<string, any>
    | (string | number | Record<string, any> | (string | number | Record<string, any>)[])[]
    | undefined
  /**
   * @zh 级联选择器的选项
   * @en Options for cascader
   * @defaultValue []
   */
  options?: CascaderOption[]
  /**
   * @zh 是否为错误状态
   * @en Whether it is an error state
   * @defaultValue false
   */
  error?: boolean
  /**
   * @zh 选择框的大小
   * @en The size of the select
   * @values 'mini', 'small', 'medium', 'large'
   * @defaultValue 'medium'
   */
  size?: Size
  /**
   * @zh 是否允许搜索
   * @en Whether to allow searching
   * @defaultValue false (single) | true (multiple)
   */
  allowSearch?: boolean
  /**
   * @zh 是否允许清除
   * @en Whether to allow clear
   * @defaultValue false
   */
  allowClear?: boolean
  /**
   * @zh 展开下一级的触发方式
   * @en Expand the trigger method of the next level
   * @defaultValue 'click'
   */
  expandTrigger?: 'click' | 'hover'
  /**
   * @zh 是否默认显示下拉框（非受控状态）
   * @en Whether to display the dropdown by default (uncontrolled state)
   * @defaultValue false
   */
  defaultPopupVisible?: boolean
  /**
   * @zh 占位符
   * @en Placeholder
   */
  placeholder?: string
  /**
   * @zh 自定义选项过滤方法
   * @en Custom options filter method
   */
  filterOption?: (inputValue: string, option: CascaderOption) => boolean
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for popup
   */
  popupContainer?: string | HTMLElement | null | undefined
  /**
   * @zh 多选模式下，最多显示的标签数量。0 表示不限制
   * @en In multi-select mode, the maximum number of labels displayed. 0 means unlimited
   */
  maxTagCount?: number
  /**
   * @zh 格式化展示内容
   * @en Format display content
   */
  formatLabel?: (options: CascaderOption[]) => string
  /**
   * @zh 下拉菜单的触发器属性
   * @en Trigger props of the drop-down menu
   * @type TriggerProps
   */
  triggerProps?: TriggerProps
  /**
   * @zh 是否开启严格选择模式
   * @en Whether to enable strict selection mode
   * @defaultValue false
   */
  checkStrictly?: boolean
  /**
   * @zh 数据懒加载函数，传入时开启懒加载功能
   * @en Data lazy loading function, open the lazy loading function when it is passed in
   * @version 2.13.0
   */
  loadMore?: (option: CascaderOption, done: (children?: CascaderOption[]) => void) => void
  /**
   * @zh 搜索下拉菜单中的选项是否仅展示标签
   * @en Whether the options in the search dropdown show only label
   * @version 2.18.0
   * @defaultValue false
   */
  searchOptionOnlyLabel?: boolean
  /**
   * @zh 触发搜索事件的延迟时间
   * @en Delay time to trigger search event
   * @version 2.18.0
   * @defaultValue 500
   */
  searchDelay?: number
  /**
   * @zh 自定义 `CascaderOption` 中的字段
   * @en Customize fields in `CascaderOption`
   * @version 2.22.0
   */
  fieldNames?: CascaderFieldNames
  /**
   * @zh 用于确定选项键值的属性名
   * @en Used to determine the option key value attribute name
   * @version 2.29.0
   * @defaultValue 'value'
   */
  valueKey?: string
  /**
   * @zh 自定义不存在选项的值的展示
   * @en Options that do not exist in custom values
   * @version 2.29.0
   * @defaultValue false, (arco default value is true)
   */
  fallback?:
    | boolean
    | ((
        value:
          | string
          | number
          | Record<string, unknown>
          | (string | number | Record<string, unknown>)[]
      ) => string)
  /**
   * @zh 是否展开子菜单
   * @en whether to expand the submenu
   * @version 2.29.0
   * @defaultValue false
   */
  expandChild?: boolean
}
