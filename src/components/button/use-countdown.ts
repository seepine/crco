import { computed, ref } from 'vue'
import { isFunction, isNumber, isUndefined } from '../../util/is'

export default (
  countdownTime?: string | number,
  countdownText?: string | Function,
  endCountdown = () => {}
) => {
  const countdownSurplus = ref(0)
  const countdownTimeComputed = computed(() => {
    if (isUndefined(countdownTime)) {
      return 0
    }
    return isNumber(countdownTime) ? countdownTime : parseInt(countdownTime, 10)
  })
  const hasCountdown = computed(() => countdownTimeComputed.value > 0)
  const countdownTextComputed = computed(() => {
    if (countdownSurplus.value === 0) {
      return ''
    }
    if (isUndefined(countdownText)) {
      return `还有${countdownSurplus.value}秒`
    }
    if (isFunction(countdownText)) {
      return countdownText(countdownSurplus.value)
    }
    if (countdownText.toString().indexOf('$time') >= 0) {
      return countdownText.toString().replace('$time', countdownSurplus.value.toString(10))
    }
    return countdownText
  })

  const handleCountDown = () => {
    setTimeout(() => {
      countdownSurplus.value -= 1
      if (countdownSurplus.value === 0) {
        endCountdown()
      } else {
        handleCountDown()
      }
    }, 1000)
  }
  const startCountdown = () => {
    if (countdownTimeComputed.value > 0) {
      countdownSurplus.value = countdownTimeComputed.value
      handleCountDown()
      return true
    }
    return false
  }

  return {
    startCountdown,
    hasCountdown,
    countdownTextComputed
  }
}
