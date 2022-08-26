<template>
  <c-table :option="option" @load="handleLoad" @selection-change="handleSelectionChange"></c-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const option = {
  rowSelection: {
    type: 'checkbox',
    showCheckedAll: true
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
    }
  ]
}

const data = ref<Array<any>>([])
for (let i = 0; i < 22; i += 1) {
  data.value.push({
    id: i,
    fullName: '张三',
    gender: '男',
    age: 20 + i,
    birthday: '2000-11-19'
  })
}

const handleLoad = (params: any, done: Function) => {
  setTimeout(() => {
    done({
      total: data.value.length,
      records: data.value
    })
  }, 1000)
}
const handleSelectionChange = (rowKeys: string[]) => {
  // eslint-disable-next-line no-console
  console.log(rowKeys)
}
</script>
