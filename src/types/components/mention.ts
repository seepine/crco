import { SelectOptionData, SelectOptionGroup } from '@arco-design/web-vue'

export type MentionType = {
  /**
   * 标签输入框
   *
   * @href <a href="https://arco.design/vue/component/mention">ArcoMention</a>
   */
  type: 'mention'
  /**
   * @zh 用于自动补全的数据
   * @en Data for automatic completion
   */
  data?: (string | number | SelectOptionData | SelectOptionGroup)[]
  /**
   * @zh 触发自动补全的关键字
   * @en Keywords that trigger auto-completion
   * @defaultValue '@'
   */
  prefix?: string | string[]
  /**
   * @zh 选中项的前后分隔符
   * @en Before and after the selected item separator
   * @defaultValue ' '
   */
  split?: string
  /**
   * 相当于 ArcoMention 的 props.type
   * @zh 输入框或文本域
   * @en default input or textarea
   * @defaultValue 'input'
   */
  mode?: 'input' | 'textarea'
  /**
   * @zh 是否允许清空输入框
   * @en Whether to allow the input to be cleared
   * @version 2.23.0
   * @defaultValue false
   */
  allowClear?: boolean
}
