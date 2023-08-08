import { Size } from '@arco-design/web-vue'

export type InputNumberType = {
  type: 'number'
  /**
   * @zh 模式（`embed`：按钮内嵌模式，`button`：左右按钮模式）
   * @en Mode (`embed`: button embedded mode, `button`: left and right button mode)
   * @values 'embed', 'button'
   * @defaultValue 'embed'
   */
  mode?: 'embed' | 'button'
  /**
   * @zh 数字精度, 即小数位数, 当 precision 小于 step 的小数位时，精度取 step 的小数位数。
   * @en Precision
   */
  precision?: number
  /**
   * @zh 数字变化步长
   * @en Number change step
   * @defaultValue 1
   */
  step?: number
  /**
   * @zh 最大值
   * @en Max
   */
  max?: number
  /**
   * @zh 最小值
   * @en Min
   */
  min?: number
  /**
   * @zh 定义输入框展示值
   * @en Define the display value of the input
   */
  formatter?: Function
  /**
   * @zh 从 `formatter` 转换为数字，和 `formatter` 搭配使用
   * @en Convert from `formatter` to number, and use with `formatter`
   */
  parser?: Function
  /**
   * @zh 是否隐藏按钮
   * @en Whether to hide the button
   */
  hideButton?: boolean
  /**
   * @zh 触发 `v-model` 的事件
   * @en Trigger event for `v-model`
   * @defaultValue change
   */
  modelEvent?: 'change' | 'input'
  /**
   * @zh 输入框大小
   * @en Input size
   * @values 'mini','small','medium','large'
   * @defaultValue 'medium'
   */
  size?: Size
  /**
   * @zh 是否允许清空输入框
   * @en Whether to allow the input to be cleared
   * @defaultValue false
   */
  allowClear?: boolean
  /**
   * @zh 是否为只读状态
   * @en Whether it is read-only
   * @defaultValue false
   */
  readonly?: boolean
  /**
   * @zh 是否为错误状态
   * @en Whether it is an error state
   */
  error?: boolean
  /**
   * @zh 提示文字
   * @en Prompt text
   */
  placeholder?: string
}
