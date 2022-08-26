<template>
  <template v-if="props.column.type === 'icon'">
    <i :class="props.record[props.column.type]" aria-hidden="true"></i>
  </template>
  <template v-else-if="hasFormatValue">
    <render-function :render-func="props.column.formatValue" :record="record"></render-function>
  </template>
  <template v-else-if="props.column.type === 'upload'">
    <my-upload :option="props.column" :readonly="true" v-model="modelValue"></my-upload>
  </template>
  <template v-else> {{ filterValue(record, column) }} </template>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { isFunction } from '../../../util/is'
import { filterValue } from '../../../util/data-handle'
import RenderFunction from '../render'
import MyUpload from '../../upload/index.vue'

const props = defineProps<{
  column: any
  record: any
}>()
const modelValue = computed(() => {
  return props.record[props.column.prop]
})
const hasFormatValue = computed(() => isFunction(props.column.formatValue))
</script>
