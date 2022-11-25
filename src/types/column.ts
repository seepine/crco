import { FieldRule } from '@arco-design/web-vue'
import { ResponsiveValue } from './index'

export type DicItem = {
  /**
   * 选择值
   */
  value: any
  /**
   * 展示label
   */
  label: string
  /**
   * 数据项，例如从dicUrl拿的数据
   * {id:'',name:'',...}
   */
  data: any
}
export interface OnChange {
  /**
   * @return new form
   */
  (data: any, form?: any): any | Promise<any>
  /**
   * @return new form
   */
  (data: DicItem, form?: any): any | Promise<any>
  /**
   * @return new form
   */
  (data: DicItem[], form?: any): any | Promise<any>
}

/**
 * 表单支持类型
 */
export const FormTypes = ['add', 'edit', 'del', 'search']
export type FormType = typeof FormTypes
export type InputType = 'input' | 'text' | 'textarea' | 'password' | 'number' | 'tag'
export type MarkdownType = 'markdown' | 'md'
export type DatePickerType = 'date' | 'datetime'
export type RangPickerType = 'daterange' | 'dateRange'
export type OtherDatePickerType = 'week' | 'month' | 'year' | 'quarter'
export type TimePickerType = 'time' | 'timerange' | 'timeRange'
export type TimeSelectType = 'timeselect' | 'timeSelect'
/**
 * 列类型，输入框、数字输入框、选择器等
 */
export type ComponentType =
  | 'input'
  | 'text'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'radiobutton'
  | 'radioButton'
  | 'switch'
  | 'number'
  | 'cascader'
  | 'slider'
  | 'upload'
  | 'file'
  | 'checkbox'
  | 'checkboxbutton'
  | 'checkboxButton'
  | 'tree'
  | 'treeSelect'

/**
 * 来源于a-form-item，既提供给column，也提供给formOption
 */
export interface GlobalFormItem {
  /**
   * 是否显示冒号,默认false
   */
  showColon?: boolean
  /**
   * 是否去除样式,默认false
   */
  noStyle?: boolean
  /**
   * 默认false,是否隐藏标签
   */
  hideLabel?: boolean
  /**
   * 默认false,是否隐藏星号
   */
  hideAsterisk?: boolean
}
/**
 * a-form-item props 属性
 */
export interface FormItem extends GlobalFormItem {
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 帮助文案
   */
  help?: string
  /**
   * 额外显示的文案
   */
  extra?: string
  /**
   * 是否必须填写,默认false
   */
  required?: boolean
  /**
   * 表单项校验规则
   */
  rules?: FieldRule | FieldRule[] | ((record: any) => FieldRule | FieldRule[] | undefined)
  /**
   * 校验状态
   */
  validateStatus?: 'success' | 'warning' | 'error' | 'validating'
  /**
   * 触发校验的事件，默认'change'
   */
  validateTrigger?: 'change' | 'input' | 'focus' | 'blur'
  /**
   * 标签元素布局选项。参数同 <col> 组件一致
   */
  labelColProps?: object
  /**
   * 表单控件布局选项。参数同 <col> 组件一致
   */
  wrapperColProps?: object
  /**
   * 标签元素布局组件的 style
   */
  labelColStyle?: object
  /**
   * 表单控件布局组件的 style
   */
  wrapperColStyle?: object
  /**
   * 表单项布局选项。参数同 <row> 组件一致
   */
  rowProps?: object
  /**
   * 表单项布局组件的 class
   */
  rowClass?: string | Array<any> | object
  /**
   * 表单控件包裹层的 class
   */
  contentClass?: string | Array<any> | object
  /**
   * 默认true,内容层是否开启 flex 布局
   */
  contentFlex?: boolean
  /**
   * 设置标签 Col 组件的 flex 属性。设置时表单 Col 组件的 flex 属性会被设置为 auto。
   */
  labelColFlex?: number | string
  /**
   * 默认false,是否显示表单控件的反馈图标
   */
  feedback?: boolean
  /**
   * 默认'label', 表单项标签渲染的元素
   */
  labelComponent?: string
  /**
   * 表单项元素的属性
   */
  labelAttrs?: object
}
/**
 * 扩展 a-form-item
 */
export interface FormItemExt {
  /**
   * 表单默认值
   */
  value?: any
  /**
   * 文字类型是否头尾去空格，input默认true，其他默认false
   */
  trim?: boolean
  /**
   *  跨越的格数，一行24，支持响应式
   */
  span?: number | ResponsiveValue
  /**
   * 提示文字
   */
  tooltip?: string
  /**
   * 若为select，则此属性生效
   * 若需要修改值，可直接return，或在done回调中使用
   */
  onChange?: OnChange
  /**
   * 是否显示
   */
  display?: boolean | ((record: any) => boolean)
  /**
   * 后端字典接口地址，接口应返回[]
   */
  dicUrl?: string
  /**
   * 字典数据，填充数据，或函数式返回数据，支持异步，也可通过接口请求数据
   * eg:
   * dicData: ()=> axios.get('/sys/role/list')
   */
  dicData?: readonly any[] | any[] | (() => any[]) | (() => readonly any[]) | (() => Promise<any>)
}
export interface ComponentColumn extends FormItem, FormItemExt {
  // 接收额外任意未收录字段
  [propName: string]: any
}
/**
 * 表单column
 */
export interface FormColumn extends ComponentColumn {
  /**
   * 属性，需要保证唯一
   */
  readonly prop: string
  /**
   * 显示在表单或表格上的label
   */
  name: string
  /**
   * 默认input，列类型
   * 支持自定义 type : (form)=>h('input')
   */
  type?:
    | InputType
    | ComponentType
    | DatePickerType
    | OtherDatePickerType
    | RangPickerType
    | TimePickerType
    | TimeSelectType
    | MarkdownType
    | Function
}
