import { Btn } from './btn'

export interface MenuProps {
  /**
   * 查看按钮配置
   */
  viewBtn?: Btn | false
  /**
   * 新增按钮配置
   */
  addBtn?: Btn | false
  /**
   * 编辑按钮配置
   */
  editBtn?: Btn | false
  /**
   * 删除按钮配置
   */
  delBtn?: (Btn & { popConfirmContent?: string | ((form?: any) => string) }) | false
  /**
   * 导出按钮配置
   */
  exportBtn?: Btn
}
export interface PermissionProps {
  /**
   * 权限前缀，例如 sys_system_user_
   * 对应到按钮上会被自动汇聚成 sys_system_user_add,sys_system_user_edit
   */
  permissionPrefix?: string
  /**
   * 用户所拥有的所有权限,一般为 ['a','b'] 或 {'a':true,'b':true}
   */
  permissions?: Array<string> | object
}
