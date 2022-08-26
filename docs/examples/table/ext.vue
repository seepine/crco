<template>
  <c-table
    :option="option"
    @load="handleLoad"
    @add="handleAdd"
    @edit="handleEdit"
    @del="handleDel"
  ></c-table>
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
    },
    {
      name: '生日',
      prop: 'birthday',
      type: 'date',
      width: 120 // 可手动调整宽度
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
    fullName: '张三',
    gender: '男',
    age: 28,
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

const handleAdd = (record: any, done: Function) => {
  data.value.push(record)
  done()
  // done(false) 若调用后端失败，可done(false)，表示添加失败
}

const handleEdit = (record: any, done: Function) => {
  // record.rowIndex 可以获取当前行的索引
  data.value[record.rowIndex] = record
  done()
}
const handleDel = (record: any, done: Function) => {
  data.value.splice(record.rowIndex, 1)
  done()
}
</script>
