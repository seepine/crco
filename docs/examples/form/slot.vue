<template>
  <c-form :option="option" @submit="handleSubmit">
    <!-- 插槽名同prop值，且可通过form接受表单对象 -->
    <template #phone="{ form }">
      <a-input v-model="form.phone">
        <template #append>
          <c-button
            type="primary"
            status="success"
            @click="(done) => sendCode(form.phone, done)"
            countdownTime="5"
            >{{ isSend ? '发送中' : '发送验证码' }}</c-button
          >
        </template>
      </a-input>
    </template>
  </c-form>
</template>
<script setup lang="ts">
import { Message, Input as AInput } from '@arco-design/web-vue'
import { h, ref } from 'vue'

const option = {
  span: 24,
  columns: [
    {
      name: '手机号',
      prop: 'phone',
      value: '10086',
      placeholder: '请输入手机号'
    },
    {
      name: '验证码',
      prop: 'code',
      placeholder: '请输入验证码'
    },
    {
      name: '验证码2',
      prop: 'code',
      // 也可以通过option自定义
      type: (form: any) =>
        h(AInput, {
          modelValue: form.code2,
          'onUpdate:modelValue': (val) => {
            // eslint-disable-next-line no-param-reassign
            form.code2 = val
          }
        })
    }
  ]
}
const isSend = ref(false)
const sendCode = (phone: string, done: Function) => {
  isSend.value = true
  Message.success(`发送验证码给${phone}`)
  setTimeout(() => {
    Message.success(`发送成功`)
    isSend.value = false
    done()
  }, 2000)
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
