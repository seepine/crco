<template>
  <a-button
    v-bind="$attrs"
    @click.stop.prevent="handleClick"
    :loading="loading || isLoading"
    :style="width ? { width: width > 0 ? `${width}px` : width } : ''"
  >
    <template #icon v-if="$slots.icon">
      <slot name="icon"></slot>
    </template>
    <slot></slot>
  </a-button>
</template>
<script setup lang="ts">
import { ref, withDefaults } from 'vue'
import { Button as AButton } from '@arco-design/web-vue'

withDefaults(
  defineProps<{
    loading?: boolean
    width?: string | number
  }>(),
  {
    loading: false
  }
)
const isLoading = ref(false)
const emit = defineEmits<{
  (event: 'click', p_done: Function): void
}>()
const handleClick = () => {
  isLoading.value = true
  emit('click', () => {
    setTimeout(() => {
      isLoading.value = false
    }, 100)
  })
}
</script>
