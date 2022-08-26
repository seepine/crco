<template>
  <c-form :option="option" @submit="handleSubmit" />
</template>
<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

const option = {
  groups: [
    {
      title: '基础信息',
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
        }
      ]
    },
    {
      title: '其他信息',
      columns: [
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
          value: ['唱歌'],
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
  ]
}

const handleSubmit = (data: any, done: Function) => {
  Message.success(JSON.stringify(data))
  // 可防重提交
  setTimeout(() => {
    done()
  }, 1000)
}
</script>
