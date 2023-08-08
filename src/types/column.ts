import { FieldRule } from '@arco-design/web-vue'
import { Component, VNode } from 'vue'
import { AnyObject, ResponsiveValue } from './index'
import { InputType } from './components/input'
import { InputNumberType } from './components/input-number'
import { TextareaType } from './components/textarea'
import { SelectType } from './components/select'
import { RadioType } from './components/radio'
import { SwitchType } from './components/switch'
import { SliderType } from './components/slider'
import { AutoCompleteType } from './components/auto-complete'
import { UploadType } from './components/upload'
import {
  DatePickerType,
  MonthPickerType,
  QuarterPickerType,
  WeekPickerType,
  YearPickerType,
  RangePickerType
} from './components/date-picker'
import { CheckboxType } from './components/checkbox'
import { InputTagType } from './components/input-tag'
import { RateType } from './components/rate'
import { MentionType } from './components/mention'
import { TimePickerType } from './components/time-picker'
import { TreeSelectType } from './components/tree-select'
import { CascaderType } from './components/cascader'

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
  disabled?: boolean | ((record: any) => boolean)
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
  tooltip?: string | ((record: any) => string)
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
   * 是否禁用
   */
  disabled?: boolean | ((record: any) => boolean)
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
  /**
   * 自定义值展示
   * @param record 数据
   * @returns 渲染节点
   */
  formatValue?: (record: AnyObject) => Component
}
export type ComponentColumn = FormItem & FormItemExt & AnyObject

type CustomType = {
  /**
   * 自定义类型
   * @param form 表单值，可双向绑定
   * @returns VNode
   */
  type: (form: any) => VNode
}
type MarkdownType = { type?: 'markdown' }

export type ComponentType =
  | CustomType
  | MarkdownType
  | InputType
  | InputNumberType
  | TextareaType
  | SelectType
  | RadioType
  | SwitchType
  | SliderType
  | AutoCompleteType
  | CascaderType
  | UploadType
  | DatePickerType
  | MonthPickerType
  | QuarterPickerType
  | WeekPickerType
  | YearPickerType
  | RangePickerType
  | CheckboxType
  | InputTagType
  | MentionType
  | RateType
  | TimePickerType
  | TreeSelectType
/**
 * 表单column
 */
export type FormColumn = ComponentType & {
  /**
   * 属性，需要保证唯一
   */
  readonly prop: string
  /**
   * 显示在表单或表格上的label
   */
  name: string
} & ComponentColumn
