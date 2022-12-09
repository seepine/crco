<template>
  <a-space direction="vertical" style="width: 100%">
    <a-descriptions
      :data="data"
      :title="props.title"
      :column="1"
      :bordered="clientWidth >= 500"
      :style="{ maxWidth: `${maxWidth}px` }"
      :layout="clientWidth < 500 ? 'inline-vertical' : undefined"
      :label-style="{ width: '200px' }"
    >
      <template #label="{ label }">
        <slot :name="label.column.prop + 'Label'">{{ label.column.name }}</slot>
      </template>
      <template #value="{ value }">
        <slot :name="value.column.prop + 'Value'">
          <format-value-render :column="value.column" :record="value.record"></format-value-render>
        </slot>
      </template>
    </a-descriptions>
    <slot></slot>
  </a-space>
</template>
<script setup lang="ts">
import { Space as ASpace, Descriptions as ADescriptions } from '@arco-design/web-vue'
import { computed, onMounted, ref, withDefaults } from 'vue'
import { filterDisplay } from '../../util/filter'
import FormatValueRender from '../_components/format-value-render/index.vue'

const props = withDefaults(
  defineProps<{
    option: any
    title?: string
    modelValue: any
    type?: string
    maxWidth?: number
  }>(),
  {
    type: '',
    maxWidth: 1080
  }
)
const clientWidth = ref(1080)
onMounted(() => {
  clientWidth.value = document.body.clientWidth
  let timer: any
  window.onresize = () => {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      clientWidth.value = document.body.clientWidth
      timer = undefined
    }, 200)
  }
})
const data = computed(() => {
  if (!props.option.columns) {
    return []
  }
  const arr: Array<any> = []
  props.option.columns.forEach((item: any) => {
    if (filterDisplay(props.type, item, props.modelValue)) {
      const column: any = {
        ...item,
        large: item.type === 'upload' ? true : undefined
      }
      arr.push({
        label: {
          column,
          record: props.modelValue
        },
        value: {
          column,
          record: props.modelValue
        }
      })
    }
  })
  return arr
})
</script>
<style scoped></style>
