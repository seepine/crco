import { Size } from '@arco-design/web-vue'

export type SwitchType = {
  type: 'switch'
  /**
   * @zh 开关的类型
   * @en type of switch
   * @defaultValue circle
   */
  switchType?: 'circle' | 'round' | 'line'
  /**
   * @zh 单选框组的尺寸
   * @en The size of the radio group
   * @values 'mini','small','medium','large'
   */
  size?: Size
  /**
   * @zh 选中时的值
   * @en Value when checked
   * @version 2.12.0
   * @defaultValue true
   */
  checkedValue?: string | number | boolean
  /**
   * @zh 未选中时的值
   * @en Value when unchecked
   * @version 2.12.0
   * @defaultValue false
   */
  uncheckedValue?: string | number | boolean
  /**
   * @zh 选中时的开关颜色
   * @en The color of the switch when checked
   * @version 2.12.0
   */
  checkedColor?: string
  /**
   * @zh 未选中时的开关颜色
   * @en The color of the switch when unchecked
   * @version 2.12.0
   */
  uncheckedColor?: string
  /**
   * @zh switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换。
   * @en before-change hook before the switch state changes. If false is returned or a Promise is returned and then is rejected, will stop switching
   * @version 2.37.0
   */
  beforeChange?: (newValue: string | number | boolean) => Promise<boolean | void> | boolean | void
  /**
   * @zh 打开状态时的文案（`type='line'`和`size='small'`时不生效）
   * @en Copywriting when opened (not effective when `type='line'` and `size='small'`)
   * @version 2.45.0
   */
  checkedText?: string
  /**
   * @zh 关闭状态时的文案（`type='line'`和`size='small'`时不生效）
   * @en Copywriting when closed (not effective when `type='line'` and `size='small'`)
   * @version 2.45.0
   */
  uncheckedText?: string
}
