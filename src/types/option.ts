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
  /**
   * 刷新按钮是否显示
   * @default true
   */
  refreshBtn?: boolean
  /**
   * 改变列按钮是否显示
   * @default true
   */
  changeColumnBtn?: boolean
  /**
   * 列缓存key或者提供者
   *
   * @example 缓存key
   * ```ts
   * changeColumnCache: "table_column_key"
   * ```
   *
   * @example 提供者
   * ```ts
   * changeColumnCache: async ()=>{
   *   // 返回缓存列 [{prop:string; display:boolean}]
   *   return await axios.get("/setting/table_column_key")
   * }
   * ```
   */
  changeColumnCache?:
    | string
    | (() => { prop: string; display: boolean }[] | Promise<{ prop: string; display: boolean }[]>)
  /**
   * 列显隐改变事件
   *
   * @param columns 改变后的字段
   *
   * @example
   * ```ts
   *   changeColumnEvent: (columns) => {
   *     localStorage.setItem('table-change-column-demo', JSON.stringify(columns))
   *   }
   * ```
   */
  changeColumnEvent?: (columns: { prop: string; display: boolean }[]) => void
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
