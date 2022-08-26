<template>
  <c-form :option="option" @submit="handleSubmit" v-model="form" />
</template>
<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { onMounted, onUnmounted, ref } from 'vue'

const option = {
  columns: [
    {
      name: '姓名',
      prop: 'fullName',
      value: '你的名字' // 指定默认值
    },
    {
      name: '性别',
      prop: 'gender',
      type: 'radio',
      value: '男',
      dicData: ['男', '女']
    },
    {
      name: '性别2',
      prop: 'gender2',
      type: 'radio',
      value: 0,
      dicData: [
        { value: 0, label: '男' },
        { value: 1, label: '女' }
      ]
    },
    {
      name: '爱好',
      prop: 'hobby',
      type: 'select',
      value: 2,
      dicData: [
        { value: 0, label: '唱歌' },
        { value: 1, label: '跳舞' },
        { value: 2, label: '打篮球' }
      ]
    },
    {
      name: '年龄',
      prop: 'age',
      type: 'number'
    }
  ]
}

const form = ref({
  age: 18
})

const handleSubmit = (data: any, done: Function) => {
  Message.success(JSON.stringify(form.value))
  done()
}

let timer: any
onMounted(() => {
  timer = setInterval(() => {
    form.value.age += 1
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>
