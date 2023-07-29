import { ButtonProps } from '@arco-design/web-vue'
import { AnyObject, Callback } from '.'

export type Done = () => void

export type BtnOnClick =
  | ((params: any, done: Done) => void)
  | ((params: any, done: Done) => Promise<void>)

export interface Btn {
  /**
   * '提交',按钮文字
   */
  text?: string | ((data?: any) => string)
  /**
   * true,是否显示按钮
   */
  display?: boolean | ((data?: any) => boolean)
  /**
   * false,是否长按钮
   */
  long?: boolean
  /**
   * 按钮权限后缀，例如新增默认add，编辑默认edit
   */
  permissionSuffix?: string
  /**
   * 可控制事件执行之前，例如编辑前改变参数等，更多写法查看Callback
   * onBefore: (form)=>{
   *   return {
   *     ...form,
   *     name: 'newName'
   *   }
   * }
   */
  onBefore?: Callback<AnyObject, AnyObject>
  /**
   * 可控制事件执行之后，例如新增提交后，修改或判断值，再决定要不要传给后端，更多写法查看Callback
   * onBefore: (form)=>{
   *   return {
   *     ...form,
   *     name: 'newName'
   *   }
   * }
   */
  onAfter?: Callback<AnyObject, AnyObject>
  /**
   * 点击事件，部分按钮会触发
   * @param params 搜索相关参数
   * @returns Promise
   */
  onClick?: BtnOnClick
  /**
   * 按钮的属性
   */
  buttonProps?: ButtonProps
}
