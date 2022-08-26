// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, computed, defineComponent, PropType } from 'vue'
import { Switch as ASwitch } from '@arco-design/web-vue'
import CInput from '../input/index.vue'
import CRadio from '../radio/index.vue'
import CSelect from '../select/index.vue'
import CUpload from '../upload/index.vue'
import CDatePicker from '../date-picker/index.vue'
import { isString, isUndefined } from '../../util/is'
import RenderFunction from '../_components/render'
import { FormColumn } from '../../types/column'

export default defineComponent({
  components: {
    ASwitch,
    CRadio,
    CSelect,
    CUpload,
    RenderFunction
  },
  props: {
    column: {
      type: Object as PropType<FormColumn>,
      required: true
    },
    value: {},
    formWidth: {
      type: Number,
      default: 1024
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const type = computed(() => props.column.type)
    const prop = computed<string>(() => props.column.prop)
    const form = computed<any>(() => props.value)
    const valueChange = (val: any) => {
      const old: any = props.value
      old[props.column.prop] = val
      emit('change', old)
    }
    const mergeAttrs = computed(() => {
      return {
        ...props.column,
        class: 'full-width'
      }
    })
    if (!isString(type.value) && !isUndefined(type.value)) {
      // @ts-ignore
      return () => <RenderFunction render-func={type.value} record={form.value} />
    }
    if (
      !type.value ||
      type.value === 'input' ||
      type.value === 'text' ||
      type.value === 'number' ||
      type.value === 'password' ||
      type.value === 'textarea' ||
      type.value === 'tag'
    ) {
      return () => (
        // @ts-ignore
        <CInput
          class={'full-width'}
          option={props.column}
          modelValue={form.value[prop.value]}
          onUpdate:modelValue={valueChange}
        />
      )
    }
    if (type.value === 'radio')
      return () => (
        // @ts-ignore
        <CRadio
          option={props.column}
          modelValue={form.value[prop.value]}
          onUpdate:modelValue={valueChange}
          default-value={form.value[prop.value]}
        />
      )

    if (type.value === 'select')
      return () => (
        // @ts-ignore
        <CSelect
          class="full-width"
          option={props.column}
          modelValue={form.value[prop.value]}
          form={form.value}
          onChange={valueChange}
        />
      )
    if (type.value === 'upload')
      return () => (
        // @ts-ignore
        <CUpload
          class="full-width"
          option={props.column}
          modelValue={form.value[prop.value]}
          onChange={valueChange}
        />
      )
    if (type.value === 'switch')
      return () => (
        <ASwitch
          {...mergeAttrs}
          modelValue={form.value[prop.value]}
          onUpdate:modelValue={valueChange}
        />
      )
    if (
      type.value === 'date' ||
      type.value === 'datetime' ||
      type.value === 'week' ||
      type.value === 'month' ||
      type.value === 'year' ||
      type.value === 'daterange' ||
      type.value === 'dateRange' ||
      type.value === 'quarter'
    )
      return () => (
        // @ts-ignore
        <CDatePicker
          customClass="full-width"
          modelValue={form.value[prop.value]}
          option={props.column}
          onUpdate:modelValue={valueChange}
        />
      )
    return () => <div>unknown div</div>
  }
})
