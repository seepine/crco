import { computed, Ref } from 'vue'
import { isArray, isObject, isUndefined } from '../../util/is'
import { TableOption } from '../../types/table'

export default (myOption: Ref<TableOption>) => {
  const myPermissions = computed(() => {
    let all: any = {}
    const { permissionPrefix } = myOption.value
    if (isArray(myOption.value.permissions)) {
      for (let i = 0; i < myOption.value.permissions.length; i += 1) {
        all[myOption.value.permissions[i]] = true
      }
    } else if (isObject(myOption.value.permissions)) {
      all = myOption.value.permissions
    }
    if (isUndefined(permissionPrefix)) {
      return {
        ...all,
        viewBtn: true,
        addBtn: true,
        editBtn: true,
        delBtn: true
      }
    }
    return {
      ...all,
      viewBtn: !!all[`${permissionPrefix}${myOption.value.viewBtn?.permissionSuffix}`],
      addBtn: !!all[`${permissionPrefix}${myOption.value.addBtn?.permissionSuffix}`],
      editBtn: !!all[`${permissionPrefix}${myOption.value.editBtn?.permissionSuffix}`],
      delBtn: !!all[`${permissionPrefix}${myOption.value.delBtn?.permissionSuffix}`]
    }
  })
  return {
    myPermissions
  }
}
