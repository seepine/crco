<h1 align="center" style="text-align:center;">
<img src="https://crco.seepine.com/logo.png" width="128" />
<br />
Crco
</h1>
<p align="center">
	<strong>一个配置驱动视图，基于Vue3和ArcoDesign的组件库，企业快速开发，个人外包必备</strong>
</p>
<p align="center">
	<a href="https://crco.seepine.com/">https://crco.seepine.com</a>
</p>

<p align="center">
  <a target="_blank" href="https://cn.vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.2+-green.svg" alt="vue3+" />
  </a>
  <a target="_blank" href="https://arco.design/vue/docs/start">
    <img src="https://img.shields.io/badge/Arco-2.30+-green.svg" alt="arco2.30+" />
  </a>
  <a target="_blank" href="https://github.com/seepine/crco/blob/main/LICENSE">
    <img src="https://img.shields.io/:license-MIT-blue.svg" alt="MIT" />
  </a>
  <a target="_blank" href='https://github.com/seepine/crco/stargazers'>
		<img src="https://img.shields.io/github/stars/seepine/crco.svg?logo=github" alt="github star"/>
	</a>
</p>


## 一、快速入门

### 1. npm 安装

#### 1.1 安装 crco

安装后请锁定版本号

```shell
npm i crco -D
```

#### 1.2 安装@arco-design/web-vue

`crco`基于`arco`封装，因此必须安装，且建议安装后锁定版本号

```shell
npm i @arco-design/web-vue -D
```

#### 1.3 安装 axios

`crco`使用`axios`发起请求，因此必须安装，若项目中自定义请求拦截，请将自定义的`axios`传给`crco`或赋值给`window.axios`

```shell
npm i axios
```

### 引入 crco

```js
import { createApp } from 'vue'
import App from './App.vue'

import Crco from 'crco'
import 'crco/dist/index.css'
import './utils/axios'

createApp(App)
  .use(Crco, {
    axios // 如果有自定义拦截的话，可传给crco
  })
  .mount('#app')
```

## 二、例子

### 2.1 表单

<a href="https://crco.seepine.com/form/base">
  <img src="https://s1.ax1x.com/2022/12/14/zIZRp9.png" alt="form.jpg" width="600"/>
</a>

```html
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
```

### 2.2 表格

<a href="https://crco.seepine.com/table/base">
  <img src="https://s1.ax1x.com/2022/12/14/zIZ3ef.png" alt="table.jpg" width="600"/>
</a>

```html
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
```

### 2.3 更多

更多使用方式请查看文档 [https://crco.seepine.com/](https://crco.seepine.com/)

## 三、贡献代码

1. Fork仓库，并克隆到本地
2. 执行`npm run pre`安装依赖
3. 修改代码后执行`npm run commit`提交代码
4. 发起合并请求

## 四、特别感谢 JetBrains 对开源项目支持

<a target="_blank" href="https://jb.gg/OpenSourceSupport">
  <img src="https://user-images.githubusercontent.com/8643542/160519107-199319dc-e1cf-4079-94b7-01b6b8d23aa6.png" align="left" height="100" width="100"  alt="JetBrains">
</a>
