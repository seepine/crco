import { ButtonProps } from '@arco-design/web-vue'

export interface Done {
  (): void
}

export interface Callback<T> {
  (form?: any): T
  (form?: any): Promise<T>
}
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
   * 可控制事件执行之前，例如编辑前改变参数等
   * onBefore: (form)=>{
   *   return {
   *     ...form,
   *     name: 'new'
   *   }
   * }
   * 也可通过Promise异步返回或控制不继续执行
   * onBefore: (form)=>{
   *   return new Promise((RES,REJ)=>{
   *      // RES(form) 返回正确值
   *      REJ()
   *   })
   * }
   */
  onBefore?: Callback<any>
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
