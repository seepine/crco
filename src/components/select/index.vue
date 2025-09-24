<template>
  <a-select
    autocomplete="off"
    v-bind="myOption"
    v-model="myValue"
    :fallback-option="myOption.fallbackOption || false"
    :loading="loading"
    :disabled="undefined"
    :field-names="fieldNames"
  >
    <a-option :value="item[fieldNames.value]" v-for="(item, index) in dicData" :key="index">
      <slot :item="item" :index="index" :dicData="dicData">
        {{ item[fieldNames.label] }}
      </slot>
    </a-option>
  </a-select>
</template>
<script setup lang="ts">
import { Select as ASelect, Option as AOption } from '@arco-design/web-vue'
import { withDefaults } from 'vue'
import { ComponentColumn } from '../../types/column'
import useSelect from '../_hooks/use-select'

type ModelValueType = string | number | Array<string | number> | null

const props = withDefaults(
  defineProps<{
    option: ComponentColumn
    modelValue?: ModelValueType
    form?: any
  }>(),
  {
    modelValue: undefined
  }
)
const emit = defineEmits<{
  (event: 'update:modelValue', val: ModelValueType): void
  (event: 'update-form', val: any): void
  (event: 'change', val: ModelValueType, item: any): void
}>()

const { loading, dicData, myOption, fieldNames, myValue, onChange } = useSelect(
  props,
  emit,
  (res) => {
    // 寻找当前值，若不存在则去除选中值
    const find = res.filter((item: any) => {
      if (props.option.multiple) {
        return (
          ((myValue.value || []) as string[]).findIndex(
            (v) => v === item[fieldNames.value.value]
          ) >= 0
        )
      }
      if (item[fieldNames.value.value] === myValue.value) {
        return true
      }
      return false
    })
    if (props.option.multiple) {
      onChange(
        ((myValue.value || []) as string[]).filter((item) => {
          return find.findIndex((i) => i[fieldNames.value.value] === item) >= 0
        })
      )
    } else if (find.length === 0) {
      onChange('')
    }
  }
)
</script>
