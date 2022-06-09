<template>
  <a-input
    v-bind="column"
    v-if="
      !column.type || column.type === 'input' || column.type === 'text' || column.type === 'icon'
    "
    v-model="form[column.prop]"
    class="full-width"
  />
  <a-input-password
    v-if="column.type === 'password'"
    v-model="form[column.prop]"
    class="full-width"
  />
  <a-input-tag
    v-bind="column"
    v-if="column.type === 'tag' || column.type === 'tags'"
    v-model="form[column.prop]"
    class="full-width"
  />
  <a-textarea
    v-bind="column"
    v-if="column.type === 'textarea'"
    v-model="form[column.prop]"
    class="full-width"
  ></a-textarea>
  <a-input-number
    v-bind="column"
    v-if="column.type === 'number'"
    v-model="form[column.prop]"
    :default-value="form[column.prop]"
    type="text"
    class="full-width"
  />
  <c-radio v-if="column.type === 'radio'" v-model="form[column.prop]" :option="column"></c-radio>
  <c-select
    v-if="column.type === 'select'"
    v-model="form[column.prop]"
    v-model:form="form"
    :option="column"
    class="full-width"
  ></c-select>
  <a-switch v-if="column.type === 'switch'" v-model="form[column.prop]" />
  <c-upload
    v-if="column.type === 'upload'"
    v-model="form[column.prop]"
    :option="column"
    class="full-width"
  ></c-upload>
  <a-date-picker
    v-bind="column"
    v-if="column.type === 'date' || column.type === 'datetime'"
    :show-time="column.type === 'datetime'"
    v-model="form[column.prop]"
  />
  <a-week-picker
    v-bind="column"
    v-if="column.type === 'week'"
    v-model="form[column.prop]"
    class="full-width"
  />
  <a-month-picker v-bind="column" v-if="column.type === 'month'" v-model="form[column.prop]" />
  <a-year-picker v-bind="column" v-if="column.type === 'year'" v-model="form[column.prop]" />
  <a-quarter-picker v-bind="column" v-if="column.type === 'quarter'" v-model="form[column.prop]" />
  <a-range-picker v-bind="column" v-if="column.type === 'daterange'" v-model="form[column.prop]" />
</template>
<script></script>

<script lang="ts" setup>
import { computed } from 'vue'
import {
  Input as AInput,
  InputNumber as AInputNumber,
  InputPassword as AInputPassword,
  Textarea as ATextarea,
  Switch as ASwitch,
  DatePicker as ADatePicker,
  WeekPicker as AWeekPicker,
  MonthPicker as AMonthPicker,
  YearPicker as AYearPicker,
  QuarterPicker as AQuarterPicker,
  RangePicker as ARangePicker
} from '@arco-design/web-vue'
import CRadio from '../radio/index.vue'
import CSelect from '../select/index.vue'
import CUpload from '../upload/index.vue'

const props = defineProps<{
  value: any
  column: any
}>()
const emit = defineEmits<{
  (event: 'upload:modelValue', p_val: any): void
  (event: 'change', p_val: any): void
}>()

const form = computed({
  get: () => {
    return props.value
  },
  set: (value) => {
    emit('change', value)
  }
})
</script>
<style scoped>
.crco-form-item-content {
  width: 100%;
}
.full-width {
  width: 100%;
}
</style>
