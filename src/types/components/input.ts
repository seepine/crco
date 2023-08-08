import { Size } from '@arco-design/web-vue'

export type InputType =
  | {
      type: 'input'
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
      /**
       * @zh 输入值的最大长度，errorOnly 属性在 2.12.0 版本添加
       * @en Enter the maximum length of the value, the errorOnly attribute was added in version 2.12.0
       * @defaultValue 0
       */
      maxLength?: number
      /**
       * @zh 是否显示字数统计
       * @en Whether to display word count
       * @defaultValue false
       */
      showWordLimit?: boolean
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
      /**
       * @zh 内部 input 元素的属性
       * @en Attributes of inner input elements
       * @version 2.27.0
       */
      inputAttrs?: object
    }
  | { type?: 'password' }
