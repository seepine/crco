# 最精简用法

## 一、crud设计
> 本章讲述如何精简封装crud功能，以快速实现集成权限控制、业务逻辑清晰的表格功能

以用户管理为例，设计如下
### 1.接口设计
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
  path: '/sys/system/user',
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
    :option="option"
    :permissions="{
      addBtn: permissions['sys_system_user_add'],
      editBtn: permissions['sys_system_user_edit'],
      delBtn: permissions['sys_system_user_del'],
    }"
  >
  </c-table>
</template>
<script setup lang="ts">
import option from './option'

const permissions = ref([]) // 用户的权限，根据自己实际获取
</script>
```

## 三、角色管理

同理角色管理也只需配置文件和页面文件即可

### 1.配置代码
`role/option.ts`
```ts
export default {
  path: '/sys/system/role',
  pagePath:'page/res',  // 表示分页的接口地址为 GET：/sys/system/role/page/res
  addPath: 'add', // 表示新增的接口地址为 POST：/sys/system/role/add
  editPath: 'custom/edit/', // 表示修改的接口地址为 PUT：/sys/system/role/custom/edit/
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
    :option="option"
    :permissions="{
      addBtn: permissions['sys_system_role_add'],
      editBtn: permissions['sys_system_role_edit'],
      delBtn: permissions['sys_system_role_del'],
    }"
  >
  </c-table>
</template>
<script setup lang="ts">
import option from './option'

const permissions = ref([]) // 用户的权限，根据自己实际获取
</script>
```

## 四、...

到此相信你已经学会如何运用`crco`来快速实现表格功能了，enjoy!
