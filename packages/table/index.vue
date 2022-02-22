<template>
  <!-- <a-spin  :loading="loading" style="width: 100%"> -->
  <a-space
    v-show="!type || myOption.dialog === true"
    direction="vertical"
    style="width: 100%"
    size="medium"
  >
    <slot name="top" />
    <crco-form
      v-if="hasSearch && myOption.searchTop === true"
      :option="myOption"
      @submit="handleSearch"
      v-model="searchForm"
      type="search"
    >
      <template v-for="item in myOption.columns" v-slot:[item.prop]>
        <slot :name="item.prop + 'Search'" :record="form"></slot>
      </template>
    </crco-form>

    <div class="justify-between align-start md-row-column" v-if="myOption.headerDisplay !== false">
      <div class="crco-table-header-left flex-row">
        <a-button
          v-if="filterBtnDisplay('add', myOption, props.permissions, {})"
          type="primary"
          @click="operation('add', {})"
          >{{
            isObject(myOption.addBtn) && myOption.addBtn.text ? myOption.addBtn.text : '新增'
          }}</a-button
        >
        <slot name="headerLeft"></slot>
      </div>
      <div class="crco-table-header-right md-row-column">
        <slot name="headerRight"></slot>

        <crco-form
          v-if="hasSearch && myOption.searchTop !== true"
          :option="{
            ...myOption,
            hideLabel: true
          }"
          @submit="handleSearch"
          v-model="searchForm"
          type="search"
        >
          <template v-for="item in myOption.columns" v-slot:[item.prop]>
            <slot :name="item.prop + 'Search'" :record="form"></slot>
          </template>
        </crco-form>

        <a-button @click="() => load()" shape="circle" v-if="myOption.refreshBtn !== false">
          <template #icon>
            <icon-refresh />
          </template>
        </a-button>
      </div>
    </div>
    <a-table
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
      @filter-change="filterChange"
      v-bind="myOption"
      :data="tableDatas"
      :pagination="pagination"
      :loading="loading"
      :row-key="isString(myOption.rowKey) ? myOption.rowKey : 'id'"
    >
      <template #columns>
        <template v-for="(column, index) in myOption.columns" :key="column.prop">
          <a-table-column
            v-bind="column"
            :title="column.name"
            :dataIndex="column.prop"
            v-if="filterDisplay('', column, tableDatas[index])"
          >
            <template #cell="{ record }">
              <slot :name="column.prop" :column="column" :record="record">
                <format-value-render :column="column" :record="record"></format-value-render>
              </slot>
            </template>
          </a-table-column>
        </template>

        <a-table-column
          v-if="myOption.menuDisplay !== false"
          v-bind="myOption.menuProps"
          title="操作"
          :width="myOption.menuProps && myOption.menuProps.width ? myOption.menuProps.width : 220"
        >
          <template #cell="{ record, rowIndex }">
            <slot name="menuLeft" :record="record"></slot>
            <a-button
              v-if="filterBtnDisplay('view', myOption, props.permissions, record)"
              type="text"
              @click="
                operation('view', {
                  ...record,
                  rowIndex
                })
              "
            >
              {{
                isObject(myOption.viewBtn) && myOption.viewBtn.text ? myOption.viewBtn.text : '查看'
              }}
            </a-button>
            <a-button
              v-if="filterBtnDisplay('edit', myOption, props.permissions, record)"
              type="text"
              @click="
                operation('edit', {
                  ...record,
                  rowIndex
                })
              "
            >
              {{
                isObject(myOption.editBtn) && myOption.editBtn.text ? myOption.editBtn.text : '修改'
              }}
            </a-button>
            <crco-popconfirm
              v-if="filterBtnDisplay('del', myOption, props.permissions, record)"
              content="请确认是否删除?"
              @ok="
                (done: (p_closed?: boolean) => void) =>
                  handleToDel(
                    {
                      ...record,
                      rowIndex
                    },
                    done
                  )
              "
              :ok-button-props="{ status: 'danger' }"
            >
              <a-button type="text" status="danger">
                {{
                  isObject(myOption.delBtn) && myOption.delBtn.text ? myOption.delBtn.text : '删除'
                }}
              </a-button>
            </crco-popconfirm>
            <slot name="menuRight" :record="record"></slot>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-space>
  <!-- </a-spin> -->
  <a-space
    v-if="type !== '' && myOption.dialog !== true"
    direction="vertical"
    style="width: 100%"
    size="medium"
  >
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-button type="text" @click="type = ''">
          <template #icon>
            <icon-arrow-left />
          </template>
        </a-button>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ typeLabel }}{{ myOption.subtitle }}</a-breadcrumb-item>
    </a-breadcrumb>
    <crco-descriptions
      v-bind="myOption.viewProps"
      :type="type"
      :option="myOption"
      v-model="form"
      v-if="type === 'view'"
    >
      <template v-for="item in myOption.columns" v-slot:[item.prop]>
        <slot :name="item.prop + 'View'" :record="form" v-if="$slots[item.prop + 'View']"></slot>
      </template>
      <slot name="viewFooter" :record="form" v-if="$slots.viewFooter"></slot>
    </crco-descriptions>
    <crco-form
      :option="myOption"
      @submit="handleSubmit"
      v-model="form"
      :type="type"
      v-if="type === 'add' || type === 'edit'"
    >
      <template v-for="item in myOption.columns" v-slot:[item.prop]>
        <slot :name="item.prop + 'Form'" :record="form" v-if="$slots[item.prop + 'Form']"></slot>
      </template>
    </crco-form>
  </a-space>
  <a-modal
    v-if="myOption.dialog === true"
    :visible="type !== '' && myOption.dialog === true"
    :title="typeLabel + myOption.subtitle"
    :footer="false"
    @cancel="type = ''"
  >
    <crco-descriptions
      v-bind="myOption.viewProps"
      :type="type"
      :option="myOption"
      v-model="form"
      v-if="type === 'view'"
    >
      <slot name="viewFooter" :record="form" v-if="$slots.viewFooter"></slot>
    </crco-descriptions>
    <crco-form
      :option="myOption"
      @submit="handleSubmit"
      v-model="form"
      :type="type"
      v-else-if="type !== ''"
    >
      <template v-for="item in myOption.columns" v-slot:[item.prop]>
        <slot :name="item.prop + 'Form'" :record="form"></slot>
      </template>
    </crco-form>
  </a-modal>
