import { ref, watch } from 'vue'
import { ListFormOption } from '../../types/list-form'
import { copyPropertiesNotEmpty } from '../../util/util'

export default (option: ListFormOption) => {
  const myOption = ref<ListFormOption>({
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
    isTree: false,
    listProps: {
      maxHeight: 700,
      minHeight: 450,
      bottomOffset: 200,
      bordered: false,
      hoverable: true,
      pageSize: 50
    },
    rowKey: 'id',
    props: {
      name: 'name',
      description: 'description',
      avatar: 'avatar',
      iconRender: 'iconRender'
    },
    treeProps: {
      maxHeight: 700,
      blockNode: true,
      draggable: false,
      defaultExpandAll: false,
      defaultExpandRoot: true,
      defaultExpandSelected: true
    },
    tabsProps: {
      baseTitle: '基础信息',
      autoSwitchToBase: true,
      columns: []
    },
    columns: []
  })

  watch(
    () => option,
    () => {
      copyPropertiesNotEmpty(option, myOption.value)
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
