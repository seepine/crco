import { InputTagFieldNames, Size, TagData } from '@arco-design/web-vue'

export type InputTagType = {
  /**
   * 标签输入框
   *
   * @href <a href="https://arco.design/vue/component/input-tag">ArcoInputTag</a>
   */
  type: 'tag'
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
   * @zh 输入框大小
   * @en Input size
   * @values 'mini','small','medium','large'
   * @defaultValue 'medium'
   */
  size?: Size
  /**
   * @zh 最多展示的标签个数，`0` 表示不限制
   * @en The maximum number of tags displayed, `0` means unlimited
   * @defaultValue 0
   */
  maxTagCount?: number
  /**
   * @zh 是否保留输入框的内容
   * @en Whether to keep the content of the input box
   * @defaultValue false
   */
  retainInputValue?: boolean | { create?: boolean; blur?: boolean }
  /**
   * @zh 格式化标签内容
   * @en Format tag content
   */
  formatTag?: (data: TagData) => string
  /**
   * @zh 是否仅创建唯一的值
   * @en Whether to create only unique values
   * @version 2.15.0
   * @defaultValue false
   */
  uniqueValue?: boolean
  /**
   * @zh 自定义 `TagData` 中的字段
   * @en Customize fields in `TagData`
   * @version 2.22.0
   */
  fieldNames?: InputTagFieldNames
}
