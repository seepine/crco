import { TreeNodeData } from '@arco-design/web-vue'
import { VNode } from 'vue'

export interface TreeFieldProps {
  /**
   * 默认取item的name
   */
  name?: string
  /**
   * 默认取item的disabled
   */
  disabled?: string
  /**
   * 默认取item的children
   */
  children?: string
  /**
   * 默认取item的isLeaf
   */
  isLeaf?: string
  /**
   * 默认取item的disableCheckbox
   */
  disableCheckbox?: string
  /**
   * 默认取item的checkable
   */
  checkable?: string
  /**
   * 默认取item的iconRender
   */
  iconRender?: string
}
export interface treeProps {
  /**
   * 列表的最大高度,700
   */
  maxHeight?: number
  /**
   * 列表的最小高度,450
   */
  minHeight?: number
  /**
   * 是否占据整块,true
   */
  blockNode?: boolean
  /**
   * 是否可拖拽,false
   */
  draggable?: boolean
  /**
   * 拖拽时是否允许在某节点上释放
   */
  allowDrop?: (options: { dropNode: TreeNodeData; dropPosition: -1 | 0 | 1 }) => boolean
  /**
   * 拖拽释放事件
   */
  onDrop?: (data: {
    e: DragEvent
    dragNode: TreeNodeData
    dropNode: TreeNodeData
    dropPosition: number
  }) => void
  /**
   * 是否默认展开所有,false
   */
  defaultExpandAll?: boolean
  /**
   * 是否默认展开根节点,true
   */
  defaultExpandRoot?: boolean
  /**
   * 是否默认展开已选中节点的父节点,true
   */
  defaultExpandSelected?: boolean

  virtualListProps?: {
    /**
     * 可视区域高度
     */
    height: number | string
    /**
     * 开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。
     */
    threshold?: number
    /**
     * 元素高度是否是固定的。
     * @default false
     */
    fixedSize?: boolean
    /**
     * 元素高度不固定时的预估高度。
     */
    estimatedSize?: number
    /**
     * 视口边界外提前挂载的元素数量。
     * @default 10
     */
    buffer?: number
  }
  /**
   * 树节点图标自定义
   */
  iconRender?: (node: any) => VNode
  /**
   * 树节点右侧自定义
   */
  rightRender?: (node: any) => VNode
}
