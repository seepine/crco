export type TextareaType = {
  /**
   * 文本域
   *
   * @href <a href="https://arco.design/vue/component/textarea">ArcoTextarea</a>
   */
  type: 'textarea'
  /**
   * @zh 提示文字
   * @en Prompt text
   */
  placeholder?: string
  /**
   * @zh 是否为错误状态
   * @en Whether it is an error state
   */
  error?: boolean
  /**
   * @zh 输入值的最大长度，errorOnly 属性在 2.12.0 版本添加
   * @en Enter the maximum length of the value, the errorOnly attribute was added in version 2.12.0
   * @defaultValue 0
   */
  maxLength?: number | { length: number; errorOnly?: boolean }
  /**
   * @zh 是否显示字数统计
   * @en Whether to display word count
   * @defaultValue false
   */
  showWordLimit?: boolean
  /**
   * @zh 是否允许清空输入框
   * @en Whether to allow the input to be cleared
   * @defaultValue false
   */
  allowClear?: boolean
  /**
   * @zh 是否让文本框自适应内容高度
   * @en Whether to make the textarea adapt to the height of the content
   * @defaultValue false
   */
  autoSize?: boolean | { minRows?: number; maxRows?: number }
  /**
   * @zh 字符长度的计算方法
   * @en Calculation method of word length
   */
  wordLength?: (value: string) => number
  /**
   * @zh 字符截取方法，同 wordLength 一起使用
   * @en Character interception method, used together with wordLength
   * @version 2.12.0
   */
  wordSlice?: (value: string, maxLength: number) => string
}
