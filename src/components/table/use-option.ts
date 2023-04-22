import { ref, watch } from 'vue'
import { isString } from '../../util/is'
import { TableOption } from '../../types/table'
import { copyPropertiesNotEmpty } from '../../util/util'
import { runDicData } from '../../util/dic-data'

export default (option: TableOption) => {
  // 设置option相关
  const myOption = ref<TableOption>({
    viewBtn: {
      text: '查看',
      permissionSuffix: 'view'
    },
    addBtn: {
      text: '新增',
      permissionSuffix: 'add'
    },
    editBtn: {
      text: '编辑',
      permissionSuffix: 'edit'
    },
    delBtn: {
      text: '删除',
      permissionSuffix: 'del'
    },
    exportBtn: {
      text: '导出',
      permissionSuffix: 'export'
    },
    menuProps: {
      display: true,
      width: 120,
      nowrap: true
    },
    rowKey: 'id',
    defaultLoadData: true,
    bordered: false,
    filterIconAlignLeft: true,
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
      showTotal: true,
      showJumper: true,
      showPageSize: true,
      pageSizeOptions: [10, 20, 50, 100]
    },
    columns: []
  })

  watch(
    () => option,
    () => {
      // searchForm.value = {}
      copyPropertiesNotEmpty(option, myOption.value)
      // if (props.option.pagination) {
      //   copyPropertiesNotEmpty(props.option.pagination, pagination.value)
      // }
      for (let i = 0; i < myOption.value.columns.length; i += 1) {
        // 需要处理字典的话
        if (isString(myOption.value.columns[i].dicUrl)) {
          // initDicData会处理props，所以此处应主动将props去除
          runDicData(myOption.value.columns[i]).then((res) => {
            myOption.value.columns[i].dicUrl = undefined
            // myOption.value.columns[i].props = undefined
            myOption.value.columns[i].dicData = res
          })
        }
        // if (!isUndefined(myOption.value.columns[i].searchValue)) {
        //   searchForm.value[myOption.value.columns[i].prop] = myOption.value.columns[i].searchValue
        // }
      }

      // if (isString(myOption.value.path)) {
      //   crudApi = crud({
      //     path: myOption.value.path,
      //     pagePath: myOption.value.pagePath,
      //     pageAfter: myOption.value.pageAfter,
      //     addPath: myOption.value.addPath,
      //     editPath: myOption.value.editPath,
      //     delPath: myOption.value.delPath
      //   })
      // }
    },
    {
      immediate: true,
      deep: true
    }
  )

  return {
    myOption
  }
}
