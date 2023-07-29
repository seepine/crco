<template>
  <div class="crco-table-container" ref="crcoTableDivRef">
    <div v-show="!type">
      <search-box
        :option="myOption.searchOption"
        v-model:show="showSearch"
        :width="divWidth"
        @search="handleSearch"
        v-if="hasSearch"
      ></search-box>
      <div v-if="$slots['top']" class="mb-sm">
        <slot name="top" />
      </div>

      <div class="justify-between align-start md-row-column mb-sm">
        <div class="crco-table-header-left flex-row">
          <a-space>
            <a-button
              v-if="filterBtnDisplay('add', myOption, myPermissions, {}) && myOption.addBtn"
              type="primary"
              @click="operation('add', {})"
              >{{ myOption.addBtn?.text }}</a-button
            >
            <c-button
              v-if="
                myOption.exportBtn?.onClick &&
                filterBtnDisplay('export', myOption, myPermissions, {})
              "
              type="outline"
              @click="handleExport"
              v-bind="myOption.exportBtn?.buttonProps"
            >
              <template #default v-if="myOption.exportBtn?.text">{{
                myOption.exportBtn?.text
              }}</template>
            </c-button>
            <slot name="headerLeft" v-if="$slots['headerLeft']"></slot>
          </a-space>
        </div>
        <div class="crco-table-header-right md-row-column">
          <a-space>
            <slot name="headerRight" v-if="$slots['headerRight']"></slot>
            <a-button @click="() => load()" shape="circle">
              <template #icon>
                <icon-refresh />
              </template>
            </a-button>
            <a-button @click="showSearch = !showSearch" shape="circle" v-if="hasSearch">
              <template #icon>
                <icon-search />
              </template>
            </a-button>
          </a-space>
        </div>
      </div>
      <a-table
        ref="aTableRef"
        v-bind="{ ...myOption, columns: [] }"
        class="crco-table"
        @page-change="pageChange"
        @page-size-change="pageSizeChange"
        @filter-change="filterChange"
        @change="handleTableChange"
        @selection-change="selectionChange"
        @sorter-change="sorterChange"
        :pagination="pagination"
        :draggable="
          isObject(myOption.draggable)
            ? myOption.draggable
            : myOption.draggable === true
            ? {}
            : undefined
        "
        :data="tableDatas"
        :loading="loading"
      >
        <template #columns>
          <template v-for="(column, index) in myOption.columns" :key="column.prop">
            <a-table-column
              v-bind="column as any"
              :title="column.name"
              :dataIndex="column.prop"
              :ellipsis="column.ellipsis || myOption.ellipsis"
              :tooltip="column.ellipsis || myOption.ellipsis"
              :cell-style="filterCellStyle(column, { nowrap: column.nowrap || myOption.nowrap })"
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
            v-if="myOption.menuProps?.display !== false"
            v-bind="myOption.menuProps"
            title="操作"
            :fixed="myOption.menuProps?.fixed"
            :cell-style="filterCellStyle(myOption.menuProps)"
          >
            <template #cell="{ record, rowIndex }">
              <div class="crco-table-menu">
                <slot name="menuLeft" :record="record"></slot>
                <a-button
                  v-if="filterBtnDisplay('view', myOption, myPermissions, record)"
                  type="text"
                  @click="
                    operation('view', {
                      ...record,
                      rowIndex
                    })
                  "
                >
                  {{
                    isObject(myOption.viewBtn) && myOption.viewBtn.text
                      ? myOption.viewBtn.text
                      : '查看'
                  }}
                </a-button>
                <a-button
                  v-if="filterBtnDisplay('edit', myOption, myPermissions, record)"
                  type="text"
                  @click="
                    operation('edit', {
                      ...record,
                      rowIndex
                    })
                  "
                >
                  {{
                    isObject(myOption.editBtn) && myOption.editBtn.text
                      ? myOption.editBtn.text
                      : '修改'
                  }}
                </a-button>
                <crco-pop-confirm
                  v-if="filterBtnDisplay('del', myOption, myPermissions, record)"
                  :content="
                    filterPopconfirmContent({
                      ...record,
                      rowIndex
                    })
                  "
                  @ok="
                    (done) =>
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
                      isObject(myOption.delBtn) && myOption.delBtn.text
                        ? myOption.delBtn.text
                        : '删除'
                    }}
                  </a-button>
                </crco-pop-confirm>
                <slot name="menuRight" :record="record"></slot>
              </div>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
    <div v-if="type">
      <a-space v-if="type" direction="vertical" style="width: 100%" size="medium">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <a-button type="text" @click="handleBack">
              <template #icon>
                <icon-arrow-left />
              </template>
            </a-button>
          </a-breadcrumb-item>
          <a-breadcrumb-item>{{ typeLabel }}</a-breadcrumb-item>
        </a-breadcrumb>
        <crco-descriptions :type="type" :option="myOption" v-model="form" v-if="type === 'view'">
          <template v-for="item in myOption.columns" v-slot:[slotViewName(item.prop)]>
            <slot
              :name="item.prop + 'View'"
              :record="form"
              v-if="$slots[item.prop + 'View']"
            ></slot>
          </template>
          <slot name="viewFooter" :record="form" v-if="$slots.viewFooter"></slot>
        </crco-descriptions>
        <slot name="addHeader" :record="form" v-if="$slots.addHeader && type === 'add'"></slot>
        <slot name="editHeader" :record="form" v-if="$slots.editHeader && type === 'edit'"></slot>

        <crco-form
          v-if="type === 'add' || type === 'edit'"
          :option="myOption"
          @submit="handleSubmit"
          v-model="form"
          :type="type"
        >
          <template v-for="item in myOption.columns" v-slot:[item.prop]>
            <slot
              :name="item.prop + 'Form'"
              :record="form"
              v-if="$slots[item.prop + 'Form']"
            ></slot>
          </template>
        </crco-form>
        <slot name="addFooter" :record="form" v-if="$slots.addFooter && type === 'add'"></slot>
        <slot name="editFooter" :record="form" v-if="$slots.editFooter && type === 'edit'"></slot>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, computed, watch, watchEffect, provide } from 'vue'
