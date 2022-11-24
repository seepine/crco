export interface tabsPaneProps {
  /**
   * 选项卡的标题
   */
  title: string
  /**
   * 插槽名称，不能重复
   */
  slotName: string
  /**
   * 权限
   */
  permission?: string
  /**
   * 是否禁用,false
   */
  disabled?: boolean
  /**
   * 是否在不显示标签时销毁内容,false
   */
  destroyOnHide?: boolean
}
export interface tabsProps {
  /**
   * 选项卡的位置,'top'
   */
  position?: 'left' | 'right' | 'top' | 'bottom'
  /**
   * 选项卡的类型,'line'
   */
  type?: 'line' | 'card' | 'card-gutter' | 'text' | 'rounded' | 'capsule'
  /**
   * 选项卡的方向,'horizontal'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 是否在不显示标签时销毁内容,false
   */
  destroyOnHide?: boolean
  /**
   * 是否在首次展示标签时挂载内容,false
   */
  lazyLoad?: boolean
  /**
   * 高度撑满容器，只在水平模式下生效。false
   */
  justify?: boolean
  /**
   * 是否开启选项内容过渡动画,false
   */
  animation?: boolean
  /**
   * 选项卡头部是否存在水平边距。仅对 type 等于 line、text 类型的选项卡生效,true
   */
  headerPadding?: boolean
  /**
   * 是否隐藏内容,false
   */
  hideContent?: boolean
  /**
   * 触发方式,'click'
   */
  trigger?: 'hover' | 'click'
  /**
   * columns配置
   */
  columns?: tabsPaneProps[]
  /**
   * 基础标签页标题
   */
  baseTitle?: string
  /**
   * 选择左侧列表对象时，是否自动切换到详情页，true
   */
  autoSwitchToBase?: boolean
}
