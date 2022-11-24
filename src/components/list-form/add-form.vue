<template>
  <a-space direction="vertical" fill size="medium">
    <div class="flex-row justify-between align-center">
      <a-typography-title :heading="6" style="margin: 0; padding-top: 8px">新增</a-typography-title>

      <a-space>
        <a-button @click="handleCancel">取消</a-button>
        <c-button type="primary" @click="handleSave">提交</c-button>
      </a-space>
    </div>
    <c-form ref="formRef" v-model="addForm" :option="{ ...option, btn: false }" type="add"></c-form>
  </a-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { ListFormOption } from '../../types/list-form'
import CForm from '../form/index.vue'

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

const addForm = ref(props.form)
const formRef = ref()

const handleSave = (done: Function) => {
  formRef.value
    .submit()
    .then((res: any) => {
      props.requestAdd(res.form, (err: any) => {
        if (err) {
          res.done()
          done()
        } else {
          res.done()
          done()
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
