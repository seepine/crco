<template>
  <c-form :option="option" @submit="handleSubmit" />
</template>
<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

const option = {
  span: 24,
  columns: [
    {
      name: '性别',
      prop: 'gender',
      type: 'radio',
      help: '基础用法，指定dicData或dicUrl',
      dicData: ['男', '女']
      // dicUrl:'/get/dic/hobby',接口返回数据的格式和dicData一致即可
    },
    {
      name: '学历',
      prop: 'education',
      type: 'radio',
      help: '指定选项的value值',
      dicData: [
        { value: 0, label: '大专' },
        { value: 1, label: '本科' }
      ]
    },
    {
      name: '爱好',
      prop: 'hobby',
      type: 'select',
      help: '指定选项的prop',
      props: {
        value: 'id',
        label: 'name'
      },
      dicData: [
        { id: 'sing', name: '唱歌' },
        { id: 'dance', name: '跳舞' },
        { id: 'basketball', name: '打篮球' }
      ]
    }
  ]
}

const handleSubmit = (data: any, done: Function) => {
  Message.success(JSON.stringify(data))
  done()
}
</script>
