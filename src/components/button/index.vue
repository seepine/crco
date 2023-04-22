<template>
  <a-button
    v-bind="$attrs"
    @click.stop.prevent="handleClick"
    :loading="showLoading ? computedLoading : false"
    :disabled="isCountdown || disabled || computedLoading"
    :style="width ? { width: width > 0 ? `${width}px` : width } : ''"
  >
    <template #icon v-if="$slots.icon">
      <slot name="icon"></slot>
    </template>
    <template #default v-if="$slots.default"
      ><template v-if="isCountdown">
        {{ countdownTextComputed }}
      </template>
      <slot v-else></slot
    ></template>
  </a-button>
</template>
<script setup lang="ts">
import { computed, ref, withDefaults } from 'vue'
import { Button as AButton } from '@arco-design/web-vue'
import { isNumber } from '../../util/is'
import useCountdown from './use-countdown'
import { Done } from '../../types'

const props = withDefaults(
  defineProps<{
    loading?: boolean
    showLoading?: boolean
    disabled?: boolean
    width?: string | number
    // click延迟done时间，单位ms
    delay?: string | number
    // 倒计时时间，单位s
    countdownTime?: string | number
    // 倒计时文本，支持${time}
    countdownText?: string | Function
    // 是否同步触发点击事件
    sync?: boolean
    stop?: boolean
    showLoadingIcon?: boolean
  }>(),
  {
    loading: false,
    showLoading: true,
    disabled: false,
    delay: 400,
    sync: false,
    stop: true,
    showLoadingIcon: true
  }
)

const isLoading = ref(false)
const computedLoading = computed<boolean>(() => {
  if (props.showLoadingIcon) {
    return props.loading || isLoading.value
  }
  return false
})
const isCountdown = ref(false)
const emit = defineEmits<{
  (event: 'click'): void
  (event: 'click', done: Done): void
}>()
const { hasCountdown, countdownTextComputed, startCountdown } = useCountdown(
  props.countdownTime,
  props.countdownText,
  () => {
    isCountdown.value = false
  }
)
const handleClick = (event: any) => {
  if (props.stop) {
    event.stopPropagation()
  }
  if (props.sync) {
    emit('click')
    return
  }
  if (isLoading.value) {
    return
  }
  isLoading.value = true
  emit('click', (flag?: boolean) => {
    if (hasCountdown.value) {
      isLoading.value = false
      if (flag !== false) {
        isCountdown.value = true
        startCountdown()
      }
    } else {
      setTimeout(
        () => {
          isLoading.value = false
        },
        isNumber(props.delay) ? props.delay : parseInt(props.delay, 10)
      )
    }
  })
}
</script>
