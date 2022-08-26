<template>
  <c-form :option="option" @submit="handleSubmit" />
</template>
<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

const option = {
  span: 24,
  columns: [
    {
      name: '文件列表',
      prop: 'fileList',
      type: 'upload',
      action: '/file/upload' // 请替换为真实的上传地址
    },
    {
      name: '图片文件列表',
      prop: 'pictureList',
      type: 'upload',
      listType: 'picture', // 指定类型
      autoUpload: false // 关闭自动上传
    },
    {
      name: '图片卡片列表',
      prop: 'pictureCardList',
      type: 'upload',
      listType: 'picture-card',
      autoUpload: false
    },
    {
      name: '头像',
      prop: 'avatarUrl',
      type: 'upload',
      listType: 'picture-card',
      autoUpload: false,
      limit: 1, // 限制文件数
      urlOnly: true // 仅返回图片url，一般用于图片类型文件上传
    },
    {
      name: '字符串文件列表',
      prop: 'stringFileList',
      type: 'upload',
      stringify: true, // 当传入对象为字符串或配置了stringify，结果将返回为json字符串，一般用于直接对接后端为String类型，无需手动再转换，可直接存到数据
      autoUpload: false
    }
  ]
}

const handleSubmit = (data: any, done: Function) => {
  Message.success('数据复杂，请看控制台')
  /* eslint-disable no-console */
  console.log(data)
  done()
}
</script>
