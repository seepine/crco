import { computed, ref, watch } from 'vue'
import { isArray, isNull, isUndefined } from '../../util/is'
import { FormOption, FormType } from '../../types/form'
import { copyPropertiesNotEmpty, deepClone } from '../../util/util'
import { getOption } from '../../util/global-config'

export default ({ props, emit }: any, type: FormType, option: FormOption) => {
  const myOption = ref<FormOption>({
    btn: {
      text: '提交',
      display: true,
      long: false
    },
    ...getOption().form,
    groups: [],
    columns: []
  })

  const form = ref<any>({})
  const formBack = ref<any>({})

  let hasModelValue = true
  let init = false
  watch(
    () => props.modelValue,
    (val) => {
      const hasVal = !isUndefined(val) && !isNull(val)
      if (hasVal) {
        form.value = val
      } else if (!hasVal && !init) {
        init = true
        hasModelValue = false
        form.value = {}
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  watch(
    () => form.value,
    (val) => {
      if (hasModelValue) {
        emit('update:modelValue', val || {})
      }
    },
    {
      deep: true
    }
  )
  watch(
    () => option,
    () => {
      copyPropertiesNotEmpty(option, myOption.value)
      if (isArray(myOption.value.columns)) {
        for (let i = 0; i < myOption.value.columns!.length; i += 1) {
          // 初始化表单数据
          if (
            !isUndefined(myOption.value.columns[i].value) &&
            isUndefined(form.value[myOption.value.columns[i].prop])
          ) {
            form.value[myOption.value.columns[i].prop] = myOption.value.columns[i].value
          }
          // 将所有组件fallbackOption默认为false
          if (isUndefined(myOption.value.columns[i].fallbackOption)) {
            myOption.value.columns[i].fallbackOption = false
          }
          // 转化type,如将addRules覆盖给rules，或multiple:true被searchMultiple:false覆盖
          if (!isUndefined(type)) {
            Object.keys(myOption.value.columns[i]).forEach((key: any) => {
              try {
                if (key.length > type.length && key.startsWith(type)) {
                  let resetKey = key.substring(type.length, key.length)
                  resetKey =
                    resetKey.substring(0, 1).toLowerCase() + resetKey.substring(1, resetKey.length)
                  // @ts-ignore
                  myOption.value.columns[i][resetKey] = myOption.value.columns[i][key]
                  // @ts-ignore
                  // delete myOption.value.columns[i][key]
                }
                // eslint-disable-next-line no-empty
              } catch (e) {}
            })
          }
        }

        formBack.value = deepClone(form.value)
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  const isGroup = computed(() => myOption.value.groups!.length > 0)
  return {
    form,
    formBack,
    myOption,
    isGroup
  }
}