</template>

<script setup lang="ts">
import {
  ref,
  withDefaults,
  defineExpose,
  computed,
  watch,
  onMounted,
  onUnmounted,
  watchEffect
} from 'vue'
import {
  Message,
  Space as ASpace,
  Modal as AModal,
  Table as ATable,
  TableColumn as ATableColumn,
  Button as AButton,
  Breadcrumb as ABreadcrumb,
  BreadcrumbItem as ABreadcrumbItem
} from '@arco-design/web-vue'
import { IconRefresh, IconArrowLeft } from '@arco-design/web-vue/es/icon'
import { isFunction, isString, isUndefined, isObject } from '../util/is'
import { initDicData } from '../util/data-handle'
import { filterBtnDisplay, filterDisplay } from '../util/filter'
import beanUtil from '../util/bean-util'
import FormatValueRender from '../_components/format-value-render/index.vue'
import CrcoDescriptions from '../descriptions/index.vue'
import CrcoForm from '../form/index.vue'
import CrcoPopconfirm from '../popconfirm/index.vue'
import emitter from '../util/emitter'
import crud from '../util/crud'

type TypeEnum = 'view' | 'add' | 'edit' | 'del' | ''

const type = ref<TypeEnum>('')
/** ==========================     处理物理返回逻辑     ================== */
const code = Math.round(Math.random() * 100000000)
let topCode = code
const triggerBack = () => {
  if (topCode === code) {
    if (type.value !== '') {
      type.value = ''
    }
  }
}
const setTopCode = (data: any) => {
  topCode = data
}
watchEffect(() => {
  if (type.value !== '') {
    emitter.emit('popstate-stack-in', code)
  } else {
    emitter.emit('popstate-stack-out', code)
  }
})
onMounted(() => {
  emitter.on('top-code', setTopCode)
  window.addEventListener('popstate', triggerBack)
})
onUnmounted(() => {
  emitter.off('top-code', setTopCode)
  window.removeEventListener('popstate', triggerBack)
})
/** ==========================     处理物理返回逻辑 end    ================== */
type Btn = {
  text: string
}
type Option = {
  dialog: boolean
  columns: Array<any>
  rowKey?: string
  searchTop?: boolean
  addBtn?: boolean | Btn
  viewBtn?: boolean | Btn
  editBtn?: boolean | Btn
  delBtn?: boolean | Btn
  refreshBtn?: boolean
  subtitle?: string
  menuDisplay?: boolean
  headerDisplay?: boolean
  menuProps?: {
    width?: number
  }
  viewProps?: any

  // eg:/sys/system/menu
  path?: string
  // eg:page/res 前面会自动拼接上 `${path}/`
  pagePath?: string
  pageAfter?: Function
  // eg:add 前面会自动拼接上 `${path}/`
  addPath?: string
  // eg:edit 前面会自动拼接上 `${path}/`
  editPath?: string
  // eg:del 前面会自动拼接上 `${path}/`
  delPath?: string
}
type Permissions = {
  viewBtn: boolean
  addBtn: boolean
  editBtn: boolean
  delBtn: boolean
}
const props = withDefaults(
  defineProps<{
    option: Option
    params?: any
    permissions?: Permissions
    before?: Function
  }>(),
  {
    params: {},
    permissions: () => {
      return {
        viewBtn: true,
        addBtn: true,
        editBtn: true,
        delBtn: true
      }
    }
  }
)
const emit = defineEmits<{
  (event: 'load', p_params: any, p_done: Function): void
  (event: 'add', p_data: any, p_done: Function): void
  (event: 'edit', p_data: any, p_done: Function): void
  (event: 'del', p_data: any, p_done: Function): void
}>()
// 设置option相关
const myOption = ref<Option>({
  dialog: false,
  addBtn: {
    text: '新增'
  },
  viewBtn: {
    text: '查看'
  },
  editBtn: {
    text: '编辑'
  },
  delBtn: {
    text: '删除'
  },
  menuProps: {
    width: 220
  },
  subtitle: '',
  columns: []
})

