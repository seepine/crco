import {
  PaginationProps,
  TableBorder,
  TableColumnData,
  TableData,
  TableExpandable,
  TableFilterable,
  TableRowSelection,
  TableSortable
} from '@arco-design/web-vue'
import { TableDraggable, TableOperationColumn } from '@arco-design/web-vue/es/table/interface'
import { VirtualListProps } from '@arco-design/web-vue/es/_components/virtual-list/interface'
import { CSSProperties } from 'vue'
import { ResponsiveValue } from '.'
import { ApiConfig } from './api'
import { FormColumn } from './column'
import { FormProps, FormOption } from './form'
import { MenuProps, PermissionProps } from './option'

/**
 * a-table props属性
 */
export interface TableProps {
  /**
   * false
   * 是否显示边框
   */
  bordered?: boolean | TableBorder
  /**
   * false
   * 是否显示选中效果
   */
  hoverable?: boolean
  /**
   * false
   * 是否开启斑马纹效果
   */
  stripe?: boolean
  /**
   * 'large'
   * 表格的大小
   */
  size?: 'mini' | 'small' | 'medium' | 'large'
  /**
   * false
   * 表格的 table-layout 属性设置为 fixed，设置为 fixed 后，表格的宽度不会被内容撑开超出 100%。
   */
  tableLayoutFixed?: boolean
  /**
   * 表格的行选择器配置
   */
  rowSelection?: TableRowSelection
  /**
   * 表格的展开行配置
   */
  expandable?: TableExpandable
  /**
   * 表格的滚动属性配置。2.13.0 版本增加字符型值的支持。2.20.0 版本增加 minWidth,maxHeight 的支持。
   */
  scroll?: {
    x?: number | string
    y?: number | string
    minWidth?: number | string
    maxHeight?: number | string
  }
  /**
   * true,分页的属性配置
   */
  pagination?: boolean | PaginationProps
  /**
   * 'br',分页选择器的位置
   */
  pagePosition?: 'tl' | 'top' | 'tr' | 'bl' | 'bottom' | 'br'
  /**
   * 16,树形表格的缩进距离
   */
  indentSize?: number
  /**
   * 'id',表格行 key 的取值字段
   */
  rowKey?: string
  /**
   * true,是否显示表头
   */
  showHeader?: boolean
  /**
   * 传递虚拟列表属性，传入此参数以开启虚拟滚动
   */
  virtualListProps?: VirtualListProps
  /**
   * 单元格合并方法（索引从数据项开始计数）
   */
  spanMethod?: (data: {
    record: TableData
    column: TableColumnData | TableOperationColumn
    rowIndex: number
    columnIndex: number
  }) => { rowspan?: number; colspan?: number } | void
  /**
   * false,是否让合并方法的索引包含所有
   */
  spanAll?: boolean
  /**
   * true,筛选图标是否左对齐
   */
  filterIconAlignLeft?: boolean
  /**
   * false
   * 是否在子树为空时隐藏展开按钮
   */
  hideExpandButtonOnEmpty?: boolean
  /**
   * 表格行元素的类名
   */
  rowClass?: string | any[] | Record<string, any> | ((record: TableData, rowIndex: number) => any)
  /**
   * 表格拖拽排序的配置
   */
  draggable?: boolean | TableDraggable
  /**
   * false
   * 是否允许调整列宽
   */
  columnResizable?: boolean
  /**
   * 显示表尾总结行
   */
  summary?: boolean | ((params: { columns: TableColumnData[]; data: TableData[] }) => TableData[])
  /**
   * 'Summary'
   * 总结行的首列文字
   */
  summaryText?: string
  /**
   * 总结行的单元格合并方法
   */
  summarySpanMethod?: (data: {
    record: TableData
    column: TableColumnData | TableOperationColumn
    rowIndex: number
    columnIndex: number
  }) => { rowspan?: number; colspan?: number } | void
  /**
   * false
   * 是否默认展开所有的行
   */
  defaultExpandAllRows?: boolean
  /**
   * false
   * 是否开启表头吸顶
   */
  stickyHeader?: boolean | number
}
/**
 * a-table-column props属性
 */
export interface TableColumnProps {
  /**
   * 列宽度
   */
  width?: number
  /**
   * 是否换行
   */
  nowrap?: boolean
  /**
   * 对齐方向
   */
  align?: string
  /**
   * 固定位置
   */
  fixed?: 'left' | 'right'
  /**
   * false,是否显示为省略
   */
  ellipsis?: boolean
  /**
   * false,在省略时是否显示文字提示
   * 取消此属性，跟随ellipsis
   */
  // tooltip?: boolean
  /**
   * 排序相关选项
   */
  sortable?: TableSortable
  /**
   * 过滤相关选项
   */
  filterable?: TableFilterable
  /**
   * 自定义单元格样式
   */
  cellStyle?: CSSProperties
  /**
   * 自定义表头单元格样式
   */
  headerCellStyle?: CSSProperties
  /**
   * 自定义内容单元格样式
   */
  bodyCellStyle?: CSSProperties | ((record: TableData) => CSSProperties)
  /**
   * 自定义总结栏单元格样式
   */
  summaryCellStyle?: CSSProperties | ((record: TableData) => CSSProperties)
}
/**
 * 菜单栏的props
 */
export type menuProps = { display?: boolean } & TableColumnProps
/**
 * 扩展table Props
 */
export interface TablePropsExt {
  /**
   * 菜单栏配置
   */
  menuProps?: menuProps
  /**
   * 跨越的格数，一行24
   */
  span?: number | ResponsiveValue
  /**
   * eg: /sys/system/user or ApiConfig
   */
  api?: string | ApiConfig
  /**
   * 搜索表单
   */
  searchOption?: FormOption & {
    /**
     *是否过滤空字符串搜索项，例如输入""，将会被变成undefined
     */
    notBlank?: boolean
  }

  /**
   * true
   * 是否显示为省略,列属性提权到全局
   */
  ellipsis?: boolean
  /**
   * true
   * 在省略时是否显示文字提示,列属性提权到全局
   */
  tooltip?: boolean | object
  /**
   * true
   * 是否不换行,列属性提权到全局
   */
  nowrap?: boolean
  /**
   * true
   * 是否默认加载数据
   */
  defaultLoadData?: boolean
}
export type TableColumn = FormColumn & TableColumnProps

export interface TableOption
  extends TableProps,
    TablePropsExt,
    FormProps,
    MenuProps,
    PermissionProps {
  /**
   * 列内容
   */
  columns: TableColumn[]
}
