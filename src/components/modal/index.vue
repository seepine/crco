<template>
  <a-modal v-bind="$attrs" v-model:visible="visible">
    <slot></slot>
    <slot v-if="$slots['title']" name="title"> </slot>
    <slot v-if="$slots['footer']" name="footer"> </slot>
  </a-modal>
</template>

<script setup lang="ts">
import { Modal as AModal } from '@arco-design/web-vue'
import { computed, watchEffect, withDefaults } from 'vue'
import '../../util/popstate'
import usePopstate from '../_hooks/use-popstate'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
  }>(),
  {
    modelValue: false
  }
)
const emit = defineEmits<{
  (event: 'update:modelValue', data: boolean): void
}>()
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

/**
 * 兼容物理返回
 */
const popState = usePopstate(() => {
  if (visible.value) {
    emit('update:modelValue', false)
  }
})
watchEffect(() => {
  if (visible.value) {
    popState.out()
  } else {
    popState.in()
  }
})
/**
 * 物理返回end
 */
</script>
<style lang="scss"></style>
