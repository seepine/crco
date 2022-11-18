import { onUnmounted, ref } from 'vue'

const stack: Array<number> = []
/**
 * 返回回调
 * @params triggerBack 返回回调
 */
export default (triggerBack: Function) => {
  const code = Math.round(Math.random() * 1000000000)
  const isIn = ref(false)
  const handleTriggerBack = () => {
    if (stack.length > 0) {
      if (stack[stack.length - 1] === code) {
        triggerBack()
      }
    }
  }
  const back = () => {
    window.history.back()
  }
  const out = () => {
    if (isIn.value) {
      const idx = stack.indexOf(code)
      if (idx >= 0) {
        stack.splice(stack.indexOf(code), 1)
      }
      window.removeEventListener('popstate', handleTriggerBack)
      isIn.value = false
    }
  }
  onUnmounted(() => {
    out()
  })
  return {
    back,
    in: () => {
      window.history.pushState(null, '', document.URL)
      window.addEventListener('popstate', handleTriggerBack)
      stack.push(code)
      isIn.value = true
    },
    out
  }
}
