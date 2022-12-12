import { computed, ref, watch } from 'vue'
import { isArray, isUndefined } from '../../util/is'
import { runDicData } from '../../util/dic-data'
import { runCallback } from '../../util/util'

/**
 * 供select/radio等使用
 */
export default (props: any, emit: any) => {
  const loading = ref(false)
  const dicData = ref<any[]>([])

  const myOption = computed<any>(() => {
    return {
      ...props.option,
      onChange: undefined
    }
  })

  const fieldNames = computed<{ label: string; value: string; disabled: string }>(() => {
    const fields = (myOption.value.props as any) || {}
    return {
      label: fields.label || 'label',
      value: fields.value || 'value',
      disabled: fields.disabled || 'disabled'
    }
  })

  const onChange = (val: any) => {
    emit('update:modelValue', val === '' ? undefined : val)
    let find: any
    if (isArray(val)) {
      find = dicData.value.filter((item: any) => {
        return (
          val.findIndex((v: any) => {
            return v === item || v === item[fieldNames.value.value]
          }) >= 0
        )
      })
    } else {
      find = dicData.value.find((item: any) => {
        return val === item || val === item[fieldNames.value.value]
      })
    }
    emit('change', val === '' ? undefined : val, find)
    if (!isUndefined(props.option.onChange)) {
      runCallback(props.option.onChange, find, props.form)
        .then((res) => {
          emit('update-form', res)
        })
        .catch(() => {})
    }
  }

  watch(
    myOption,
    () => {
      loading.value = true
      runDicData(props.option)
        .then((res) => {
          dicData.value = res
          loading.value = false
          // 设置默认值
          if (res.length > 0) {
            if (props.option.defaultSelectAll && props.option.multiple) {
              onChange(
                res.map((item: any) => {
                  return item[fieldNames.value.value]
                })
              )
            } else if (props.option.defaultSelect) {
              onChange(
                props.option.multiple
                  ? [res[0][fieldNames.value.value]]
                  : res[0][fieldNames.value.value]
              )
            }
          }
        })
        .catch(() => {
          loading.value = false
        })
    },
    {
      deep: true,
      immediate: true
    }
  )

  const myValue = computed({
    get: () => {
      return props.modelValue
    },
    set: (val) => {
      onChange(val)
    }
  })
  return {
    myValue,
    loading,
    dicData,
    myOption,
    fieldNames
  }
}
