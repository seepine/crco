<template>
  <c-table :option="option" @load="handleLoad">
    <!-- 通过record获取对象，column获取配置信息 -->
    <template #gender="{ record, column }">
      <a-tag color="blue">{{ column.prop + ':' + record.gender }}</a-tag>
    </template>
  </c-table>
</template>
<script setup lang="ts">
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
</script>
