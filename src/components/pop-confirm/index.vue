<template>
  <pop-confirm
    v-bind="$attrs"
    :content-class="{ 'crco-pop-confirm-icon-hide': isUndefined(props.type) }"
    :type="type"
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
  </pop-confirm>
</template>

<script setup lang="ts">
import { Popconfirm as PopConfirm } from '@arco-design/web-vue'
import { withDefaults } from 'vue'
import { isUndefined } from '../../util/is'

const props = withDefaults(
  defineProps<{
    type?: 'error' | 'success' | 'warning' | 'info'
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
  (event: 'ok', done: (closed?: boolean) => void): void
}>()

const handleOnBeforeOk = (done: (closed: boolean) => void) => {
  emit('ok', (flag: any = true) => {
    done(flag === true)
  })
}
</script>
<style lang="scss">
.crco-pop-confirm-icon-hide {
  .arco-popconfirm-icon {
    display: none !important;
  }
}
</style>
