<template>
  <!--
    还有如下crud事件
    @add="handleAdd"
    @edit="handleEdit"
    @del="handleDel"
   -->
  <c-list-form :option="option" @load="handleLoad" @edit="handleEdit"> </c-list-form>
</template>
<script setup lang="ts">
// 可引入类型，查看支持的参数
import type { ListFormOption } from 'crco/src/types/list-form'

const option: ListFormOption = {
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

const handleEdit = (data: any, done: Function) => {
  // 请求后端进行数据修改
  setTimeout(() => {
    console.log(data)
    done()
  }, 1000)
}
</script>
