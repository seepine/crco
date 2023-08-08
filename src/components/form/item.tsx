// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, computed, defineComponent, PropType } from 'vue'
import {
  Switch as ASwitch,
  Slider as ASlider,
  Mention as AMention,
  Rate as ARate,
  TimePicker as ATimePicker,
  Cascader as ACascader
} from '@arco-design/web-vue'
import CInput from '../input/index.vue'
import CRadio from '../radio/index.vue'
import CSelect from '../select/index.vue'
import CUpload from '../upload/index.vue'
import CDatePicker from '../date-picker/index.vue'
import CMarkdown from '../markdown/index.vue'
import { isString, isUndefined } from '../../util/is'
import RenderFunction from '../_components/render'
import { ComponentType, FormColumn } from '../../types/column'
import { deepClone, runCallback } from '../../util/util'
import CTreeSelect from '../tree-select/index.vue'
import CCheckbox from '../checkbox/index.vue'

export default defineComponent({
  components: {
    ASwitch,
    AMention,
    ASlider,
    ARate,
    ATimePicker,
    CInput,
    CRadio,
    CSelect,
    CUpload,
    CDatePicker,
    CMarkdown,
    CCheckbox,
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
    // @ts-ignore
    const type = computed<ComponentType>(() => props.column.type)
    const prop = computed<string>(() => props.column.prop)
    const form = computed<any>(() => props.value)
    const valueChangeOnly = (val: any) => {
      const old: any = props.value
      old[props.column.prop] = val
      emit('change', old)
    }
    const valueChange = (val: any) => {
      if (!isUndefined(props.column.onChange)) {
        runCallback(props.column.onChange, val, deepClone(props.value))
          .then((newForm) => {
            emit('change', newForm)
          })
          .catch(() => {
            valueChangeOnly(val)
          })
      } else {
        valueChangeOnly(val)
      }
    }
    const onUpdateForm = (val: any) => {
      emit('change', val)
    }
    const mergeAttrs = computed<any>(() => {
      return {
        ...props.column,
        class: 'full-width'
      }
    })
    if (!isString(type.value) && !isUndefined(type.value)) {
      // @ts-ignore
      // type: (form)=> h()
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
    if (type.value === 'checkbox')
      return () => (
        // @ts-ignore
        <CCheckbox
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
          onChange={valueChangeOnly}
          onUpdateForm={onUpdateForm}
        />
      )
    if (type.value === 'tree')
      return () => (
        // @ts-ignore
        <CTreeSelect
          class="full-width"
          option={props.column}
          modelValue={form.value[prop.value]}
          form={form.value}
          onChange={valueChangeOnly}
          onUpdateForm={onUpdateForm}
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
    if (type.value === 'markdown' || type.value === 'md')
      return () => (
        // @ts-ignore
        <CMarkdown
          option={props.column}
          modelValue={form.value[prop.value]}
          onUpdate:modelValue={valueChange}
        ></CMarkdown>
      )
    if (type.value === 'slider') {
      return () => (
        <ASlider
          {...mergeAttrs}
          modelValue={form.value[prop.value]}
          onUpdate:modelValue={valueChange}
        ></ASlider>
      )
    }
    if (type.value === 'mention') {
      return () => (
        <AMention
          {...mergeAttrs}
          modelValue={form.value[prop.value]}
          onUpdate:modelValue={valueChange}
          type={mergeAttrs.value?.mode === 'textarea' ? 'textarea' : undefined}
        ></AMention>
      )
    }
    if (type.value === 'rate') {
      return () => (
        <ARate
          {...mergeAttrs}
          modelValue={form.value[prop.value]}
          onUpdate:modelValue={valueChange}
        ></ARate>
      )
    }
    if (type.value === 'cascader') {
      return () => (
        <ACascader
          {...mergeAttrs}
          modelValue={form.value[prop.value]}
          onUpdate:modelValue={valueChange}
        ></ACascader>
      )
    }
    // 'date' | 'year' | 'quarter' | 'month' | 'week'
    if (
      type.value === 'date' ||
      type.value === 'datetime' ||
      type.value === 'week' ||
      type.value === 'month' ||
      type.value === 'quarter' ||
      type.value === 'year' ||
      type.value === 'range'
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
    if (type.value === 'time') {
      return () => (
        <ATimePicker
          {...mergeAttrs}
          type={mergeAttrs.value.mode === 'time-range' ? 'time-range' : undefined}
          modelValue={form.value[prop.value]}
          onUpdate:modelValue={valueChange}
        ></ATimePicker>
      )
    }
    return () => <div>unknown div</div>
  }
})
