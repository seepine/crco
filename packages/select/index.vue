<template>
  <a-select v-model="value" v-bind="myOption" :loading="loading" :disabled="undefined">
    <a-option :value="item.value" v-for="(item, index) in dicData" :key="index">
      <slot :item="item" :index="index" :dicData="dicData">
        {{ item.label }}
      </slot>
    </a-option>
  </a-select>
</template>
<script setup lang="ts">
import { Select as ASelect, Option as AOption } from '@arco-design/web-vue'
import { withDefaults, computed, ref } from 'vue'
import { isArray, isFunction, isUndefined } from '../util/is'
import { initDicData } from '../util/data-handle'
import { filterProps } from '../util/filter'
import { DicData, DicItem } from '../util/dic-data'
import { deepClone } from '../util/util'

type ModelValueType = string | number | Array<string | number> | undefined

const props = withDefaults(
  defineProps<{
    option: any
    modelValue: ModelValueType
    form?: any
  }>(),
  {
    option: {},
    modelValue: ''
  }
)
const myOption = computed(() => {
  return {
    ...props.option,
    onChange: undefined
  }
})
const emit = defineEmits<{
  (event: 'update:modelValue', p_val: ModelValueType): void
  (event: 'update:form', p_val: any): void
  (event: 'change', p_val: ModelValueType, p_item: any): void
}>()
const dicData = ref<DicData>([])
const dicProps = computed<any>(() => filterProps(props.option.props))
const hasProps = computed(() => {
  return props.option.props !== false
})
const loading = ref(false)

const onChange = (val: any) => {
  emit('update:modelValue', val === '' ? undefined : val)
  let find: any
  if (isArray(val)) {
    find = dicData.value.filter((item: any) => {
      return (
        val.findIndex((v: any) => {
          return hasProps.value ? v === item[dicProps.value.value] : v === item
        }) >= 0
      )
    })
  } else {
    find = dicData.value.find((item: any) => {
      return hasProps.value ? val === item[dicProps.value.value] : val === item
    })
  }
  try {
    if (isFunction(props.option.onChange)) {
      const res = props.option.onChange(val === '' ? undefined : val, find, deepClone(props.form))
      if (!isUndefined(res)) {
        console.log('拿到结果', res)
        emit('update:form', deepClone(res))
      }
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  emit('change', val === '' ? undefined : val, find)
}

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    onChange(val)
  }
})
loading.value = true
initDicData(props.option)
  .then((res: DicData) => {
    dicData.value = res
    loading.value = false
    // 设置默认值
    if (res.length > 0) {
      if (props.option.defaultSelectAll && props.option.multiple) {
        onChange(
          res.map((item: DicItem) => {
            return item.value
          })
        )
      } else if (props.option.defaultSelect) {
        onChange(props.option.multiple ? [res[0].value] : res[0].value)
      }
    }
  })
  .catch(() => {
    loading.value = false
  })
</script>