import {
  Message,
  Space as ASpace,
  Table as ATable,
  TableColumn as ATableColumn,
  Button as AButton,
  Breadcrumb as ABreadcrumb,
  BreadcrumbItem as ABreadcrumbItem,
  TableChangeExtra,
  TableData,
  PaginationProps
} from '@arco-design/web-vue'
import { IconRefresh, IconArrowLeft, IconSearch } from '@arco-design/web-vue/es/icon'
import { isFunction, isString, isUndefined, isObject } from '../../util/is'
import { filterBtnDisplay, filterDisplay, filterCellStyle } from '../../util/filter'
import { deepClone, runDone } from '../../util/util'
import FormatValueRender from '../_components/format-value-render/index.vue'
import CrcoDescriptions from '../descriptions/index.vue'
import CrcoForm from '../form/index.vue'
import CrcoPopConfirm from '../pop-confirm/index.vue'
import usePopstate from '../_hooks/use-popstate'
import { TableOption } from '../../types/table'
import useOption from './use-option'
import usePermission from '../_hooks/use-premission'
import SearchBox from './search.vue'
import useCrud from '../_hooks/use-crud'
import { FormType } from '../../types/form'
import useElementResize from '../_hooks/use-element-resize'

const crcoTableDivRef = ref()
const { divWidth } = useElementResize(crcoTableDivRef)
provide('crcoTableDivWidth', divWidth)
const type = ref<FormType>()

/** ==========================     处理物理返回逻辑     ================== */
const popState = usePopstate(() => {
  if (type.value !== undefined) {
    type.value = undefined
  }
})
watchEffect(() => {
  if (type.value !== undefined) {
    popState.in()
  } else {
    popState.out()
  }
})
const handleBack = () => {
  popState.back()
}
/** ==========================     处理物理返回逻辑 end    ================== */
const props = withDefaults(
  defineProps<{
    option: TableOption
    params?: any
    permissions?: Permissions
    allPermissions?: any
    before?: Function
    beforeSubmit?: Function
  }>(),
  {
    params: {}
  }
)

