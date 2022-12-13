<template>
  <template v-if="index < 0">{{ nodeTitleArr[0] }}</template>
  <span v-else>
    {{ nodeTitleArr[0]
    }}<span style="color: rgb(var(--primary-5)); font-weight: bold"> {{ nodeTitleArr[1] }}</span
    >{{ nodeTitleArr[2] }}
  </span>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  searchKey: string
  itemData: any
  titleField: string
}>()

const getMatchIndex = (title: string) => {
  if (!props.searchKey) return -1
  return title.toLowerCase().indexOf(props.searchKey.toLowerCase())
}
const index = computed(() => getMatchIndex(props.itemData[props.titleField || 'title']))

const nodeTitleArr = computed<string[]>(() => {
  const title: string = props.itemData[props.titleField || 'title'] || ''
  if (index.value < 0) {
    return [title]
  }
  return [
    title.substring(0, index.value),
    title.substring(index.value, index.value + props.searchKey.length),
    title.substring(index.value + props.searchKey.length)
  ]
})
</script>
