<template>
  <a-popconfirm
    v-bind="$attrs"
    :content-class="{ 'crco-popconfirm-icon-hide': isUndefined(props.type) }"
    :ok-button-props="{
      ...okButtonProps,
      size: 'mini'
    }"
    :cancel-button-props="{
      ...cancelButtonProps,
      size: 'mini'
    }"
    :onBeforeOk="handleOnBeforeOk"
  >
    <slot></slot>
    <template #content v-if="$slots.content"> <slot name="content"> </slot></template>
  </a-popconfirm>
</template>

<script setup lang="ts">
import { Popconfirm as APopconfirm } from '@arco-design/web-vue'
import { withDefaults } from 'vue'
import { isUndefined } from '../util/is'

const props = withDefaults(
  defineProps<{
    type?: string
    okButtonProps?: object
    cancelButtonProps?: object
  }>(),
  {
    okButtonProps: () => {
      return { size: 'mini' }
    },
    cancelButtonProps: () => {
      return { size: 'mini' }
    }
  }
)
const emit = defineEmits<{
  (event: 'ok', p_done: (p_closed?: boolean) => void): void
}>()

const handleOnBeforeOk = (done: (p_closed: boolean) => void) => {
  emit('ok', (flag: any = true) => {
    done(flag === true)
  })
}
</script>
<style lang="scss">
.crco-popconfirm-icon-hide {
  .arco-popconfirm-icon {
    display: none !important;
  }
}
</style>
