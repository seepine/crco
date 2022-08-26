# 最精简用法

## 一、crud设计
> 本章讲述如何精简封装crud功能，以快速实现集成权限控制、业务逻辑清晰的表格功能

以用户管理为例，设计如下
### 1.接口设计
> 所有接口的Method和路径都可以自定义，具体请看最后的TypeScript章节

- 获取分页`/sys/system/user/page`
- 新增POST：`/sys/system/user`
- 编辑PUT:`/sys/system/user`
- 删除DELETE:`/sys/system/user`

### 2.权限设计
- `sys_system_user_add`
- `sys_system_user_edit`
- `sys_system_user_del`

## 二、用户管理
此时只需要`option`和`vue`两个简单文件即可实现完整的表格功能，例如下方举例的用户管理

### 1.配置代码
`user/option.ts`
```ts
export default {
  // 此处为后端路径
  api: {
    base: '/sys/user'
  },
  // 用户所拥有的所有权限
  permissions: user.permissions,
  // 当前模块权限前缀，最终会解析成 sys_user_add,sys_user_edit 对应到新增按钮、编辑按钮
  permissionPrefix:'sys_user_',
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
  <c-table :option="option"></c-table>
</template>
<script setup lang="ts">
import option from './option'
</script>
```

## 三、角色管理

同理角色管理也只需配置文件和页面文件即可

### 1.配置代码
`role/option.ts`
```ts
export default {
    // 此处为后端路径
  api: {
    base: '/sys/role',
    page: '/page/res',  // 表示分页的接口地址为 GET：/sys/role/page/res
    editPath: '/custom/edit', // 表示编辑的接口地址为 PUT：/sys/role/custom/edit
    editMethod: 'POST',    // 编辑接口将改为POST请求
  },
  // 用户所拥有的所有权限
  permissions: user.permissions,
  // 当前模块权限前缀，最终会解析成 sys_role_add,sys_role_edit 对应到新增按钮、编辑按钮
  permissionPrefix:'sys_role_',
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
  <c-table :option="option"></c-table>
</template>
<script setup lang="ts">
import option from './option'
</script>
```

## 四、全局自定义

可以在main.js/ts中全局配置crud，例如将所有分页、新增、编辑、删除、字典等http请求，全部改为POST
```js
app.use(crco, {
    axios,
    method: 'POST'
  })
```
更多支持请查看CrcoOptions中的method类型
```ts
export type { CrcoOptions } from 'crco/src/types'

export interface CrcoOptions {
  componentPrefix?: string
  axios?: AxiosInstance
  // default 'RESTFul'
  method?: RequestMethod
}
```


## 五、...

到此相信你已经学会如何运用`crco`来快速实现表格功能了，enjoy!
