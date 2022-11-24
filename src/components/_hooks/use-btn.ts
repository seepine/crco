import { computed, Ref } from 'vue'
import { isFunction, isUndefined } from '../../util/is'
import { Btn } from '../../types/btn'
import { ListFormOption } from '../../types/list-form'
import { TableOption } from '../../types/table'

const canDisplay = (btn: Btn | false | undefined, form: any) => {
  if (isUndefined(btn)) {
    return true
  }
  if (btn === false) {
    return false
  }
  if (isFunction(btn.display)) {
    return btn.display(form)
  }
  return btn.display !== false
}

export default (option: Ref<TableOption | ListFormOption>, form: Ref<any>) => {
  const addDisplay = computed(() => {
    return canDisplay(option.value.addBtn, form.value)
  })
  const editDisplay = computed(() => {
    return canDisplay(option.value.editBtn, form.value)
  })
  const delDisplay = computed(() => {
    return canDisplay(option.value.delBtn, form.value)
  })
  return {
    addDisplay,
    editDisplay,
    delDisplay
  }
}
