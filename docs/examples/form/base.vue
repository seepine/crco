<template>
  <c-form :option="option" @submit="handleSubmit" />
</template>
<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

const option = {
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
      type: 'number',
      onChange: (val, form) => {
        return new Promise((RES) => {
          console.log('触发年龄onChange', val, form)
          setTimeout(() => {
            RES({
              ...form,
              fullName: `姓名随年龄变化：${val}`
            })
          }, 1000)
        })
      }
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
      ],
      onChange: (item, form) => {
        console.log('触发爱好onChange', item, form)
        return {
          ...form,
          fullName: `姓名随着爱好变化：${item.label}`
        }
      }
    },
    {
      name: '特长',
      prop: 'specialty',
      value: ['唱歌'],
      type: 'tag'
    },
    {
      name: '特长2',
      prop: 'specialty2',
      value: [0, 2],
      dicData: [
        { value: 0, label: '唱歌' },
        { value: 1, label: '跳舞' },
        { value: 2, label: '打篮球' }
      ],
      type: 'checkbox'
    },
    {
      name: '进度',
      prop: 'progress',
      type: 'slider'
    },
    {
      name: '介绍',
      span: 24,
      prop: 'description',
      type: 'textarea'
    },
    {
      name: 'markdown介绍',
      span: 24,
      prop: 'mdDescription',
      type: 'md',
      onUpload: (e) => {
        return new Promise((RES, REJ) => {
          console.log(e.files)
          console.log(e.ctx.getValue())
          console.log(e.ctx.setValue(`${e.ctx.getValue()},新增的`))
          REJ(Error('上传失败'))
        })
      }
    }
  ]
}

const handleSubmit = (data: any, done: Function) => {
  Message.success(JSON.stringify(data))
  // 可防重提交
  setTimeout(() => {
    done()
  }, 1000)
}
</script>
