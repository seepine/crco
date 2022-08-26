<template>
  <c-form :option="option" @submit="handleSubmit" v-model="form" />
</template>
<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { ref } from 'vue'

const form = ref({
  age: 70
})

const option = {
  columns: [
    {
      name: '姓名',
      prop: 'fullName',
      validateTrigger: ['change', 'input'],
      rules: [
        { required: true, message: '姓名不能为空' },
        { maxLength: 5, message: '姓名不能超过5个字' }
      ]
    },
    {
      name: '性别',
      prop: 'gender',
      type: 'radio',
      dicData: ['男', '女'],
      rules: [{ required: true, message: '性别不能为空' }]
    },
    {
      name: '年龄',
      prop: 'age',
      type: 'number',
      rules: [
        { required: true, message: '年龄不能为空' },
        { type: 'number', max: 200, message: '年龄不能超过200岁' }
      ]
    },
    {
      name: '爱好',
      prop: 'hobby',
      type: 'select',
      dicData: [
        { value: 0, label: '唱歌' },
        { value: 1, label: '跳舞' },
        { value: 2, label: '打篮球' }
      ],
      tooltip: '超过60岁爱好不能选择打篮球',
      rules: [
        { required: true, message: '爱好不能为空' },
        {
          validator: (value: number, callback: Function) => {
            if (form.value.age > 60 && value === 2) {
              callback('超过60岁不能再打篮球了!')
            } else {
              callback()
            }
          }
        }
      ]
    }
  ]
}

const handleSubmit = (data: any, done: Function) => {
  Message.success(JSON.stringify(data))
  done()
}
</script>
