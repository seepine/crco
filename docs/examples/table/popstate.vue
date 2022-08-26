<template>
  <c-table :option="option" @load="handleLoad"></c-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'

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
      dicData: ['男', '女']
    },
    {
      name: '年龄',
      prop: 'age',
      type: 'number'
    }
  ]
}
const data = ref([
  {
    fullName: '张三',
    gender: '男',
    age: 28
  }
])
const handleLoad = (params: any, done: Function) => {
  done({
    total: data.value.length,
    records: data.value
  })
}
</script>
