<template>
  <div style="max-width: 1080px" v-if="selectData">
    <a-space direction="vertical" fill size="medium">
      <div class="flex-row justify-between align-center">
        <a-typography-title :heading="6" style="margin: 0; padding-top: 8px">{{
          isEdit ? '编辑' : '详情'
        }}</a-typography-title>

        <a-space v-if="permissions.editBtn || permissions.delBtn">
          <pop-confirm
            content="请确认是否删除"
            :okButtonProps="{ status: 'danger' }"
            @ok="handleRemove"
          >
            <a-button status="danger" v-if="permissions.delBtn && !isEdit && delDisplay"
              >删除</a-button
            >
          </pop-confirm>

          <a-button
            type="primary"
            v-if="permissions.editBtn && !isEdit && editDisplay"
            @click="handleEdit"
            >编辑</a-button
          >
          <a-button v-if="permissions.editBtn && isEdit" @click="isEdit = false">取消</a-button>
          <c-button type="primary" v-if="permissions.editBtn && isEdit" @click="handleSave"
            >保存</c-button
          >
        </a-space>
      </div>

      <c-form
        ref="formRef"
        v-model="form"
        :option="{ ...option, btn: false }"
        v-if="isEdit"
        type="edit"
      ></c-form>
      <c-descriptions v-else v-model="backForm" type="view" :option="option"></c-descriptions
    ></a-space>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import isEqual from 'lodash/isEqual'
import { Message } from '@arco-design/web-vue'
import { copyPropertiesNotEmpty, deepClone, runCallback } from '../../util/util'
import { ListFormOption } from '../../types/list-form'
import CDescriptions from '../descriptions/index.vue'
import CForm from '../form/index.vue'
import PopConfirm from '../pop-confirm/index.vue'
import { isArray, isUndefined } from '../../util/is'
import useBtn from '../_hooks/use-btn'
import usePermission from '../_hooks/use-premission'

const props = defineProps<{
  selectData: any
  permissions: any
  option: ListFormOption
  requestAdd: Function
  requestEdit: Function
  requestDel: Function
}>()
const emit = defineEmits<{
  (event: 'reload'): void
  (event: 'reload', unselect: boolean): void
  (event: 'reset', val: any): void
  (event: 'update:isAdd', val: boolean): void
}>()

const form = ref<any>({})
const formRef = ref()
const backForm = ref({})
const isEdit = ref(false)
watch(
  () => props.selectData,
  () => {
    if (isUndefined(props.selectData)) {
      backForm.value = {}
      form.value = {}
    } else {
      backForm.value = deepClone(props.selectData)
      form.value = deepClone(backForm.value)
    }
  },
  {
    deep: true,
    immediate: true
  }
)
const myOption = ref<any>({})
watch(
  () => props.option,
  () => {
    copyPropertiesNotEmpty(props.option, myOption.value)
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
      }
    }
  },
  {
    deep: true,
    immediate: true
  }
)
const { myPermissions } = usePermission(myOption)

const { editDisplay, delDisplay } = useBtn(myOption, backForm, myPermissions)

const handleEdit = () => {
  if (isEdit.value) {
    return
  }
  if (props.option.editBtn !== false && !isUndefined(props.option.editBtn?.onBefore)) {
    runCallback(props.option.editBtn?.onBefore, props.selectData)
      .then((res) => {
        form.value = res || {}
        isEdit.value = true
      })
      .catch(() => {})
  } else {
    isEdit.value = true
  }
}

const handleRemove = (done: Function) => {
  props.requestDel(props.selectData, (err: any) => {
    if (err) {
      done(false)
    } else {
      done()
      emit('reload', true)
      Message.success('已删除')
    }
  })
}

const handleSave = (done: Function) => {
  formRef.value
    .submit()
    .then((res: any) => {
      if (isEqual(res.form, backForm.value)) {
        res.done()
        done()
        isEdit.value = false
      } else {
        props.requestEdit(res.form, (err: any) => {
          if (err) {
            res.done()
            done()
          } else {
            backForm.value = deepClone(res.form)
            res.done()
            done()
            isEdit.value = false
            emit('reset', backForm.value)
            Message.success('保存成功')
          }
        })
      }
    })
    .catch(() => {
      done()
    })
}
</script>
