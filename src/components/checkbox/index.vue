<template>
  <a-checkbox-group
    v-model="myValue"
    :direction="myOption.direction"
    :indeterminate="myOption.indeterminate"
  >
    <a-checkbox :value="item[fieldNames.value]" v-for="(item, index) in dicData" :key="index">{{
      item[fieldNames.label]
    }}</a-checkbox>
  </a-checkbox-group>
</template>

<script setup lang="ts">
import { CheckboxGroup as ACheckboxGroup, Checkbox as ACheckbox } from '@arco-design/web-vue'
import useSelect from '../_hooks/use-select'
import { CheckboxType } from '../../types/components/checkbox'

const props = defineProps<{
  option: CheckboxType & { [propName: string]: any }
  modelValue?: (string | number | boolean)[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', val: string | number | boolean | undefined): void
  (event: 'update-form', val: any): void
  (event: 'change', val: string | number | boolean | undefined): void
}>()

const { dicData, myOption, fieldNames, myValue } = useSelect(props, emit)
</script>
