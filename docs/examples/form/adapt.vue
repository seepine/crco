<template>
  <c-form :option="option" @submit="handleSubmit" />
</template>
<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

const option = {
  span: {
    xxl: 6, // 默认8
    xl: 6, // 默认12
    lg: 12, // 默认12
    md: 24, // 默认24
    sm: 12, // 默认24
    xs: 24 // 默认24
  }, // 也可设置全局span，但优先级低于columns内的span
  // span:{
  //  md:24
  // },
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
      name: '介绍',
      prop: 'description',
      type: 'textarea',
      // 优先级高于根span
      span: 24
    }
  ]
}

const handleSubmit = (data: any, done: Function) => {
  Message.success(JSON.stringify(data))
  done()
}
</script>
