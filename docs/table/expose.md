# 实例方法

通过 `ref` 拿到 `<c-table />` 实例后，可以调用如下方法。

```vue
<template>
  <c-table ref="tableRef" :option="option" @load="handleLoad" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()

function handleLoad(params: any, done: Function) {
  // ...省略
}
</script>
```

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `load(reset?: boolean, done?: Function)` | 重新加载数据，`reset = true` 时回到第一页 | — |
| `add(data?: any)` | 触发新增弹窗，`data` 可作为初始值 | — |
| `operate(type, data)` / `operation(type, data)` | 触发某个操作，`type` 为 `view` / `add` / `edit` / `del` 之一 | — |
| `clearSelections()` | 清空表格勾选状态 | — |
| `getData()` | 获取当前页表格数据（**返回 ref 引用，请勿直接修改**） | `any[]` |
| `getColumns()` | 获取当前表格实际渲染的列配置（详见下文） | `TableColumn[]` |
| `getSelectionData()` | 获取已勾选的数据行 | `any[]` |
| `getParams()` | 获取当前请求参数（search + props.params + 列过滤/排序等） | `Record<string, any>` |

除 `ref` / `form` / `formRef` / `aTableRef` / `currentMode` 这些响应式引用可直接读取外，其它都是方法。

## getColumns

获取**当前实际渲染**的列配置。返回值是经过以下处理后的最终结果：

1. 按 `option.columns` 配置顺序展开
2. 经过 `filterDisplay` 权限/显示规则过滤（`displayChange === true` 的列即使被过滤也会保留在齿轮按钮里）
3. 应用 `changeColumnCache`（localStorage 或自定义函数）的列顺序
4. 应用用户通过齿轮按钮进行的拖拽排序与显隐
5. 每项补上 `display` 字段（`true` / `false`）

> 与 `option.columns` 的区别：`option.columns` 是**配置**，`getColumns()` 是**运行时**用户实际看到的列（顺序、可见性都可能被用户改过）。

### 返回值

`TableColumn[]`，即 `crco/src/types/table.ts` 中导出的 `TableColumn`，定义如下：

```ts
type TableColumn = FormColumn & TableColumnProps
```

每一项包含 `prop` / `name` / `display` 等渲染所需的全部字段：`prop`、`name`、`width`、`fixed`、`align`、`ellipsis`、`sortable`、`filterable`、`cellStyle`、`headerCellStyle`、`bodyCellStyle` 等。

### 示例

#### 导出当前可见列

```ts
function exportCurrentColumns() {
  const cols = tableRef.value.getColumns()
  // 只取字段名
  const props = cols.map(c => c.prop).filter(Boolean)
  // 转表头
  const headers = cols.map(c => c.name)
  console.log({ props, headers })
}
```

#### 同步可见列到另一个表格

```ts
const targetOption = reactive<TableOption>({ columns: [] })

function syncColumns() {
  targetOption.columns = tableRef.value.getColumns()
}
```

### 注意

- 返回值经过 `deepClone` 深拷贝，**可直接修改返回的数组，不会影响表格内部状态**。
- 列顺序与表格当前显示顺序一致，可直接用于「导出可见列」「二次渲染」等场景。
- 若要拿原始配置，请用 `props.option.columns`。