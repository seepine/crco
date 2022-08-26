<template>
  <c-table :option="option" @load="handleLoad"></c-table>
</template>
<script setup lang="ts">
import { h } from 'vue'

const option = {
  menuProps: {
    width: 220
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
      dicData: ['男', '女'],
      formatValue: (record: any) => h('span', `性别：${record.gender}`)
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
    }
  ]
}
const data = [
  {
    fullName: '张三',
    gender: '男',
    age: 28,
    birthday: '2000-11-19'
  }
]
const handleLoad = (params: any, done: Function) => {
  setTimeout(() => {
    done({
      total: data.length,
      records: data
    })
  }, 1000)
}
</script>
