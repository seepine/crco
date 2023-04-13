<template>
  <a-spin :loading="isLoading" class="crco-form-spin" :style="style">
    <div class="crco-form-spin-content">
      <a-form
        ref="formRef"
        :model="form"
        :layout="layout"
        :auto-label-width="myOption.autoLabelWidth || formWidth < 600"
        :label-align="myOption.labelAlign"
        :size="myOption.size"
      >
        <template v-if="isGroup">
          <template v-for="group in myOption.groups" :key="group.title">
            <div style="padding-bottom: 10px">
              <a-typography-title :heading="2" class="crco-form-group-title">
                {{ group.title }}</a-typography-title
              >
            </div>
            <c-row :wrap="true" :gutter="myOption.gutter" :justify="myOption.justify">
              <template v-for="column in group.columns">
                <c-col
                  v-if="filterDisplay(type, column, form)"
                  :key="column.prop"
                  :span="column.span || myOption.span"
                >
                  <a-form-item
                    v-bind="column"
                    :field="column.prop"
                    :label="column.name"
                    :rules="filterRules(type, column, form)"
                    :show-colon="column.showColon || myOption.showColon"
                    :no-style="column.noStyle || myOption.noStyle"
                    :hide-label="column.hideLabel || myOption.hideLabel"
                    :disabled="filterDisabled(column, form)"
                    :type="undefined"
                    :tooltip="undefined"
                  >
                    <template #label
                      >{{ column.name }}
                      <a-tooltip
                        style="max-width: 240px"
                        v-if="filterString(column.tooltip, form)"
                        :content="filterString(column.tooltip, form)"
                      >
                        <icon-info-circle />
                      </a-tooltip>
                    </template>
                    <slot :name="column.prop" :form="form">
                      <cl-form-item
                        :column="column"
                        :value="form"
                        :form-width="formWidth"
                        @change="handleChange"
                      ></cl-form-item>
                    </slot>
                  </a-form-item> </c-col
              ></template>
            </c-row>
          </template>
        </template>
        <template v-else>
          <template v-if="myOption.layout === 'inline'">
            <div
              class="crco-form-inline flex-row flex-wrap flex-1"
              :class="{
                ['justify-' + myOption.justify]: myOption.justify
              }"
            >
              <template v-for="column in myOption.columns">
                <a-form-item
                  v-if="filterDisplay(type, column, form)"
                  :key="column.prop"
                  v-bind="column"
                  :field="column.prop"
                  :label="column.name"
                  :rules="filterRules(type, column, form)"
                  :show-colon="column.showColon || myOption.showColon"
                  :no-style="column.noStyle || myOption.noStyle"
                  :hide-label="column.hideLabel || myOption.hideLabel"
                  :disabled="filterDisabled(column, form)"
                  :type="undefined"
                  :tooltip="undefined"
                >
                  <template #label
                    >{{ column.name }}
                    <a-tooltip
                      style="max-width: 240px"
                      v-if="filterString(column.tooltip, form)"
                      :content="filterString(column.tooltip, form)"
                    >
                      <icon-info-circle />
                    </a-tooltip>
                  </template>
                  <slot :name="column.prop" :form="form">
                    <cl-form-item
                      :column="column"
                      :value="form"
                      @change="handleChange"
                    ></cl-form-item>
                  </slot> </a-form-item
              ></template>
            </div>
          </template>
          <c-row v-else :wrap="true" :gutter="myOption.gutter" :justify="myOption.justify">
            <template v-for="column in myOption.columns">
              <c-col
                v-if="filterDisplay(type, column, form)"
                :key="column.prop"
                :span="column.span || myOption.span"
              >
                <a-form-item
                  v-bind="column"
                  :field="column.prop"
                  :label="column.name"
                  :rules="filterRules(type, column, form)"
                  :show-colon="column.showColon || myOption.showColon"
                  :no-style="column.noStyle || myOption.noStyle"
                  :hide-label="column.hideLabel || myOption.hideLabel"
                  :disabled="filterDisabled(column, form)"
                  :type="undefined"
                  :tooltip="undefined"
                >
                  <template #label
                    >{{ column.name }}
                    <a-tooltip
                      style="max-width: 240px"
                      v-if="filterString(column.tooltip, form)"
                      :content="filterString(column.tooltip, form)"
                    >
                      <icon-info-circle />
                    </a-tooltip>
                  </template>
                  <slot :name="column.prop" :form="form">
                    <cl-form-item
                      :column="column"
                      :value="form"
                      @change="handleChange"
                    ></cl-form-item>
                  </slot>
                </a-form-item> </c-col
            ></template>
          </c-row>
        </template>
        <a-form-item v-if="btnShow || $slots.btnLeft || $slots.btnRight">
          <div style="width: 100%" class="flex-row justify-end">
            <slot name="btnLeft"></slot>
            <a-button v-if="btnShow" type="primary" @click="handleSubmit" :long="btnLong">{{
              btnText
            }}</a-button>
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
  Spin as ASpin
} from '@arco-design/web-vue'
import { ref, withDefaults } from 'vue'
import { filterDisplay, filterDisabled, filterRules, filterString } from '../../util/filter'
import ClFormItem from './item'
import useElementResize from './element-resize'
import { FormOption, FormType } from '../../types/form'
import useBtn from './use-btn'
import CRow from '../row/index.vue'
import CCol from '../col/index.vue'
import useOption from './use-option'

const props = withDefaults(
  defineProps<{
    option: FormOption
    modelValue?: any
    type?: FormType
    style?: object | string
  }>(),
  {
    modelValue: {},
    type: undefined
  }
)

const emit = defineEmits<{
  (event: 'submit', data: any, done: Function): void
  (event: 'update:modelValue', data: any): void
}>()

const formRef = ref()
const { form, myOption, isGroup } = useOption({ props, emit }, props.type, props.option)
// @ts-ignore
const { layout, formWidth } = useElementResize(formRef, myOption.value)
const { btnShow, btnText, btnLong } = useBtn(myOption)

const isLoading = ref(false)

const handleChange = (val: any) => {
  setTimeout(() => {
    form.value = val
  })
}
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
  .arco-form-auto-label-width {
    .arco-form-item-label {
      padding-left: 4px;
    }
  }
  .full-width {
    width: 100%;
  }
  .crco-form-group-title {
    font-size: 16px;
    margin-top: 0;
    border-bottom: 1px solid var(--color-neutral-3);
    padding-bottom: 6px;
  }
}
</style>
