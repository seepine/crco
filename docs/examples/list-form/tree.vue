<template>
  <!--
    还有如下crud事件
    @add="handleAdd"
    @edit="handleEdit"
    @del="handleDel"
   -->
  <c-list-form :option="option" @load="handleLoad"> </c-list-form>
</template>
<script setup lang="ts">
const option = {
  // 也和表格一样，支持api参数，无需自己写请求和事件
  // api: {
  //   base:'/xxx/xxx',
  //   fetch:'xxx'     //请求数据的接口，需返回数组
  // },
  isTree: true, // 需要开启树结构
  columns: [
    {
      name: '部门',
      prop: 'name'
    },
    {
      name: '描述',
      prop: 'description',
      type: 'textarea'
    }
  ]
}

const handleLoad = (params: any, done: Function) => {
  done([
    {
      id: '1',
      name: '行政中心',
      children: [
        { id: '2', name: '行政部' },
        { id: '3', name: '总经办' }
      ]
    },
    { id: '4', name: '财务部' }
  ])
}
</script>
