import { computed, Ref } from 'vue'
import { isArray, isObject, isUndefined } from '../../util/is'
import { TableOption } from '../../types/table'
import { ListFormOption } from '../../types/list-form'
import { Btn } from '../../types/btn'

const getPermission = (btn: false | Btn | undefined, permissions: any, prefix: string): boolean => {
  if (btn === false || btn === undefined) {
    return false
  }
  return !!permissions[`${prefix}${btn.permissionSuffix}`]
}

export default (myOption: Ref<TableOption | ListFormOption>) => {
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
      viewBtn: getPermission(myOption.value.viewBtn, all, permissionPrefix),
      addBtn: getPermission(myOption.value.addBtn, all, permissionPrefix),
      editBtn: getPermission(myOption.value.editBtn, all, permissionPrefix),
      delBtn: getPermission(myOption.value.delBtn, all, permissionPrefix),
      exportBtn: getPermission(myOption.value.exportBtn, all, permissionPrefix)
    }
  })
  return {
    myPermissions
  }
}
