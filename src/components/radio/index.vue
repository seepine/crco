<template>
  <a-radio-group
    type="button"
    v-model="value"
    @change="handleChange"
    :disabled="props.option.disabled"
  >
    <a-radio :value="item.value" v-for="(item, index) in dicData" :key="index">{{
      item.label
    }}</a-radio>
  </a-radio-group>
</template>

<script setup lang="ts">
import { RadioGroup as ARadioGroup, Radio as ARadio } from '@arco-design/web-vue'
import { withDefaults, watch, watchEffect, ref } from 'vue'
import { DicItem } from '../../types/column'
import { initDicData } from '../../util/dic-data'
import { isUndefined } from '../../util/is'

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
  (event: 'change', val: string | number | boolean | undefined): void
}>()
const dicData = ref<Array<DicItem>>([])

const getDefaultValue = () => {
  if (!isUndefined(props.modelValue)) {
    return props.modelValue
  }
  if (!isUndefined(props.option.value)) {
    return props.option.value
  }
  return ''
}
const value = ref<string | number | boolean | undefined>(getDefaultValue())

watchEffect(() => {
  value.value = props.modelValue
})

watch(value, (val: string | number | boolean | undefined) => {
  setTimeout(() => {
    emit('change', val)
  }, 0)
})

const handleChange = (val: string | number | boolean) => {
  value.value = val
  emit('update:modelValue', val)
}

initDicData(props.option).then((res) => {
  dicData.value = res
})
</script>
