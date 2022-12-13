<template>
  <a-list
    v-bind="option.listProps"
    @reach-bottom="fetchData"
    :data="realListData"
    :style="
      option.listProps?.minHeight
        ? {
            minHeight: `${option.listProps?.minHeight}px`
          }
        : {}
    "
  >
    <template #item="{ item, index }">
      <a-list-item
        :key="index"
        :class="{ active: isActive(item) }"
        @click="handleSelect(item, index)"
      >
        <slot name="item" :item="item" :index="index">
          <a-list-item-meta :description="item[itemProps.description]">
            <template #title>
              <item-node
                :item-data="item"
                :search-key="searchKey"
                :title-field="itemProps.title"
              ></item-node
            ></template>
            <template #avatar v-if="item[itemProps.avatar]">
              <a-avatar shape="square">
                <img alt="avatar" :src="item[itemProps.avatar]" />
              </a-avatar>
            </template>
          </a-list-item-meta>
        </slot>
      </a-list-item>
    </template>
    <template #scroll-loading v-if="data.length > 0 || !noMore">
      <a-typography-text v-if="noMore" type="secondary">没有更多了</a-typography-text>
      <a-spin v-else-if="!noMore" />
    </template>
  </a-list>
</template>
<script setup lang="ts">
import { List as AList } from '@arco-design/web-vue'
import { computed, ref } from 'vue'
import { ListFieldProps } from '../../types/list'
import { ListFormOption } from '../../types/list-form'
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

const itemProps = computed<{
  id: string
  title: string
  description: string
  avatar: string
}>(() => {
  const metaProps = props.option.props as ListFieldProps
  return {
    id: props.option.rowKey || 'id',
    title: metaProps.name || 'name',
    description: metaProps?.description || 'description',
    avatar: metaProps?.avatar || 'avatar'
  }
})
const searchKey = ref('')

const noMore = ref(false)
const data = ref<Array<any>>([])
const realListData = computed(() => {
  if (!searchKey.value) return data.value
  const result: any[] = []
  data.value.forEach((item) => {
    if (item[itemProps.value.title!].toLowerCase().indexOf(searchKey.value.toLowerCase()) > -1) {
      result.push({ ...item })
    }
  })
  return result
})
const current = ref(1)
const loading = ref(false)

const fetchData = (params: any = {}) => {
  if (loading.value || noMore.value) {
    return
  }
  loading.value = true
  if (searchKey.value) {
    // eslint-disable-next-line no-param-reassign
    params[itemProps.value.title] = searchKey.value
  }
  props.requestFetch(
    { ...params, ...props.params, current: current.value, size: props.option.listProps?.pageSize },
    (res: any) => {
      if (res.records) {
        const len = res.records.length
        if (len < props.option.listProps?.pageSize!) {
          noMore.value = true
        }
        current.value += 1
        data.value.push(...res.records)
      } else {
        data.value = res
        noMore.value = true
      }
      loading.value = false
    }
  )
}

fetchData()

const selectId = ref('')
const selectIndex = ref(-1)
const isActive = (item: any) => {
  if (!item) {
    return false
  }
  return item[itemProps.value.id] === selectId.value
}
const handleSelect = (item: any, index: number) => {
  selectId.value = item[itemProps.value.id]
  selectIndex.value = index
  emit('select', item)
}

defineExpose({
  reset: (val: any) => {
    try {
      data.value[selectIndex.value] = val
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  search: (val?: string) => {
    searchKey.value = val || ''
  },
  reload: () => {
    noMore.value = false
    current.value = 1
    fetchData()
  }
})
</script>
<style lang="scss">
.crco-list-form-left {
  .arco-list-item {
    cursor: pointer;
    &.active {
      background-color: var(--color-fill-1);
      color: rgb(var(--primary-6));

      .arco-list-item-meta-title {
        color: unset;
      }
    }
    .arco-list-item-meta-description {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
  .arco-list-scroll-loading {
    font-size: 13px;
    &:hover {
      background-color: unset;
      cursor: unset;
      user-select: none;
    }
  }
  .arco-card-body {
    padding: 0;
  }
}
</style>
