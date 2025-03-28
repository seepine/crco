<template>
  <a-space direction="vertical" fill size="medium">
    <div class="flex-row justify-between align-center">
      <a-typography-title :heading="6" style="margin: 0; padding-top: 8px">新增</a-typography-title>
      <a-space>
        <a-checkbox
          v-if="option.showAddContinue"
          v-model="addContinue"
          style="margin-right: 8px"
          size="mini"
        >
          <div
            style="
              color: var(--color-text-2);
              font-size: 13px;
              margin-left: -2px;
              user-select: none;
            "
          >
            连续新增
          </div>
        </a-checkbox>
        <a-button @click="handleCancel">取消</a-button>
        <c-button type="primary" @click="handleSave">提交</c-button>
      </a-space>
    </div>
    <c-form
      v-if="show"
      ref="formRef"
      v-model="addForm"
      :option="{ ...option, btn: false }"
      type="add"
    ></c-form>
  </a-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { ListFormOption } from '../../types/list-form'
import CForm from '../form/index.vue'
import { deepClone } from '../../util/util'

const props = defineProps<{
  option: ListFormOption
  requestAdd: Function
  isAdd: boolean
  form: any
}>()
const emit = defineEmits<{
  (event: 'reload'): void
  (event: 'reload', unselect: boolean): void
  (event: 'update:isAdd', val: boolean): void
  (event: 'update:form', val: any): void
}>()

const show = ref(true)
const addForm = ref(deepClone(props.form))
const formBack = ref(deepClone(props.form))
const formRef = ref()
const addContinue = ref(false)

const handleSave = (done: Function) => {
  formRef.value
    .submit()
    .then((res: any) => {
      props.requestAdd(res.form, (err = true) => {
        res.done()
        done()
        if (err !== true) {
          return
        }
        if (addContinue.value) {
          Message.success('新增成功')
          emit('reload', false)
          addForm.value = deepClone(formBack.value)
          show.value = false
          setTimeout(() => {
            show.value = true
          }, 0)
        } else {
          emit('update:isAdd', false)
          emit('update:form', {})
          emit('reload', true)
          Message.success('新增成功')
        }
      })
    })
    .catch(() => {
      done()
    })
}
const handleCancel = () => {
  emit('update:isAdd', false)
}
</script>
