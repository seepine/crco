<template>
  <a-radio-group type="button" v-model="myValue" :disabled="myOption.disabled">
    <a-radio :value="item[fieldNames.value]" v-for="(item, index) in dicData" :key="index">{{
      item[fieldNames.label]
    }}</a-radio>
  </a-radio-group>
</template>

<script setup lang="ts">
import { RadioGroup as ARadioGroup, Radio as ARadio } from '@arco-design/web-vue'
import { withDefaults } from 'vue'
import useSelect from '../_hooks/use-select'

const props = withDefaults(
  defineProps<{
    option: any
    modelValue?: string | number | boolean
  }>(),
  {
    option: {}
  }
)
const emit = defineEmits<{
  (event: 'update:modelValue', val: string | number | boolean | undefined): void
  (event: 'update-form', val: any): void
  (event: 'change', val: string | number | boolean | undefined): void
}>()

const { dicData, myOption, fieldNames, myValue } = useSelect(props, emit)
</script>