const emit = defineEmits<{
  (event: 'load', params: any, done: Function): void
  (event: 'add', data: any, done: Function): void
  (event: 'edit', data: any, done: Function): void
  (event: 'del', data: any, done: Function): void
  (event: 'change', extraType: string, data: any): void
  (event: 'selection-change', values: string[]): void
  (event: 'sorter-change', dataIndex: string, direction: string): void
}>()

const aTableRef = ref()
const { myOption } = useOption(props.option)
const { requestPage, requestAdd, requestEdit, requestDel } = useCrud(emit, myOption)
const { myPermissions } = usePermission(myOption)
const showSearch = ref(true)
const searchParams = ref({})
const pagination = ref<PaginationProps>({
  total: 0,
  current: 1,
  pageSize: 10,
  showTotal: true,
  showJumper: true,
  showPageSize: true,
  pageSizeOptions: [10, 20, 50, 100]
})

watch(
  () => myOption.value.pagination,
  () => {
    if (isObject(myOption.value.pagination)) {
      pagination.value.pageSize = myOption.value.pagination.pageSize || pagination.value.pageSize
      pagination.value.showTotal = myOption.value.pagination.showTotal || pagination.value.showTotal
      pagination.value.showTotal = myOption.value.pagination.showTotal || pagination.value.showTotal
      pagination.value.showJumper =
        myOption.value.pagination.showJumper || pagination.value.showJumper
      pagination.value.showPageSize =
        myOption.value.pagination.showPageSize || pagination.value.showPageSize
      pagination.value.pageSizeOptions =
        myOption.value.pagination.pageSizeOptions || pagination.value.pageSizeOptions
    }
  }
)

const slotViewName = (prop: string) => {
  return `${prop}Value`
}

const filterPopconfirmContent = (record: any) => {
  if (isObject(myOption.value.delBtn)) {
    if (isString(myOption.value.delBtn.popConfirmContent)) {
      return myOption.value.delBtn.popConfirmContent
    }
    if (isFunction(myOption.value.delBtn.popConfirmContent)) {
      return myOption.value.delBtn.popConfirmContent(record)
    }
    if (isString(myOption.value.delBtn.text)) {
      return `请确认是否${myOption.value.delBtn.text}?`
    }
  }
  return `请确认是否删除?`
}

const hasSearch = computed(() => {
  return (
    myOption.value.searchOption &&
    myOption.value.searchOption.columns &&
    myOption.value.searchOption.columns.length > 0
  )
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
  }, 100)
  if (reset) {
    pagination.value.current = 1
  }
  const params = {
    ...searchParams.value,
    ...props.params,
    ...myParams,
    current: pagination.value.current,
    size: pagination.value.pageSize
  }
  const loadResHandle = (res: any) => {
    isDone = true
    if (isObject(res)) {
      tableDatas.value = res.records
      pagination.value.total = res.total
      pagination.value.current = res.current
      pagination.value.pageSize = res.size
      if (res.current > 1 && res.records.length === 0) {
        pagination.value.current! -= 1
        load(false, done)
        return
      }
    }
    if (done) {
      done(res)
    }
    loading.value = false
  }
  requestPage(params, loadResHandle)
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
if (myOption.value.defaultLoadData) {
  load()
}
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

const operation = (val: FormType, data: any) => {
  form.value = {
    ...data
  }
  const callback = (callbackData: any) => {
    if (callbackData !== false) {
      // 有回传值，替换上去
      if (!isUndefined(callbackData)) {
        form.value = {
          ...form.value,
          ...callbackData
        }
      }
      type.value = val
    }
  }
  if (isFunction(props.before)) {
    props.before(val, form.value, callback)
  } else if (
    val &&
    isObject(myOption.value[`${val}Btn`]) &&
    // @ts-ignore
    isFunction(myOption.value[`${val}Btn`].onBefore)
  ) {
    // @ts-ignore
    runDone(myOption.value[`${val}Btn`].onBefore, form.value, callback).then((res) => {
      callback(res)
    })
  } else {
    type.value = val
  }
}

