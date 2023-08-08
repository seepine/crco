import { ScrollbarProps, TreeFieldNames, TreeNodeData, TriggerProps } from '@arco-design/web-vue'
import { LabelValue } from '@arco-design/web-vue/es/tree-select/interface'
import { TreeProps } from '@arco-design/web-vue/es/tree/interface'
import { CSSProperties } from 'vue'

export type TreeSelectType = {
  type: 'tree'
  /**
   * @zh 是否允许搜索
   * @en Whether to allow searching
   * @defaultValue false (single) \| true (multiple)
   */
  allowSearch?: boolean | { retainInputValue?: boolean }
  /**
   * @zh 是否允许清除
   * @en Whether to allow clear
   * @defaultValue false
   */
  allowClear?: boolean
  /**
   * @zh 最多显示的标签数量，仅在多选模式有效
   * @en The maximum number of labels displayed, only valid in multi-select mode
   */
  maxTagCount?: number
  /**
   * @zh 是否支持多选
   * @en Whether to support multiple selection
   * @defaultValue false
   */
  multiple?: boolean
  /**
   * @zh 默认值
   * @en default value
   */
  defaultValue?: string | number | Array<string | number> | LabelValue | LabelValue[]
  /**
   * @zh 指定节点数据中的字段名
   * @en Specify the field name in the node data
   */
  fieldNames?: TreeFieldNames
  /**
   * @zh 数据
   * @en Data
   */
  options?: TreeNodeData[]
  /**
   * @zh 设置value格式。默认是string，设置为true时候，value格式为： { label: string, value: string }
   * @en Set the value format. The default is string, when set to true, the value format is: {label: string, value: string}
   * @defaultValue false
   */
  labelInValue?: boolean
  /**
   * @zh 是否展示复选框
   * @en Whether to show checkbox
   * @defaultValue false
   */
  treeCheckable?: boolean
  /**
   * @zh 父子节点是否关联
   * @en Whether the parent and child nodes are related
   */
  treeCheckStrictly?: boolean
  /**
   * @zh 定制回显方式
   * @en Customized echo method
   * @defaultValue 'all'
   */
  treeCheckedStrategy?: 'all' | 'parent' | 'child'
  /**
   * @zh 可以接受所有 Tree 组件的Props
   * @en Can accept Props of all Tree components
   */
  treeProps?: Partial<TreeProps>
  /**
   * @zh 可以接受所有 [Trigger](/vue/component/trigger) 组件的Props
   * @en Can accept Props of all [Trigger](/vue/component/trigger) components
   */
  triggerProps?: Partial<TriggerProps>
  /**
   * @zh 下拉框样式
   * @en Drop-down box style
   */
  dropdownStyle?: CSSProperties
  /**
   * @zh 下拉框样式 class
   * @en Drop-down box style class
   */
  dropdownClassName?: string | string[]
  /**
   * @zh 自定义节点过滤函数
   * @en Custom node filter function
   */
  filterTreeNode?: (searchKey: string, nodeData: TreeNodeData) => boolean
  /**
   * @zh 动态加载数据
   * @en Load data dynamically
   */
  loadMore?: (nodeData: TreeNodeData) => Promise<void>
  /**
   * @zh 禁用内部过滤逻辑
   * @en Disable internal filtering logic
   */
  disableFilter?: boolean
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for pop-up box
   */
  popupContainer?: string | HTMLElement | undefined
  /**
   * @zh 为 value 中找不到匹配项的 key 定义节点数据
   * @en Customize node data for keys that do not match options
   * @version 2.22.0
   * @defaultValue false, 虽然arco默认是true，但crco改为默认false
   */
  fallbackOption?: boolean | ((key: number | string) => TreeNodeData | boolean)
  /**
   * @zh 设置可选择的节点，默认全部可选
   * @en Set the nodes that can be selected, all can be selected by default
   * @version 2.27.0
   * @defaultValue true
   */
  selectable?:
    | boolean
    | 'leaf'
    | ((node: TreeNodeData, info: { isLeaf: boolean; level: number }) => boolean)
  /**
   * @zh 是否开启虚拟滚动条
   * @en Whether to enable virtual scroll bar
   * @version 2.39.0
   * @defaultValue true
   */
  scrollbar?: boolean | ScrollbarProps
}
