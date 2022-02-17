<template>
  <c-table :option="option" @load="handleLoad" @edit="handleEdit">
    <!-- 通过record获取对象，column获取配置信息 -->
    <template #genderForm="{ record }">
      <c-select
        v-model="record.gender"
        :option="{
          dicData: ['男', '女', '未知', '自定义']
        }"
      />
    </template>
  </c-table>
</template>
<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

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

const handleEdit = (record: any, done: Function) => {
  Message.success(JSON.stringify(record))
  done()
}
</script>