let crudApi: any

const searchForm = ref<any>({})
watch(
  () => props.option,
  () => {
    searchForm.value = {}
    beanUtil.copyPropertiesNotEmpty(props.option, myOption.value)
    for (let i = 0; i < myOption.value.columns.length; i += 1) {
      // 需要处理字典的话
      if (isString(myOption.value.columns[i].dicUrl)) {
        // initDicData会处理props，所以此处应主动将props去除
        initDicData(myOption.value.columns[i]).then((res) => {
          myOption.value.columns[i].dicUrl = undefined
          myOption.value.columns[i].props = undefined
          myOption.value.columns[i].dicData = res
        })
      }
      if (!isUndefined(myOption.value.columns[i].searchValue)) {
        searchForm.value[myOption.value.columns[i].prop] = myOption.value.columns[i].searchValue
      }
    }

    if (isString(myOption.value.path)) {
      crudApi = crud({
        path: myOption.value.path,
        pagePath: myOption.value.pagePath,
        pageAfter: myOption.value.pageAfter,
        addPath: myOption.value.addPath,
        editPath: myOption.value.editPath,
        delPath: myOption.value.delPath
      })
    }
  },
  {
    immediate: true,
    deep: true
  }
)
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showTotal: true,
  showJumper: true,
  showPageSize: true,
  pageSizeOptions: [10, 20, 40, 50, 100]
})
const hasSearch = computed(() => {
  return myOption.value.columns.findIndex((column) => column.search === true) >= 0
})
const loading = ref(false)
const tableDatas = ref([])
const myParams: any = {}
const load = (reset = false, done?: Function) => {
  let isDone = false
  setTimeout(() => {
    if (!isDone) {
      loading.value = true
    }
  }, 400)
  if (reset) {
    pagination.value.current = 1
  }
  const params = {
    ...searchForm.value,
    ...props.params,
    ...myParams,
    current: pagination.value.current,
    size: pagination.value.pageSize
  }
  const loadResHandle = (res: any) => {
    isDone = true
    loading.value = false
    if (isObject(res)) {
      tableDatas.value = res.records
      pagination.value.total = res.total
      pagination.value.current = res.current
    }
    if (done) {
      done(res)
    }
  }
  if (crudApi) {
    crudApi.handleLoad(params, loadResHandle)
  } else {
    emit('load', params, loadResHandle)
  }
}
const pageChange = (current: number) => {
  pagination.value.current = current
  load()
}
const pageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize
  load()
}
const isFilterMultiple = (prop: string, columns: Array<any>) => {
  const find = columns.find((column) => column.prop === prop)
  return find && find.filterable && find.filterable.multiple
}
const filterChange = (prop: string, filterValues: Array<any>) => {
  const multiple = isFilterMultiple(prop, props.option.columns)
  if (filterValues && filterValues.length > 0) {
    myParams[`${prop}${multiple ? 'Filter' : ''}`] = multiple ? filterValues : filterValues[0]
  } else {
    myParams[`${prop}${multiple ? 'Filter' : ''}`] = undefined
  }
  load()
}
load()
// end
// crud
const form = ref({})

