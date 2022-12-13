<template>
  <a-skeleton :animation="true" :loading="loading">
    <a-space direction="vertical" :style="{ width: '100%' }">
      <a-skeleton-line :rows="16" :line-spacing="8" :line-height="24" />
    </a-space>
    <template #content>
      <div
        class="crco-list-form-tree-header flex-row justify-end px-xs pt-xs absolute"
        style="right: 0; z-index: 1"
        v-if="realTreeData.length !== 0"
      >
        <a-tooltip :content="isExpand ? '收缩' : '展开'">
          <icon-menu-unfold @click="expandAll(true)" v-if="!isExpand" />
          <icon-menu-fold @click="expandAll(false)" v-if="isExpand" />
        </a-tooltip>
      </div>
      <a-scrollbar
        class="pa-xs"
        :style="{
          maxHeight: `${option.treeProps?.maxHeight}px`,
          minHeight: `${option.treeProps?.minHeight}px`
        }"
        style="overflow-y: auto"
      >
        <a-empty v-if="realTreeData.length === 0"></a-empty>
        <a-tree
          v-else
          ref="crcoTreeRef"
          v-bind="treeProps"
          :field-names="treeFieldProps"
          :selected-keys="selectedKeys"
          :data="realTreeData"
          :default-expanded-keys="defaultExpandedKeys"
          @select="handleSelect"
          @drop="handleDrop"
        >
          <template #icon="{ node }" v-if="treeProps.iconRender">
            <render-function :render-func="treeProps.iconRender!" :record="node"></render-function>
          </template>
          <template #title="nodeData">
            <item-node
              :item-data="nodeData"
              :search-key="searchKey"
              :title-field="treeFieldProps.title"
            ></item-node>
          </template>
        </a-tree>
      </a-scrollbar>
    </template>
  </a-skeleton>
</template>
<script setup lang="ts">
import { TreeNodeData } from '@arco-design/web-vue'
import { computed, ref } from 'vue'
import { TreeFieldProps } from '../../types/tree'
import { ListFormOption } from '../../types/list-form'
import { isFunction } from '../../util/is'
import { runCallback } from '../../util/util'
import RenderFunction from '../_components/render'
import useTree from './use-tree'
import ItemNode from './item-node.vue'

const props = defineProps<{
  option: ListFormOption
  requestFetch: Function
  params: any
}>()
const emit = defineEmits<{
  (event: 'select', item: any): void
  (event: 'add'): void
}>()
const treeProps = computed(() => {
  return {
    ...props.option.treeProps,
    onDrop: undefined,
    onDrag: undefined
  }
})

const treeFieldProps = computed<{
  key: string
  title: string
  disabled: string
  children: string
  isLeaf: string
  disableCheckbox: string
  checkable: string
  icon: string
}>(() => {
  const fields = (props.option.props || {}) as TreeFieldProps
  return {
    key: props.option.rowKey || 'id',
    title: fields.name || 'name',
    disabled: fields.disabled || 'disabled',
    children: fields.children || 'children',
    isLeaf: fields.isLeaf || 'isLeaf',
    disableCheckbox: fields.disableCheckbox || 'disableCheckbox',
    checkable: fields.checkable || 'checkable',
    icon: fields.iconRender || 'iconRender'
  }
})

const { searchKey, realTreeData, treeData } = useTree(treeFieldProps)

const crcoTreeRef = ref()
const loading = ref(false)
const defaultExpandedKeys = ref<any[]>([])
const selectedKeys = ref<Array<string | number>>([])

const fetchData = (init: boolean = false) => {
  if (loading.value) {
    return
  }
  if (init) {
    loading.value = true
  }
  props.requestFetch(
    {
      ...props.params
    },
    (res: any) => {
      loading.value = false

      if (props.option.treeProps?.defaultExpandRoot) {
        const expandedKeys = []
        try {
          res.forEach((item: any) => expandedKeys.push(item[treeFieldProps.value.key!]))
          if (selectedKeys.value.length > 0) {
            expandedKeys.push(...selectedKeys.value)
          }
          defaultExpandedKeys.value = expandedKeys
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
      if (res && res.length > 0) {
        treeData.value = res
      } else {
        treeData.value = []
      }
    }
  )
}
fetchData(true)
const handleSelect = (
  keys: Array<string | number>,
  val: { selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event }
) => {
  if (val.node) {
    selectedKeys.value = keys
    emit('select', val.node)
  }
}

const isExpand = ref(false)
const expandAll = (expand: boolean) => {
  isExpand.value = expand
  crcoTreeRef.value.expandAll(expand)
}

const handleDrop = (e: any) => {
  if (isFunction(props.option.treeProps?.onDrop)) {
    runCallback(props.option.treeProps?.onDrop, e)
      .then(() => {
        fetchData()
      })
      .catch(() => {
        fetchData()
      })
  }
}

defineExpose({
  search: (val?: string) => {
    searchKey.value = val || ''
  },
  reload: () => {
    fetchData()
  }
})
</script>
<style lang="scss">
.crco-list-form-tree-header {
  .arco-icon {
    cursor: pointer;
    padding: 4px;
    padding-top: 8px;
    padding-right: 6px;
  }
}
.crco-list-form {
  .arco-tree-node-icon {
    margin-right: 6px;
    padding-bottom: 2px;
  }
  .arco-tree-node-selected {
    .arco-avatar {
      background-color: rgb(var(--primary-5));
    }
  }
}
</style>
