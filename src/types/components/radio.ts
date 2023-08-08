import { Direction, Size } from '@arco-design/web-vue'
import { RadioOption } from '@arco-design/web-vue/es/radio/interface'

export type RadioType = {
  type: 'radio'
  /**
   * @zh 单选按钮类型
   * @en type of radio
   * @defaultValue button
   */
  radioType?: 'radio' | 'button'
  /**
   * @zh 单选框组的尺寸
   * @en The size of the radio group
   * @values 'mini','small','medium','large'
   */
  size?: Size
  /**
   * @zh 选项数据
   * @en Option data
   */
  options?: (string | number | RadioOption)[]
  /**
   * @zh 单选框组的方向,radioType=radio时生效
   * @en The direction of the radio group
   * @values 'horizontal', 'vertical'
   * @defaultValue horizontal
   */
  direction?: Direction
}
