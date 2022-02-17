<template>
  <div class="crco-form-item-content">
    <a-input
      v-bind="column"
      v-if="
        !column.type || column.type === 'input' || column.type === 'text' || column.type === 'icon'
      "
      v-model="form[column.prop]"
    />
    <a-input-password v-if="column.type === 'password'" v-model="form[column.prop]" />
    <a-textarea
      v-bind="column"
      v-if="column.type === 'textarea'"
      v-model="form[column.prop]"
    ></a-textarea>
    <a-input-number
      v-bind="column"
      v-if="column.type === 'number'"
      v-model="form[column.prop]"
      :default-value="form[column.prop]"
      type="text"
    />
    <c-radio v-if="column.type === 'radio'" v-model="form[column.prop]" :option="column"></c-radio>
    <c-select
      v-if="column.type === 'select'"
      v-model="form[column.prop]"
      :option="column"
    ></c-select>
    <a-switch v-if="column.type === 'switch'" v-model="form[column.prop]" />
    <c-upload
      v-if="column.type === 'upload'"
      v-model="form[column.prop]"
      :option="column"
    ></c-upload>
    <a-date-picker
      v-bind="column"
      v-if="column.type === 'date' || column.type === 'datetime'"
      :show-time="column.type === 'datetime'"
      v-model="form[column.prop]"
      style="width: 100%"
    />
    <a-week-picker
      v-bind="column"
      v-if="column.type === 'week'"
      v-model="form[column.prop]"
      style="width: 100%"
    />
    <a-month-picker
      v-bind="column"
      v-if="column.type === 'month'"
      v-model="form[column.prop]"
      style="width: 100%"
    />
    <a-year-picker
      v-bind="column"
      v-if="column.type === 'year'"
      v-model="form[column.prop]"
      style="width: 100%"
    />
    <a-quarter-picker
      v-bind="column"
      v-if="column.type === 'quarter'"
      v-model="form[column.prop]"
      style="width: 100%"
    />
    <a-range-picker
      v-bind="column"
      v-if="column.type === 'daterange'"
      v-model="form[column.prop]"
      style="width: 100%"
    />
  </div>
</template>
<script setup lang="ts">
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
  modelValue: any
  column: any
}>()
const emit = defineEmits<{ (event: 'upload:modelValue', p_value: any): void }>()
const form = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emit('upload:modelValue', value)
  }
})
</script>
<style scoped>
.crco-form-item-content {
  width: 100%;
}
</style>
