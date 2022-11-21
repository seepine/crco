export interface ListFieldProps {
  /**
   * 标题属性值
   */
  name?: string
  /**
   * 描述属性值
   */
  description?: string
  /**
   * 头像属性值
   */
  avatar?: string
}

export interface ListProps {
  /**
   * 是否显示边框,false
   */
  bordered?: boolean
  /**
   * 是否显示选中样式,true
   */
  hoverable?: boolean
  /**
   * 是否显示分割线,true
   */
  split?: boolean
  /**
   * 列表的最大高度,700
   */
  maxHeight?: number
  /**
   * 列表的最小高度,450
   */
  minHeight?: number
  /**
   * 触发到达底部的距离阈值,200
   */
  bottomOffset?: number
  /**
   * 50
   * 单次加载多少数据
   */
  pageSize?: number
}
