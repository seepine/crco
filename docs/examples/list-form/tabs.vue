<template>
  <c-list-form :option="option">
    <!-- 可以使用item插槽自定义 -->
    <!-- <template #item="{ item, index }"> {{ item }}</template> -->
  </c-list-form>
</template>
<script setup lang="ts">
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
    },
    {
      name: '特长',
      prop: 'specialty',
      value: ['唱歌'],
      type: 'tag'
    },
    {
      name: '介绍',
      span: 24,
      prop: 'description',
      type: 'textarea'
    }
  ]
}
</script>
