<template>
  <c-form :option="option" @submit="handleSubmit">
    <!-- 插槽名同prop值，且可通过form接受表单对象 -->
    <template #phone="{ form }">
      <a-input v-model="form.phone">
        <template #append>
          <a-button type="primary" status="success" @click="sendCode(form.phone)"
            >发送验证码</a-button
          >
        </template>
      </a-input>
    </template>
  </c-form>
</template>
<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

const option = {
  span: 24,
  columns: [
    {
      name: '手机号',
      prop: 'phone',
      placeholder: '请输入手机号'
    },
    {
      name: '验证码',
      prop: 'code',
      placeholder: '请输入验证码'
    }
  ]
}
const sendCode = (phone: string) => {
  Message.success(`发送验证码给${phone}`)
}
const handleSubmit = (data: any, done: Function) => {
  Message.success(JSON.stringify(data))
  done()
}
</script>
<style>
.arco-input-append,
.arco-input-prepend {
  padding: 0;
}
</style>
