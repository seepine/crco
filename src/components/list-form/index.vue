<template>
  <div class="crco-list-form">
    <c-row :gutter="20">
      <c-col :span="24"> <slot name="top"></slot></c-col>
    </c-row>

    <c-row :gutter="20">
      <c-col :span="{ xs: 24, sm: 8, md: 6, lg: 6, xl: 5, xxl: 4 }">
        <a-card class="crco-list-form-left">
          <div class="crco-list-form-left-search">
            <a-input
              class="flex-1"
              placeholder="搜索 ..."
              allow-clear
              @input="handleChange"
              @clear="handleChange('')"
            >
              <template #prefix>
                <icon-search />
              </template>
            </a-input>
            <a-button style="margin-left: 8px" v-if="addDisplay" type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
            </a-button>
          </div>
          <tree
            ref="treeRef"
            v-if="myOption.isTree"
            :option="myOption"
            :request-fetch="requestFetch"
            :params="params"
            @select="handleSelect"
          ></tree>
          <list
            v-else
            ref="listRef"
            :option="myOption"
            :request-fetch="requestFetch"
            :params="params"
            @select="handleSelect"
          ></list>
        </a-card>
      </c-col>
      <c-col :span="{ xs: 24, sm: 16, md: 18, lg: 18, xl: 19, xxl: 20 }">
        <my-add-form
          v-if="isAdd"
          v-model:form="addForm"
          v-model:is-add="isAdd"
          :option="myOption"
          :request-add="requestAdd"
          @reload="handleReload"
        ></my-add-form>
        <template v-else>
          <a-tabs
            v-if="myOption.tabsProps!.columns!.length > 0 && selectData"
            v-model:active-key="tabsActiveKey"
          >
            <a-tab-pane key="listFormTabBaseInfoKey" :title="myOption.tabsProps!.baseTitle">
              <my-form
                v-model:is-add="isAdd"
                ref="myFormRef"
                :option="myOption"
                :select-data="selectData"
                :permissions="myPermissions"
                :request-add="requestAdd"
                :request-edit="requestEdit"
                :request-del="requestDel"
                @reload="handleReload"
                @reset="handleReset"
              ></my-form
            ></a-tab-pane>
            <template v-for="item in myOption.tabsProps!.columns" :key="item.slotName">
              <a-tab-pane v-bind="item" :title="item.title" v-if="filterPermission(item)">
                <slot :name="item.slotName" :record="selectData"></slot>
              </a-tab-pane>
            </template>
          </a-tabs>
          <my-form
            v-else
            v-model:is-add="isAdd"
            ref="myFormRef"
            :option="myOption"
            :select-data="selectData"
            :permissions="myPermissions"
            :request-add="requestAdd"
            :request-edit="requestEdit"
            :request-del="requestDel"
            @reload="handleReload"
            @reset="handleReset"
          ></my-form>
        </template>

        <a-result v-show="!selectData && !isAdd" title="未选择" style="margin: 100px 0">
          <template #subtitle>
            <div style="margin-top: 20px">
              请先选择要查看的数据
              <div v-if="addDisplay">或点击下方按钮新增</div>
            </div></template
          >
          <template #extra v-if="addDisplay">
            <a-space>
              <a-button type="primary" @click="handleAdd">新增</a-button>
            </a-space>
          </template>
        </a-result>
      </c-col>
    </c-row>
  </div>
</template>
<script setup lang="ts">
import { ref, withDefaults, watch } from 'vue'
import { Card as ACard } from '@arco-design/web-vue'
import { ListFormOption } from '../../types/list-form'
import CRow from '../row/index.vue'
import CCol from '../col/index.vue'
import useCrud from '../_hooks/use-crud'
import useOption from './use-option'
import List from './list.vue'
import Tree from './tree.vue'
import usePermission from '../_hooks/use-premission'
import useSearch from './use-search'
import MyForm from './form.vue'
import MyAddForm from './add-form.vue'
import { isString, isUndefined } from '../../util/is'
import { runCallback } from '../../util/util'
import { tabsPaneProps } from '@/types/tabs'
import useBtn from '../_hooks/use-btn'

const props = withDefaults(
  defineProps<{
    option: ListFormOption
    params?: any
  }>(),
  {
    params: () => {}
  }
)

const emit = defineEmits<{
  (event: 'load', params: any, done: Function): void
  (event: 'add', data: any, done: Function): void
  (event: 'edit', data: any, done: Function): void
  (event: 'del', data: any, done: Function): void
}>()

const { myOption } = useOption(props.option)
const { requestFetch, requestAdd, requestEdit, requestDel } = useCrud(emit, myOption)
const { myPermissions } = usePermission(myOption)

const filterPermission = (item: tabsPaneProps) => {
  if (isString(item.permission)) {
    return myPermissions.value[item.permission]
  }
  return true
}

const isAdd = ref(false)
const selectData = ref<object | undefined>()
const tabsActiveKey = ref('listFormTabBaseInfoKey')
const handleSelect = (data: object) => {
  selectData.value = data
  isAdd.value = false
  if (myOption.value.tabsProps?.autoSwitchToBase) {
    tabsActiveKey.value = 'listFormTabBaseInfoKey'
  }
}

const listRef = ref()
const treeRef = ref()
const { handleChange } = useSearch((val) => {
  if (myOption.value.isTree) {
    treeRef.value.search(val)
  } else {
    listRef.value.search(val)
  }
})

const addForm = ref({})
const { addDisplay } = useBtn(myOption, addForm, myPermissions)

const handleAdd = () => {
  if (props.option.addBtn !== false && !isUndefined(props.option.addBtn?.onBefore)) {
    runCallback(props.option.addBtn?.onBefore, selectData.value)
      .then((res) => {
        addForm.value = res || {}
        isAdd.value = true
      })
      .catch(() => {})
  } else {
    isAdd.value = true
  }
}

const handleReload = (unselect?: boolean) => {
  if (unselect) {
    selectData.value = undefined
  }
  if (myOption.value.isTree) {
    treeRef.value.reload()
  } else {
    listRef.value.reload()
  }
}

const handleReset = (val: any) => {
  if (myOption.value.isTree) {
    treeRef.value.reload()
  } else {
    listRef.value.reset(val)
  }
}

watch(
  () => props.params,
  () => {
    setTimeout(() => {
      handleReload(true)
    }, 0)
  },
  { deep: true }
)
defineExpose({
  load: (unselect?: boolean) => {
    handleReload(unselect)
  }
})
</script>
<style>
.crco-list-form-left .crco-list-form-left-search {
  padding: 8px 13px;
  border-bottom: 1px solid var(--color-neutral-3);
  display: flex;
  flex-direction: row;
}
</style>
