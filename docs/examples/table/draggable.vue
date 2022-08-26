<template>
  <c-table :option="option" @load="handleLoad" @change="handleChange"></c-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const option = {
  draggable: { type: 'handle', width: 40 },
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
const data = ref([
  {
    id: '1',
    fullName: '张三',
    gender: '男',
    age: 11,
    birthday: '2000-11-19'
  },
  {
    id: '2',
    fullName: '张三',
    gender: '男',
    age: 22,
    birthday: '2000-11-19'
  },
  {
    id: '3',
    fullName: '张三',
    gender: '男',
    age: 33,
    birthday: '2000-11-19'
  },
  {
    id: '4',
    fullName: '张三',
    gender: '男',
    age: 44,
    birthday: '2000-11-19'
  },
  {
    id: '5',
    fullName: '张三',
    gender: '男',
    age: 55,
    birthday: '2000-11-19'
  },
  {
    id: '6',
    fullName: '张三',
    gender: '男',
    age: 66,
    birthday: '2000-11-19'
  }
])
const handleLoad = (params: any, done: Function) => {
  setTimeout(() => {
    done({
      total: data.value.length,
      records: data.value
    })
  }, 1000)
}
const handleChange = (type: string, event: any) => {
  console.log(type, event)
}
</script>
