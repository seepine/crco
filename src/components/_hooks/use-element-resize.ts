import { onMounted, onUnmounted, ref } from 'vue'
import elementResizeDetectorMaker from 'element-resize-detector'
import type { Ref } from 'vue'

export default (divRef: Ref<any>) => {
  const divWidth = ref(1080)
  let elementResizeMaker: any
  let el: HTMLElement

  onMounted(() => {
    elementResizeMaker = elementResizeDetectorMaker()
    divWidth.value = divRef.value.clientWidth
    elementResizeMaker.listenTo(divRef.value, (element: HTMLElement) => {
      divWidth.value = element.clientWidth
    })
  })

  onUnmounted(() => {
    if (elementResizeMaker) {
      elementResizeMaker.removeAllListeners(el || {})
    }
  })

  return {
    divWidth
  }
}
