<template>
  <a-tree-select
    autocomplete="off"
    v-bind="myOption"
    v-model="value"
    :data="dicData"
    :field-names="treeProps"
    :loading="loading"
    :fallback-option="myOption.fallbackOption || false"
  ></a-tree-select>
</template>
<script setup lang="ts">
import { TreeFieldNames, TreeSelect as ATreeSelect } from '@arco-design/web-vue'
import { withDefaults, computed, ref, watch } from 'vue'
import { isArray, isUndefined } from '../../util/is'
import { runDicData } from '../../util/dic-data'
import { ComponentColumn, DicItem } from '../../types/column'
import { runCallback } from '../../util/util'
import { treeFind } from '../../util/tree'

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
  (event: 'update-form', val: any): void
  (event: 'change', val: ModelValueType, item: any): void
}>()

const treeProps = computed<TreeFieldNames>(() => {
  const fields = (myOption.value.props as any) || {}
  return {
    key: fields.key || 'key',
    title: fields.title || 'title',
    disabled: fields.disabled || 'disabled',
    children: fields.children || 'children',
    isLeaf: fields.isLeaf || 'isLeaf',
    disableCheckbox: fields.disableCheckbox || 'disableCheckbox',
    checkable: fields.checkable || 'checkable',
    icon: fields.icon || 'icon',
    draggable: fields.draggable || '_draggable'
  }
})

const dicData = ref<Array<any>>([])

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
  emit('change', val === '' ? undefined : val, find)
  if (!isUndefined(props.option.onChange)) {
    runCallback(props.option.onChange, find, props.form)
      .then((res) => {
        emit('update-form', res)
      })
      .catch(() => {})
  }
}

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    onChange(val)
  }
})

watch(
  myOption,
  () => {
    loading.value = true
    runDicData(props.option, props.form)
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
        // 非空时寻找当前值，若不存在则去除选中值
        if (
          isUndefined(value.value) ||
          value.value === '' ||
          (isArray(value.value) && value.value.length === 0)
        ) {
          return
        }
        const find = treeFind(res, (item: any) => {
          if (props.option.multiple) {
            return (
              ((value.value || []) as string[]).findIndex(
                (v) => v === item[treeProps.value.key || 'key']
              ) >= 0
            )
          }
          if (item[treeProps.value.key || 'key'] === value.value) {
            return true
          }
          return false
        })
        if (props.option.multiple) {
          onChange(
            ((value.value || []) as string[]).filter((item) => {
              return find.findIndex((i) => i[treeProps.value.key || 'key'] === item) >= 0
            })
          )
        } else if (find.length === 0) {
          onChange('')
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
</script>