const handleSubmit = (val: any, done: Function) => {
  if (!type.value) {
    // eslint-disable-next-line no-console
    console.error('type is undefined, can not submit')
    return
  }
  const handleDone = (flag = true) => {
    if (flag === true) {
      Message.success(`${typeLabel.value}成功`)
      // type.value = undefined
      handleBack()
      load()
    } else {
      done()
    }
  }
  let formData = deepClone(val)
  if (isFunction(props.beforeSubmit)) {
    formData = props.beforeSubmit(type.value, formData)
  }
  const callback = (newVal: any) => {
    switch (type.value) {
      case 'add':
        requestAdd(newVal, handleDone)
        break
      case 'edit':
        requestEdit(newVal, handleDone)
        break
      default:
    }
  }

  if (
    isObject(myOption.value[`${type.value}Btn`]) &&
    // @ts-ignore
    isFunction(myOption.value[`${type.value}Btn`].onAfter)
  ) {
    // @ts-ignore
    runDone(myOption.value[`${type.value}Btn`].onAfter, formData, callback)
      .then((res) => {
        if (res === false) {
          handleDone(false)
        } else {
          callback(res)
        }
      })
      .catch(() => {
        handleDone(false)
      })
  } else {
    callback(formData)
  }
}
const handleSearch = (val: any, done: Function) => {
  searchParams.value = val
  load(true, () => {
    done()
  })
}
const handleTableChange = (data: TableData[], extra: TableChangeExtra) => {
  if (extra.type === 'drag' && extra.dragTarget) {
    const target = extra.dragTarget || {}
    const rowKey = isString(myOption.value.rowKey) ? myOption.value.rowKey : 'id'
    const idx = tableDatas.value.findIndex((item) => item[rowKey] === target[rowKey])
    const toIdx = data.findIndex((item) => item[rowKey] === target[rowKey])
    if (idx >= 0 && toIdx >= 0 && idx !== toIdx) {
      emit('change', extra.type, {
        element: target,
        targetElement: tableDatas.value[toIdx],
        oldIndex: idx,
        newIndex: toIdx,
        page: extra.page,
        pageSize: extra.pageSize
      })
    }
  } else {
    emit('change', extra.type, {
      data,
      extra
    })
  }
}
const handleToDel = (record: any, done: (closed?: boolean) => void) => {
  const handleDone = (flag = true) => {
    if (flag === true) {
      Message.success(`删除成功`)
      load()
    }
    done(flag)
  }
  requestDel(record, handleDone)
}

// 直接抛出a-table事件
const selectionChange = (rowKeys: string[]) => {
  emit('selection-change', rowKeys)
}
const sorterChange = (dataIndex: string, direction: string) => {
  emit('sorter-change', dataIndex, direction)
}
// 直接抛出a-table事件  end

const handleExport = (done: Function) => {
  if (!isFunction(myOption.value.exportBtn?.onClick)) {
    return
  }
  const params = {
    ...searchParams.value,
    ...props.params,
    ...myParams
  }
  runDone(myOption.value.exportBtn?.onClick, params, done).then(() => {
    done()
  })
  // const res = myOption.value.exportBtn?.onClick(params, done)
  // if (res && isPromise(res)) {
  //   // @ts-ignore
  //   res.then(() => {
  //     done()
  //   })
  // }
}

defineExpose({
  aTableRef,
  load,
  add: (data?: any) => {
    operation('add', isUndefined(data) ? {} : data)
  },
  getParams: () => {
    return {
      ...searchParams.value,
      ...props.params,
      ...myParams
    }
  }
})
</script>
<style lang="scss">
@import './index.scss';
</style>
