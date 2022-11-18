<template>
  <a-input-number
    v-if="option.type === 'number'"
    v-bind="option"
    v-model="value"
    :disabled="undefined"
    @change="handleChange"
  ></a-input-number>
  <a-input-password
    v-else-if="option.type === 'password'"
    v-bind="option"
    v-model="value"
    :disabled="undefined"
    @change="handleChange"
  ></a-input-password>
  <a-textarea
    v-else-if="option.type === 'textarea'"
    v-bind="option"
    v-model="value"
    :disabled="undefined"
    @change="handleChange"
  ></a-textarea>
  <a-input-tag
    v-else-if="option.type === 'tag'"
    v-bind="option"
    v-model="value"
    :disabled="undefined"
    @change="handleChange"
  ></a-input-tag>
  <a-input
    v-else
    v-bind="option"
    v-model="value"
    :disabled="undefined"
    @blur="onBlur"
    @change="handleChange"
  >
  </a-input>
</template>

<script setup lang="ts">
import {
  Input as AInput,
  InputNumber as AInputNumber,
  InputPassword as AInputPassword,
  InputTag as AInputTag,
  Textarea as ATextarea
} from '@arco-design/web-vue'
import { withDefaults, computed } from 'vue'
import { isString } from '../../util/is'

const props = withDefaults(
  defineProps<{
    option: any
    modelValue?: any
  }>(),
  {
    option: {}
  }
)
const emit = defineEmits<{
  (event: 'update:modelValue', val: any): void
  (event: 'change', val: any): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val: any) => emit('update:modelValue', val)
})
const onBlur = () => {
  if (props.option.trim !== false) {
    const old: any = value.value
    if (isString(old)) {
      emit('update:modelValue', old.trim())
    }
  }
}
const handleChange = (val: any) => {
  emit('change', val)
}
</script>
