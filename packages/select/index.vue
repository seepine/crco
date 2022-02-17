<template>
  <a-select v-model="value" v-bind="option" :loading="loading" :disabled="props.disabled">
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
import { isArray } from '../util/is'
import { initDicData } from '../util/data-handle'
import { filterProps } from '../util/filter'
import { DicData, DicItem } from '../util/dic-data'

type ModelValueType = string | number | Array<string | number> | undefined

const props = withDefaults(
  defineProps<{
    option: any
    modelValue: ModelValueType
    disabled?: boolean
  }>(),
  {
    option: {},
    modelValue: '',
    disabled: false
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', p_val: ModelValueType): void
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
  let find
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
    if (props.option.defaultSelectAll && props.option.multiple) {
      onChange(
        res.map((item: DicItem) => {
          return item.value
        })
      )
    }
  })
  .catch(() => {
    loading.value = false
  })
</script>
