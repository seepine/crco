import { Ref, ref, watch } from 'vue'
import { isObject, isUndefined } from '../../util/is'
import { FormOption } from '../../types/form'
import { runCallback } from '../../util/util'

export default (option: Ref<FormOption>) => {
  const btnText = ref('提交')
  const btnShow = ref(true)
  const btnLong = ref(false)
  watch(
    () => option.value.btn,
    () => {
      if (option.value.btn === false) {
        btnShow.value = false
      }
      if (isObject(option.value.btn)) {
        btnShow.value = false
        runCallback(option.value.btn.display).then((res) => {
          btnShow.value = res !== false
        })
        runCallback(option.value.btn.text).then((res) => {
          if (!isUndefined(res)) {
            btnText.value = `${res}`
          }
        })
        btnLong.value = option.value.btn.long === true
      }
    },
    {
      immediate: true
    }
  )
  return {
    btnText,
    btnShow,
    btnLong
  }
}
