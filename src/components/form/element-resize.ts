import { computed, onMounted, onUnmounted, ref } from 'vue'
import elementResizeDetectorMaker from 'element-resize-detector'
import type { Ref } from '@vue/reactivity'
import { isArray, isUndefined } from '../../util/is'
import { FormOption } from '../../types/form'

export default (divRef: Ref, option: FormOption) => {
  const formWidth = ref(1080)
  let elementResizeMaker: any
  let el: HTMLElement

  onMounted(() => {
    el = divRef.value.$el
    elementResizeMaker = elementResizeDetectorMaker()
    formWidth.value = el.clientWidth
    elementResizeMaker.listenTo(el, (element: HTMLElement) => {
      formWidth.value = element.clientWidth
    })
  })

  onUnmounted(() => {
    if (elementResizeMaker) {
      elementResizeMaker.removeAllListeners(el)
    }
  })

  const autoLabelWidth = () => {
    let labelWordsNum = 0
    if (isArray(option.columns)) {
      option.columns.forEach((column) => {
        labelWordsNum = column.name.length > labelWordsNum ? column.name.length : labelWordsNum
      })
    }
    return labelWordsNum * 10
  }

  const labelWidth = computed(() => {
    const width = autoLabelWidth()
    return width > 0 ? width : 100
  })

  const layout = computed<'horizontal' | 'vertical' | 'inline'>(() => {
    if (option.hideLabel) {
      if (formWidth.value < 394) {
        return 'vertical'
      }
    } else if (formWidth.value - labelWidth.value <= 300) {
      return 'vertical'
    }
    return isUndefined(option.layout) ? 'horizontal' : option.layout
  })

  return {
    formWidth,
    labelWidth,
    layout
  }
}
