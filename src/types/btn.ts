export interface Callback<T> {
  (form?: any): T
}
export interface Btn {
  /**
   * '提交',按钮文字
   */
  text?: string | Callback<string>
  /**
   * true,是否显示按钮
   */
  display?: boolean | Callback<boolean>
  /**
   * false,是否长按钮
   */
  long?: boolean
  /**
   * 按钮权限后缀，例如新增默认add，编辑默认edit
   */
  permissionSuffix?: string

  /**
   * 弹窗提示内容
   */
  popConfirmContent?: string | ((form?: any) => string)
}
