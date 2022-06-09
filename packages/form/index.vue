<template>
  <a-spin :loading="isLoading" class="crco-form-spin" :style="style">
    <div class="crco-form-spin-content">
      <a-form
        ref="formRef"
        :model="form"
        :layout="layoutComputed"
        v-if="myOption.columns.length > 0"
      >
        <a-row
          v-if="layoutComputed !== 'inline'"
          :gutter="{ xs: 4, sm: 6, md: 12, lg: 24, xl: 36, xxl: 64 }"
        >
          <template v-for="column in myOption.columns" :key="column.prop">
            <a-col
              v-if="filterDisplay(type, column, form)"
              :xxl="{ span: filterSpan(column, myOption, form, 'xxl', 8) }"
              :xl="{ span: filterSpan(column, myOption, form, 'xl', 12) }"
              :lg="{ span: filterSpan(column, myOption, form, 'lg', 12) }"
              :md="{ span: filterSpan(column, myOption, form, 'md', 24) }"
              :sm="{ span: filterSpan(column, myOption, form, 'sm', 24) }"
              :xs="{ span: filterSpan(column, myOption, form, 'xs', 24) }"
              :order="column.order"
            >
              <a-form-item
                v-bind="column"
                :field="column.prop"
                :label="column.name"
                :rules="filterRules(type, column, form)"
                :show-colon="myOption.showColon"
                :no-style="myOption.noStyle"
                :hide-label="myOption.hideLabel"
                :disabled="filterDisabled(column, form)"
                :type="undefined"
              >
                <slot :name="column.prop" :form="form">
                  <cl-form-item
                    :column="column"
                    :value="form"
                    @change="handleChange"
                  ></cl-form-item>
                </slot>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        <template v-else>
          <template v-for="column in myOption.columns">
            <a-form-item
              v-if="filterDisplay(type, column, form)"
              :key="column.prop"
              v-bind="column"
              :field="column.prop"
              :label="column.name"
              :rules="filterRules(type, column, form)"
              :show-colon="myOption.showColon"
              :no-style="myOption.noStyle"
              :hide-label="myOption.hideLabel"
              :disabled="filterDisabled(column, form)"
              :type="undefined"
            >
              <slot :name="column.prop">
                <cl-form-item :column="column" :value="form" @change="handleChange"></cl-form-item>
              </slot>
            </a-form-item>
          </template>
        </template>

        <a-form-item
          v-if="(isObject(myOption.btn) && myOption.btn.text) || $slots.btnLeft || $slots.btnRight"
        >
          <div style="width: 100%" class="flex-row justify-end">
            <slot name="btnLeft"></slot>
            <a-button
              v-if="isObject(myOption.btn) && myOption.btn.text"
              type="primary"
              @click="handleSubmit"
              :long="myOption.btn.long"
              >{{ btnTextComputed }}</a-button
            >
            <slot name="btnRight"></slot>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </a-spin>
</template>
<script setup lang="ts">
import {
  Form as AForm,
  FormItem as AFormItem,
  Button as AButton,
  Spin as ASpin,
  Row as ARow,
  Col as ACol
} from '@arco-design/web-vue'
import { ref, withDefaults, watch, defineExpose, computed } from 'vue'
import { isUndefined, isObject, isBlank } from '../util/is'
import { filterDisplay, filterDisabled, filterRules, filterSpan } from '../util/filter'
import beanUtil from '../util/bean-util'
import ClFormItem from './item.vue'

interface Btn {
  long: boolean
  text: string
}
type Option = {
  btn?: boolean | Btn
  columns: Array<any>
  layout?: 'horizontal' | 'vertical' | 'inline' | undefined
  showColon?: boolean
  noStyle?: any
  hideLabel?: boolean
}
const props = withDefaults(
  defineProps<{
    option?: Option
    modelValue?: any
    type?: string
    style?: object | string
  }>(),
  {
    modelValue: undefined,
    type: ''
  }
)
const layoutComputed = computed(() => {
  if (props.option?.layout) {
    return props.option?.layout
  }
  if (props.type === 'search') {
    return 'inline'
  }
  return 'vertical'
})
const emit = defineEmits<{
  (event: 'submit', p_data: any, p_done: Function): void
  (event: 'update:modelValue', p_data: any): void
}>()

const isLoading = ref(false)

const formRef = ref()
// 设置option相关
const myOption = ref<Option>({
  btn: {
    long: false,
    text: '提交'
  },
  layout: 'vertical',
  columns: []
})
const form = ref<any>({})
const btnTextComputed = computed(() => {
  if (isObject(myOption.value.btn) && myOption.value.btn.text !== '提交') {
    return myOption.value.btn.text
  }
  if (props.type === 'search') {
    return '搜索'
  }
  return '提交'
})
let hasModelValue = true
let init = false
watch(
  () => props.modelValue,
  (val) => {
    console.log('充值')

    form.value = val
    if (isUndefined(val) && !init) {
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
  () => {
    if (hasModelValue) {
      emit('update:modelValue', form.value)
    }
  },
  {
    deep: true
  }
)
const handleChange = (val: any) => {
  form.value = val
}
watch(
  () => props.option,
  () => {
    beanUtil.copyPropertiesNotEmpty(props.option, myOption.value)
    for (let i = 0; i < myOption.value.columns.length; i += 1) {
      // 初始化表单数据
      if (
        !isUndefined(myOption.value.columns[i].value) &&
        isUndefined(form.value[myOption.value.columns[i].prop]) &&
        props.type !== 'search'
      ) {
        form.value[myOption.value.columns[i].prop] = myOption.value.columns[i].value
      }
      // 转化type,如将addRules覆盖给rules，或multiple:true被searchMultiple:false覆盖
      if (!isBlank(props.type)) {
        Object.keys(myOption.value.columns[i]).forEach((key: any) => {
          try {
            if (key.length > props.type.length && key.startsWith(props.type)) {
              let resetKey = key.substring(props.type.length, key.length)
              resetKey =
                resetKey.substring(0, 1).toLowerCase() + resetKey.substring(1, resetKey.length)
              myOption.value.columns[i][resetKey] = myOption.value.columns[i][key]
              // delete myOption.value.columns[i][key]
            }
            // eslint-disable-next-line no-empty
          } catch (e) {}
        })
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)
// end
const handleSubmit = () => {
  formRef.value.validate().then((res: any) => {
    if (!res) {
      isLoading.value = true
      emit('submit', form.value, () => {
        setTimeout(() => {
          isLoading.value = false
        }, 200)
      })
    }
  })
}
const submit = () => {
  return new Promise((RES: any, REJ) => {
    formRef.value.validate().then((res: any) => {
      if (!res) {
        isLoading.value = true
        RES({
          form: form.value,
          done: () => {
            setTimeout(() => {
              isLoading.value = false
            }, 100)
          }
        })
      } else {
        REJ(res)
      }
    })
  })
}
defineExpose({
  submit
})
</script>
<style lang="scss">
body[arco-theme='dark'] {
  --color-spin-layer-bg: rgba(0, 0, 0, 0);
}
.arco-spin-mask {
  backdrop-filter: saturate(100%) blur(1px);
}
.crco-form-spin {
  width: 100%;
}
</style>
