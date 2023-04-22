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
import { nextTick, ref } from 'vue'

const option = {
  exportBtn: {
    onClick: (params: any, done: Function) => {
      console.log(params)
      // return new Promise<void>((RES, REJ) => {
      //   console.log(params)
      //   setTimeout(() => {
      //     RES()
      //   }, 2000)
      // })
      setTimeout(() => {
        done()
      }, 2000)
    }
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
      ],
      onChange: (val, item, record) => {
        console.log('触发onChange', val, item, record)
        // eslint-disable-next-line no-param-reassign
        record.fullName = `姓名随着爱好变化：${item.label}`
        return record
      }
    }
  ]
}
const data = ref<Array<any>>([])
for (let i = 0; i < 11; i += 1) {
  data.value.push({
    id: i,
    fullName: '张三',
    gender: '男',
    age: 20 + i,
    birthday: '2000-11-19'
  })
}

const loadPage = (params: any, list: Array<any>) => {
  const size = params.size || 10
  const theCurrent = params.current && params.current > 0 ? params.current : 1
  const start = (theCurrent - 1) * size
  const end = theCurrent * size
  const total = list.length
  return {
    records: end <= total ? list.slice(start, end) : list.slice(start, total),
    total,
    size,
    current: theCurrent
  }
}

const handleLoad = (params: any, done: Function) => {
  console.log('load params:', params)
  nextTick(() => {
    setTimeout(() => {
      done(loadPage(params, data.value))
    }, 1000)
  })
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
