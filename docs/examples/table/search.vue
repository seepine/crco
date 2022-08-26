<template>
  <c-table :option="option" @load="handleLoad"></c-table>
</template>
<script setup lang="ts">
import { nextTick, ref } from 'vue'

const option = {
  searchOption: {
    columns: [
      {
        name: '性别',
        prop: 'gender',
        type: 'radio',
        dicData: ['男', '女']
      }
    ]
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
    }
  ]
}
const data = ref<Array<any>>([])
for (let i = 0; i < 11; i += 1) {
  data.value.push({
    id: i,
    fullName: '张三',
    gender: i % 2 === 0 ? '男' : '女',
    age: 20 + i,
    birthday: '2000-11-19'
  })
}

const loadPage = (params: any, list: Array<any>) => {
  console.log('load params', params)
  // 模拟后端数据库搜素，真实情况由后端返回数据
  const arr: Array<any> = []
  list.forEach((item: any) => {
    if (params.gender) {
      if (item.gender === params.gender) {
        arr.push(item)
      }
    } else {
      arr.push(item)
    }
  })
  const size = params.size || 10
  const theCurrent = params.current && params.current > 0 ? params.current : 1
  const start = (theCurrent - 1) * size
  const end = theCurrent * size
  const total = arr.length
  return {
    records: end <= total ? arr.slice(start, end) : arr.slice(start, total),
    total,
    size,
    current: theCurrent
  }
}

const handleLoad = (params: any, done: Function) => {
  nextTick(() => {
    setTimeout(() => {
      done(loadPage(params, data.value))
    }, 1000)
  })
}
</script>
