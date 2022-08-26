<template>
  <a-select
    v-model="value"
    v-bind="myOption"
    :fallback-option="myOption.fallbackOption || false"
    :loading="loading"
    :disabled="undefined"
  >
    <a-option :value="item.value" v-for="(item, index) in dicData" :key="index">
      <slot :item="item" :index="index" :dicData="dicData">
        {{ item.label }}
      </slot>
    </a-option>
  </a-select>
</template>
<script setup lang="ts">
import { Select as ASelect, Option as AOption } from '@arco-design/web-vue'
import { withDefaults, computed, ref, watch } from 'vue'
import { isArray, isFunction, isUndefined } from '../../util/is'
import { initDicData } from '../../util/dic-data'
import { ComponentColumn, DicItem } from '../../types/column'

type ModelValueType = string | number | Array<string | number> | undefined

const props = withDefaults(
  defineProps<{
    option: ComponentColumn
    modelValue: ModelValueType
    form?: any
  }>(),
  {
    modelValue: ''
  }
)
const myOption = computed<any>(() => {
  return {
    ...props.option,
    onChange: undefined
  }
})
const emit = defineEmits<{
  (event: 'update:modelValue', val: ModelValueType): void
  (event: 'update:form', val: any): void
  (event: 'change', val: ModelValueType, item: any): void
}>()
const dicData = ref<Array<DicItem>>([])

const loading = ref(false)

const onChange = (val: any) => {
  emit('update:modelValue', val === '' ? undefined : val)
  let find: any
  if (isArray(val)) {
    find = dicData.value.filter((item: any) => {
      return (
        val.findIndex((v: any) => {
          return v === item || v === item.value
        }) >= 0
      )
    })
  } else {
    find = dicData.value.find((item: any) => {
      return val === item || val === item.value
    })
  }
  try {
    // 判断
    if (isFunction(props.option.onChange)) {
      const res = props.option.onChange(find, props.form, (callbackFormData: any) => {
        emit('update:form', callbackFormData)
      })
      if (!isUndefined(res)) {
        emit('update:form', res)
      }
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  emit('change', val === '' ? undefined : val, find)
}

watch(
  myOption,
  () => {
    loading.value = true
    initDicData(props.option)
      .then((res) => {
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
  },
  {
    deep: true,
    immediate: true
  }
)

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    onChange(val)
  }
})
</script>
