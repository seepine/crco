<template>
  <div style="display: flex; flex-direction: column">
    <a-input-number
      v-if="option.type === 'number'"
      v-bind="option"
      v-model="value"
      :disabled="undefined"
      @change="handleChange"
    ></a-input-number>
    <a-input-password
      v-else-if="option.type === 'password'"
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
      :tag-nowrap="true"
      :unique-value="true"
      :retain-input-value="true"
      v-bind="option"
      v-model="value"
      v-model:input-value="inputValue"
      :disabled="undefined"
      @blur="handlePressEnter"
      @change="handleTagChange"
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
    <template v-if="suggest && suggest.length > 0">
      <div style="margin-top: 8px; gap: 4px; display: flex; flex-direction: row; flex-wrap: wrap">
        <a-tag
          v-for="(item, idx) in suggest"
          :key="idx"
          :color="tagChecked[item] ? 'arcoblue' : undefined"
          style="cursor: pointer"
          @click="handleTag(item)"
          >{{ item }}</a-tag
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  Input as AInput,
  InputNumber as AInputNumber,
  InputPassword as AInputPassword,
  InputTag as AInputTag,
  Textarea as ATextarea
} from '@arco-design/web-vue'
import { withDefaults, computed, ref, watch, nextTick } from 'vue'
import { isString } from '../../util/is'
import { runCallback } from '../../util/util'

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

const suggest = ref([])

watch(
  () => props.option.suggest,
  () => {
    runCallback(props.option.suggest || []).then((res) => {
      suggest.value = res || []
    })
  },
  {
    immediate: true
  }
)

const tagChecked = computed(() => {
  if (props.option.type !== 'tag') {
    return {}
  }
  if (!suggest.value) {
    return {}
  }
  const check: any = {}
  suggest.value.forEach((item: any) => {
    if ((value.value || []).includes(item)) {
      check[item] = true
    }
  })
  return check
})

const handleTag = (item: string) => {
  if (!item) {
    return
  }
  if (!value.value) {
    value.value = []
  }
  nextTick(() => {
    const index = value.value.indexOf(item)
    if (index === -1) {
      value.value.push(item)
    } else {
      value.value.splice(index, 1)
    }
    emit('update:modelValue', value.value)
  })
}

const inputValue = ref('')
const handlePressEnter = () => {
  const item = inputValue.value.trim()
  if ((value.value || []).indexOf(item) === -1) {
    handleTag(item)
  }
  inputValue.value = ''
}
const handleTagChange = (val: any[]) => {
  if (props.option.trim !== false) {
    value.value = val.filter((item) => item.trim())
  }
  inputValue.value = ''
  handleChange(value.value || [])
}
</script>
