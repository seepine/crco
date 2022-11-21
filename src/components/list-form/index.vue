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
            <a-button
              style="margin-left: 8px"
              v-if="myPermissions.addBtn"
              type="primary"
              @click="handleAdd"
            >
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
        <my-form
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
      </c-col>
    </c-row>
  </div>
</template>
<script setup lang="ts">
import { nextTick, ref, withDefaults, watch } from 'vue'
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

const selectData = ref<object | undefined>()
const handleSelect = (data: object) => {
  selectData.value = data
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
const myFormRef = ref()
const handleAdd = () => {
  nextTick(() => {
    myFormRef.value.add()
  })
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
