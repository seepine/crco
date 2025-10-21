<template>
  <div ref="contentRef" class="change-column-btn-content">
    <div :data-swapy-slot="column.prop" v-for="(column, idx) in columns" :key="column.prop || idx">
      <div :data-swapy-item="column.prop">
        <div class="change-column-btn-content-item">
          <a-checkbox :model-value="displayObj[column.prop]" @change="handleChange(column.prop)">
            {{ column.name }}</a-checkbox
          >
          <icon-drag-arrow />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Checkbox as ACheckbox } from '@arco-design/web-vue'
import { IconDragArrow } from '@arco-design/web-vue/es/icon'
import { createSwapy, Swapy } from 'swapy'
import { TableColumn } from '../../types'
import { deepClone } from '../../util/util'

const props = defineProps<{
  value: TableColumn[]
}>()
const emit = defineEmits<{
  (event: 'change', data: TableColumn[]): void
}>()

const columns = ref<TableColumn[]>(deepClone(props.value || []))
const displayObj = ref<{
  [x: string]: boolean
}>({})
columns.value.forEach((item) => {
  displayObj.value[item.prop] = true
})
// watch(
//   () => props.value,
//   () => {
//     columns.value = deepClone(props.value || [])
//     columns.value.forEach((item) => {
//       if (displayObj.value[item.prop] === undefined) {
//         displayObj.value[item.prop] = true
//       }
//     })
//   },
//   { immediate: true, deep: true }
// )

const handleChange = (prop: string) => {
  displayObj.value[prop] = !displayObj.value[prop]
  const newColumns: TableColumn[] = deepClone(props.value)
  newColumns.forEach((item) => {
    if (item.prop === prop) {
      // eslint-disable-next-line no-param-reassign
      item.display = displayObj.value[prop]
    }
  })
  emit('change', deepClone(newColumns))
}
const contentRef = ref<HTMLElement>()
const swapyInstance = ref<Swapy>()
onMounted(() => {
  swapyInstance.value = createSwapy(contentRef.value!, {
    autoScrollOnDrag: true
  })
  swapyInstance.value.onSwapEnd((event) => {
    if (!event.hasChanged) {
      return
    }
    const newSorts = event.slotItemMap.asArray.map((item) => item.item)
    const newColumns: TableColumn[] = []
    newSorts.forEach((prop) => {
      const column = props.value.find((col) => col.prop === prop)
      if (column) {
        newColumns.push(column)
      } else {
        // eslint-disable-next-line no-console
        console.warn(`Column with prop "${prop}" not found.`)
      }
    })
    emit('change', deepClone(newColumns))
  })
})

onUnmounted(() => {
  swapyInstance.value?.destroy()
})
</script>
<style lang="scss">
.change-column-btn-content {
  min-width: 120px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  user-select: none;
  padding-right: 12px;
}
.change-column-btn-content-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  height: 24px;
}
</style>
