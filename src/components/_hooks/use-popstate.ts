import { onMounted, onUnmounted } from 'vue'
import emitter from '../../util/emitter'

export default (triggerBack: Function) => {
  /** ==========================     处理物理返回逻辑     ================== */
  const code = Math.round(Math.random() * 100000000)
  let topCode = code
  const handleTriggerBack = () => {
    if (topCode === code) {
      triggerBack()
    }
  }
  const setTopCode = (data: any) => {
    topCode = data
  }
  onMounted(() => {
    emitter.on('top-code', setTopCode)
    window.addEventListener('popstate', handleTriggerBack)
  })
  onUnmounted(() => {
    emitter.off('top-code', setTopCode)
    window.removeEventListener('popstate', handleTriggerBack)
  })
  const back = () => {
    window.history.back()
  }
  /** ==========================     处理物理返回逻辑 end    ================== */
  return {
    back,
    in: () => {
      emitter.emit('popstate-stack-in', code)
    },
    out: () => {
      emitter.emit('popstate-stack-out', code)
    }
  }
}
