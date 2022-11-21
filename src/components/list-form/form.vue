<template>
  <div style="max-width: 1080px" v-show="selectData || isAdd">
    <a-space direction="vertical" fill size="medium">
      <div
        v-if="permissions.editBtn || permissions.delBtn || permissions.addBtn"
        class="flex-row justify-between align-center"
      >
        <a-typography-title :heading="6" style="margin: 0; padding-top: 8px">{{
          isAdd ? '新增' : isEdit ? '编辑' : '详情'
        }}</a-typography-title>

        <a-space>
          <template v-if="isAdd"
            ><a-button @click="isAdd = false">取消</a-button>
            <c-button type="primary" @click="handleSave">提交</c-button></template
          >
          <template v-else>
            <pop-confirm
              content="请确认是否删除"
              :okButtonProps="{ status: 'danger' }"
              @ok="handleRemove"
            >
              <a-button status="danger" v-if="permissions.delBtn && !isEdit">删除</a-button>
            </pop-confirm>

            <a-button type="primary" v-if="permissions.editBtn && !isEdit" @click="handleEdit"
              >编辑</a-button
            >
            <a-button v-if="permissions.editBtn && isEdit" @click="isEdit = false">取消</a-button>
            <c-button type="primary" v-if="permissions.editBtn && isEdit" @click="handleSave"
              >保存</c-button
            ></template
          >
        </a-space>
      </div>
      <c-form
        ref="formRef"
        v-model="addForm"
        :option="{ ...option, btn: false }"
        v-if="isAdd"
        type="add"
      ></c-form>
      <c-form
        ref="formRef"
        v-model="form"
        :option="{ ...option, btn: false }"
        v-else-if="isEdit"
        type="edit"
      ></c-form>
      <c-descriptions v-else v-model="backForm" type="view" :option="option"></c-descriptions
    ></a-space>
  </div>
  <a-result v-show="!selectData && !isAdd" title="未选择" style="margin: 100px 0">
    <template #subtitle>
      <div style="margin-top: 20px">
        请先选择要查看的数据
        <div v-if="permissions.addBtn">或点击下方按钮新增</div>
      </div></template
    >
    <template #extra v-if="permissions.addBtn">
      <a-space>
        <a-button type="primary" @click="handleAdd">新增</a-button>
      </a-space>
    </template>
  </a-result>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import isEqual from 'lodash/isEqual'
import { Message } from '@arco-design/web-vue'
import { deepClone, runCallback } from '../../util/util'
import { ListFormOption } from '../../types/list-form'
import CDescriptions from '../descriptions/index.vue'
import CForm from '../form/index.vue'
import PopConfirm from '../pop-confirm/index.vue'
import { isUndefined } from '../../util/is'

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
}>()

const form = ref({})
const addForm = ref({})
const formRef = ref()
const backForm = ref({})
const isAdd = ref(false)
const isEdit = ref(false)
watch(
  () => props.selectData,
  () => {
    if (isAdd.value) {
      isAdd.value = false
      isEdit.value = false
    }
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
      if (isAdd.value) {
        props.requestAdd(res.form, (err: any) => {
          if (err) {
            res.done()
            done()
          } else {
            res.done()
            done()
            isAdd.value = false
            emit('reload')
            Message.success('新增成功')
          }
        })
      } else if (isEqual(res.form, backForm.value)) {
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

const handleAdd = () => {
  if (isAdd.value) {
    return
  }
  addForm.value = {}
  if (props.option.addBtn !== false && !isUndefined(props.option.addBtn?.onBefore)) {
    runCallback(props.option.addBtn?.onBefore, props.selectData)
      .then((res) => {
        addForm.value = res || {}
        isAdd.value = true
        isEdit.value = false
      })
      .catch(() => {})
  } else {
    isAdd.value = true
    isEdit.value = false
  }
}
defineExpose({
  add: () => {
    handleAdd()
  }
})
</script>
