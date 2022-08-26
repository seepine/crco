<template>
  <c-table :option="option" :before="handleBefore" @load="handleLoad"> </c-table>
</template>
<script setup lang="ts">
import { Notification } from '@arco-design/web-vue'
import { ref } from 'vue'

const option = {
  menuProps: {
    width: 220
  },
  dialog: true,
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
// eslint-disable-next-line no-unused-vars
const handleBefore = (type: string, record: any, done: Function) => {
  done()
  Notification.success('2秒后将自动返回表格状态')

  setTimeout(() => {
    window.history.back()
  }, 2000)
}
</script>
