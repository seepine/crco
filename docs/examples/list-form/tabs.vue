<template>
  <c-list-form :option="option" @load="handleLoad">
    <!-- 通过插槽自定义每个tab，record可取到当前选择数据-->
    <template #detailInfo="{ record }">
      <a-card>{{ record }}</a-card>
    </template>
  </c-list-form>
</template>
<script setup lang="ts">
const allPermissions = ['sys_user_detail_info']

const option = {
  // 也和表格一样，支持api参数，无需自己写请求和事件
  // api: {
  //   base:'/xxx/xxx',
  //   fetch:'xxx'     //请求数据的接口，需返回数组
  // },

  // 配置props控制关键字段
  // rowKey: 'id',
  props: {
    name: 'fullName'
  },
  tabsProps: {
    baseTitle: '基础信息',
    columns: [
      {
        title: '详细信息',
        slotName: 'detailInfo', // 插槽名
        permission: 'sys_user_detail_info' // 可以指定改tab需要哪些权限(需要option的permissions参数传入权限列表)
      }
    ]
  },
  // 用户所拥有的权限权限列表
  permissions: allPermissions,
  columns: [
    {
      name: '姓名',
      prop: 'fullName'
    },
    {
      name: '性别',
      prop: 'gender',
      type: 'radio',
      dicData: ['男', '女']
    },
    {
      name: '年龄',
      prop: 'age',
      type: 'number'
    },
    {
      name: '生日',
      prop: 'birthday',
      type: 'date'
    },
    {
      name: '是否婚配',
      prop: 'isMarry',
      type: 'switch'
    },
    {
      name: '爱好',
      prop: 'hobby',
      type: 'select',
      dicData: [
        { value: 0, label: '唱歌' },
        { value: 1, label: '跳舞' },
        { value: 2, label: '打篮球' }
      ]
    },
    {
      name: '特长',
      prop: 'specialty',
      type: 'tag'
    },
    {
      name: '介绍',
      span: 24,
      prop: 'description',
      type: 'textarea'
    }
  ]
}

const handleLoad = (params: any, done: Function) => {
  done([
    { id: '1', fullName: '张三', hobby: 0 },
    { id: '2', fullName: '李四', hobby: 2 }
  ])
}
</script>
