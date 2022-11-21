import { ResponsiveValue } from './index'
import { Btn } from './btn'
import { FormColumn, GlobalFormItem } from './column'

export type FormType = 'view' | 'add' | 'edit' | 'del' | undefined

/**
 * a-form props 属性
 */
export interface FormProps {
  /**
   * 'horizontal', 表单的布局方式，包括水平、垂直、多列
   */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /**
   * 'medium', 表单控件的尺寸
   */
  size?: 'mini' | 'small' | 'medium' | 'large'
  /**
   * span: 5, offset: 0 , 标签元素布局选项。参数同 <col> 组件一致
   */
  labelColProps?: object
  /**
   * span: 19, offset: 0 , 表单控件布局选项。参数同 <col> 组件一致
   */
  wrapperColProps?: object
  /**
   * 'right',标签的对齐方向
   */
  labelAlign?: 'left' | 'right'
  /**
   * false, 是否开启自动标签宽度，仅在 layout="horizontal" 下生效。
   */
  autoLabelWidth?: boolean
}
/**
 * 扩展 a-form props属性
 */
export interface FormExt {
  /**
   * 按钮配置
   */
  btn?: Btn | boolean
  /**
   * 跨越的格数，一行24
   */
  span?: number | ResponsiveValue
  /**
   * 间距，单位0.5px，例如10为5px
   */
  gutter?: number | ResponsiveValue
  /**
   * form-item的row排列方式
   */
  justify?: 'start' | 'center' | 'end' | 'space-around' | 'space-between'
  // 接收额外任意未收录字段
  [propName: string]: any
}
/**
 * 表单组
 */
export interface FormGroup {
  /**
   * 分组标题
   */
  title: string
  /**
   * 分组表单配置
   */
  columns: FormColumn[]
}

export interface FormOption extends GlobalFormItem, FormProps, FormExt {
  /**
   * 分组配置
   */
  groups?: FormGroup[]
  /**
   * 表单配置
   */
  columns?: FormColumn[]
}
