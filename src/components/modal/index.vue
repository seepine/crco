<template>
  <a-modal v-bind="$attrs" v-model:visible="visible">
    <slot></slot>
    <slot v-if="$slots['title']" name="title"> </slot>
    <slot v-if="$slots['footer']" name="footer"> </slot>
  </a-modal>
</template>

<script setup lang="ts">
import { Modal as AModal } from '@arco-design/web-vue'
import { ref, watchEffect, withDefaults } from 'vue'
import usePopstate from '../_hooks/use-popstate'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
  }>(),
  {
    modelValue: false
  }
)

const visible = ref(props.modelValue)
/** ==========================     处理物理返回逻辑     ================== */
const popState = usePopstate(() => {
  if (visible.value) {
    visible.value = false
  }
})
watchEffect(() => {
  if (visible.value) {
    popState.in()
  } else {
    popState.out()
  }
})
/** ==========================     处理物理返回逻辑 end    ================== */
</script>
<style lang="scss"></style>
