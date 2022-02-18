<template>
  <a-modal v-bind="$attrs" v-model:visible="visible">
    <slot></slot>
    <slot v-if="$slots['title']" name="title"> </slot>
    <slot v-if="$slots['footer']" name="footer"> </slot>
  </a-modal>
</template>

<script setup lang="ts">
import { Modal as AModal } from '@arco-design/web-vue'
import { onMounted, onUnmounted, ref, watchEffect, withDefaults } from 'vue'
import emitter from '../util/emitter'
import '../util/popstate'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
  }>(),
  {
    modelValue: false
  }
)
const visible = ref(props.modelValue)

const code = Math.round(Math.random() * 100000000)
let topCode = code
const triggerBack = () => {
  if (topCode === code) {
    if (visible.value) {
      visible.value = false
    }
  }
}
watchEffect(() => {
  if (visible.value) {
    emitter.emit('popstate-stack-in', code)
  } else {
    emitter.emit('popstate-stack-out', code)
  }
})
const setTopCode = (data: any) => {
  topCode = data
}
onMounted(() => {
  emitter.on('top-code', setTopCode)
  window.addEventListener('popstate', triggerBack)
})
onUnmounted(() => {
  emitter.off('top-code', setTopCode)
  window.removeEventListener('popstate', triggerBack)
})
</script>
<style lang="scss"></style>