const typeLabel = computed(() => {
  // @ts-ignore
  if (isObject(myOption.value[`${type.value}Btn`])) {
    // @ts-ignore
    return myOption.value[`${type.value}Btn`].text
  }
  switch (type.value) {
    case 'view':
      return '详情'
    case 'add':
      return '添加'
    case 'edit':
      return '修改'
    case 'del':
      return '删除'
    default:
      return ''
  }
})
const operation = (val: TypeEnum, data: any) => {
  form.value = {
    ...data
  }
  if (isFunction(props.before)) {
    props.before(val, form.value, (callbackData: any) => {
      // 有回传值，替换上去
      if (!isUndefined(callbackData)) {
        form.value = {
          ...form.value,
          ...callbackData
        }
      }
      // setTimeout(() => {
      type.value = val
      // }, 0)
    })
  } else {
    type.value = val
  }
}

const handleSubmit = (val: any, done: Function) => {
  const handleDone = (flag = true) => {
    if (flag === true) {
      Message.success(`${typeLabel.value}成功`)
      type.value = ''
      load()
    } else {
      done()
    }
  }
  if (crudApi) {
    switch (type.value) {
      case 'add':
        crudApi.handleAdd(val, handleDone)
        break
      case 'edit':
        crudApi.handleEdit(val, handleDone)
        break
      default:
    }
  } else if (type.value === 'add' || type.value === 'edit') {
    // @ts-ignore
    emit(type.value, val, handleDone)
  }
}
const handleSearch = (val: any, done: Function) => {
  load(true, () => {
    done()
  })
}
const handleToDel = (record: any, done: (p_closed?: boolean) => void) => {
  const handleDone = (flag = true) => {
    if (flag === true) {
      Message.success(`删除成功`)
      load()
    }
    done(flag)
  }
  if (crudApi) {
    crudApi.handleDel(record, handleDone)
  } else {
    emit('del', record, handleDone)
  }
}

defineExpose({
  load,
  add: (data?: any) => {
    operation('add', isUndefined(data) ? {} : data)
  }
})
</script>
<style scoped lang="scss">
::v-deep(.arco-breadcrumb) {
  .arco-btn-text {
    color: var(--color-text-1);
  }
}
::v-deep(.arco-table-th-item-title) {
  white-space: nowrap;
}

.md-row-column {
  display: flex !important;
  flex-direction: row !important;
}
@media screen and (max-width: 768px) {
  .md-row-column {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap;
  }
  .crco-table-header-left {
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 451px) {
  ::v-deep(.arco-pagination) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: start;
    .arco-pagination-total {
      height: unset;
      padding-bottom: 14px;
    }
  }
}
</style>
