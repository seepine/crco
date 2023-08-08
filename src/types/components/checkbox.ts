import { CheckboxOption, Direction, SelectFieldNames } from '@arco-design/web-vue'

export type CheckboxType = {
  /**
   * 复选框
   * @href <a href="https://arco.design/vue/component/checkbox">ArcoCheckbox</a>
   */
  type: 'checkbox'
  /**
   * @zh 默认值（非受控状态）
   * @en Default value (uncontrolled state)
   */
  defaultValue?: Array<string | number | boolean>
  /**
   * @zh 支持最多选中的数量
   * @en Support the maximum number of selections
   * @version 2.36.0
   */
  max?: number
  /**
   * @zh 选项
   * @en Options
   * @version 2.27.0
   */
  options?: Array<string | number | CheckboxOption>
  /**
   * @zh 复选框的排列方向
   * @en Arrangement direction of checkboxes
   * @defaultValue 'horizontal'
   */
  direction?: Direction
  /**
   * @zh 自定义 `SelectOptionData` 中的字段
   * @en Customize fields in `SelectOptionData`
   * @version 2.22.0
   */
  fieldNames?: SelectFieldNames
}
