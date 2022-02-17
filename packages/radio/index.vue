<template>
  <a-radio-group type="button" v-model="value" @change="handleChange">
    <a-radio :value="item.value" v-for="(item, index) in dicData" :key="index">{{
      item.label
    }}</a-radio>
  </a-radio-group>
</template>

<script setup lang="ts">
import { RadioGroup as ARadioGroup, Radio as ARadio } from '@arco-design/web-vue'
import { withDefaults, watch, watchEffect, ref } from 'vue'
import { DicData } from '../util/dic-data'
import { initDicData } from '../util/data-handle'
import { isUndefined } from '../util/is'

const props = withDefaults(
  defineProps<{
    option: any
    modelValue?: string | number
    disabled?: boolean
  }>(),
  {
    option: {}
  }
)
const emit = defineEmits<{
  (event: 'update:modelValue', p_val: string | number | undefined): void
  (event: 'change', p_val: string | number | undefined): void
}>()
const dicData = ref<DicData>([])

const getDefaultValue = () => {
  if (!isUndefined(props.modelValue)) {
    return props.modelValue
  }
  if (!isUndefined(props.option.value)) {
    return props.option.value
  }
  return ''
}
const value = ref<string | number | undefined>(getDefaultValue())

watchEffect(() => {
  value.value = props.modelValue
})

watch(value, (val: string | number | undefined) => {
  setTimeout(() => {
    emit('change', val)
  }, 0)
})

const handleChange = (val: string | number) => {
  value.value = val
  emit('update:modelValue', val)
}

initDicData(props.option).then((res) => {
  dicData.value = res
})
</script>
