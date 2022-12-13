import { TreeFieldNames } from '@arco-design/web-vue'
import { computed, ComputedRef, ref } from 'vue'

export default (treeFieldProps: ComputedRef<TreeFieldNames>) => {
  const searchKey = ref<string>('')

  const treeData = ref<any[]>([])
  const searchData = (arr: any[]) => {
    if (!searchKey.value) {
      return arr
    }
    const result: any[] = []
    arr.forEach((item) => {
      if (
        item[treeFieldProps.value.title!].toLowerCase().indexOf(searchKey.value.toLowerCase()) > -1
      ) {
        result.push({ ...item })
      } else if (item.children) {
        const filterData = searchData(item.children)
        if (filterData.length) {
          result.push({
            ...item,
            children: filterData
          })
        }
      }
    })
    return result
  }

  const realTreeData = computed(() => {
    if (!searchKey.value) return treeData.value
    return searchData(treeData.value)
  })

  return {
    searchKey,
    treeData,
    realTreeData,
    searchData
  }
}
