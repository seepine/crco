<template>
  <a-select
    v-model="myValue"
    v-bind="myOption"
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

type ModelValueType = string | number | Array<string | number> | undefined

const props = withDefaults(
  defineProps<{
    option: ComponentColumn
    modelValue: ModelValueType
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

const { loading, dicData, myOption, fieldNames, myValue } = useSelect(props, emit)
</script>
