import { ApiConfig } from './api'
import { FormColumn } from './column'
import { FormGroup } from './form'
import { ListFieldProps, ListProps } from './list'
import { MenuProps, PermissionProps } from './option'
import { tabsProps } from './tabs'
import { TreeFieldProps, treeProps } from './tree'

export interface ListFormOption extends MenuProps, PermissionProps {
  /**
   * 'id',表格行 key 的取值字段
   */
  rowKey?: string
  /**
   * list组件属性
   */
  listProps?: ListProps
  /**
   * tree组件属性，需开启isTree:true
   */
  treeProps?: treeProps
  /**
   * 自定义标签页
   */
  tabsProps?: tabsProps
  /**
   * 额外参数
   */
  props?: TreeFieldProps | ListFieldProps
  /**
   * 是否为树形结构，
   * 是的话接口必须返回 list tree结构
   * 否的话接口可返回分页结构 {records:[]}
   */
  isTree?: boolean
  /**
   * eg: /sys/system/user or ApiConfig
   */
  api?: string | ApiConfig
  /**
   * 分组配置
   */
  groups?: FormGroup[]
  /**
   * 表单配置
   */
  columns?: FormColumn[]
}
