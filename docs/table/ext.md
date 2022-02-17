# 最精简封装

## 一、封装crud方法
> 本章讲述如何精简封装crud功能，以快速实现集成权限控制、业务逻辑清晰的表格功能

### 1.接口设计
- 获取分页`/sys/system/user/page`
- 新增POST：`/sys/system/user`
- 编辑PUT:`/sys/system/user`
- 删除DELETE:`/sys/system/user`

### 2.权限设计
- `sys_system_user_add`
- `sys_system_user_edit`
- `sys_system_user_del`

### 3.通用crud设计
`crud.ts`文件，可直接拷贝到项目中使用，替换40行的权限获取即可
```ts
import store from '@/store'
import axios from '@/utils/axios'

interface Option {
  // eg:/sys/system/user
  path: string
  // eg:page/res 前面会自动拼接上 `${path}/`
  pagePath?: string
  pathThen?: Function
  // eg:add 前面会自动拼接上 `${path}/`
  addPath?: string
  // eg:edit 前面会自动拼接上 `${path}/`
  editPath?: string
  // eg:del 前面会自动拼接上 `${path}/`
  delPath?: string
  // eg:sys_system_menu , 会自动返回cud对应权限，如addBtn:sys_system_user_add
  permission?: string
}
export default (config: Option) => {
  // TODO 用户所有权限，需修改
  const vuexPermissions = store.getters.permissions


  const { path, pagePath, pathThen, addPath, editPath, delPath, permission } = config
  const handleLoad = (params: any, done: Function) => {
    axios
      .get(`${path}/${pagePath || 'page'}`, params)
      .then((res: any) => {
        if (pathThen) {
          pathThen(params, done, res)
        } else {
          done(res)
        }
      })
      .catch(() => done())
  }
  const handleAdd = (data: any, done: Function) => {
    axios
      .post(`${path}/${addPath || ''}`, data)
      .then(() => {
        done()
      })
      .catch((err: any) => {
        done(err)
      })
  }
  const handleDel = (row: any, done: Function) => {
    axios
      .delete(`${path}/${delPath || ''}${row.id}`)
      .then(() => {
        done()
      })
      .catch((err: any) => {
        done(err)
      })
  }
  const handleEdit = (data: any, done: Function) => {
    axios
      .put(`${path}/${editPath || ''}`, data)
      .then(() => {
        done()
      })
      .catch((err: any) => {
        done(err)
      })
  }
  return {
    permissions: permission
      ? {
          ...vuexPermissions,
          addBtn: !!vuexPermissions[`${permission}_add`],
          editBtn: !!vuexPermissions[`${permission}_edit`],
          delBtn: !!vuexPermissions[`${permission}_del`]
        }
      : { ...vuexPermissions, addBtn: true, editBtn: true, delBtn: true },
    handleLoad,
    handleAdd,
    handleEdit,
    handleDel
  }
}
```

## 二、用户管理
此时只需要`option`和`vue`两个简单文件即可实现完整的表格功能，例如下方举例的用户管理

### 1.配置代码
`user/option.ts`
```ts
export default {
  columns: [
    {
      name: '用户名',
      prop: 'username'
    },
    {
      name: '姓名',
      prop: 'fullName'
    },
    {
      name: '密码',
      prop: 'password'
    },
    {
      name: '角色',
      prop: 'roleIds',
      type: 'select',
      dicUrl: '/sys/system/role/list',
      props: {
        value: 'id',
        label: 'name'
      }
    }
  ]
}
```
### 2.页面代码
`user/index.vue`
```vue
<template>
  <c-table
    @load="handleLoad"
    @add="handleAdd"
    @edit="handleEdit"
    @del="handleDel"
    :option="option"
    :permissions="permissions"
  >
  </c-table>
</template>
<script setup lang="ts">
import crud from '@/util/crud'
import option from './option'

const { handleLoad, handleAdd, handleEdit, handleDel, permissions } = crud({
  path: '/sys/system/user',
  permission: 'sys_system_user'
})
</script>
```

## 三、角色管理

同理角色管理也只需配置文件和页面文件即可

### 1.配置代码
`role/option.ts`
```ts
export default {
  columns: [
    {
      name: '角色名',
      prop: 'name'
    },
    {
      name: '角色描述',
      prop: 'description',
      type: 'textarea',
    }
  ]
}
```
### 2.页面代码
`role/index.vue`
```vue
<template>
  <c-table
    @load="handleLoad"
    @add="handleAdd"
    @edit="handleEdit"
    @del="handleDel"
    :option="option"
    :permissions="permissions"
  >
  </c-table>
</template>
<script setup lang="ts">
import crud from '@/util/crud'
import option from './option'

// 当接口地址需要自定义时，可通过传参改变
const { handleLoad, handleAdd, handleEdit, handleDel, permissions } = crud({
  path: '/sys/system/role',
  pagePath:'page/res',  // 表示分页的接口地址为 GET：/sys/system/role/page/res
  addPath: 'add', // 表示新增的接口地址为 POST：/sys/system/role/add
  editPath: 'edit', // ...
  permission: 'sys_system_role'
})
</script>
```

## 四、...

到此相信你已经学会如何运用`crud`结合`crco`来快速实现表格功能了，enjoy!
