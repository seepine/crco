# 支持 TypeScript

> 当 ts 项目时，还可以引入提供的类型，更加方便开发，省去频繁查询文档/源码

## 一、定义 type 文件

创建 type.ts 文件，按需引入 crco 提供的类型

```ts
export type { CrcoOptions, RequestMethod, ResponsiveValue } from 'crco/src/types'
export type { FormColumn, DicItem, OnChange } from 'crco/src/types/column'
export type { FormOption } from 'crco/src/types/form'
export type { TableOption, TableColumn } from 'crco/src/types/table'
export type { PageCallback, PageRes } from 'crco/src/types/page'
```

## 二、在表单或表格中使用

例如表格的`options.ts`文件中使用

```ts
import { useUserStore } from '@/store/user'
import { FormOption } from '@/types'

const userStore = useUserStore()
const option: FormOption = {
  layout: 'vertical',
  columns: [
    {
      name: '角色名',
      prop: 'name'
    },
    {
      name: '角色描述',
      prop: 'description',
      type: 'textarea'
    }
  ]
}
export default option
```
