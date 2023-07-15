<template>
  <a-date-picker
    v-if="type === 'date' || type === 'datetime'"
    v-bind="option"
    v-model="value"
    :show-time="type === 'datetime'"
    :class="customClass"
    @change="handleChange"
  ></a-date-picker>
  <a-week-picker
    v-if="type === 'week'"
    v-bind="option"
    v-model="value"
    :class="customClass"
    @change="handleChange"
  ></a-week-picker>
  <a-month-picker
    v-if="type === 'month'"
    v-bind="option"
    v-model="value"
    :class="customClass"
    @change="handleChange"
  ></a-month-picker>
  <a-quarter-picker
    v-if="type === 'quarter'"
    v-bind="option"
    v-model="value"
    :class="customClass"
    @change="handleChange"
  ></a-quarter-picker>
  <a-year-picker
    v-if="type === 'year'"
    v-bind="option"
    v-model="value"
    :class="customClass"
    @change="handleChange"
  ></a-year-picker>
  <a-range-picker
    v-if="type === 'range'"
    v-bind="option"
    v-model="value"
    :class="customClass"
    @change="handleChange"
  ></a-range-picker>
</template>

<script setup lang="ts">
import {
  DatePicker as ADatePicker,
  WeekPicker as AWeekPicker,
  MonthPicker as AMonthPicker,
  YearPicker as AYearPicker,
  QuarterPicker as AQuarterPicker,
  RangePicker as ARangePicker
} from '@arco-design/web-vue'
import { withDefaults, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    option: any
    modelValue?: any
    customClass?: any
  }>(),
  {
    option: {}
  }
)
const emit = defineEmits<{
  (event: 'update:modelValue', val: any): void
  (event: 'change', val: any): void
}>()

const type = computed(() => {
  return props.option.type
})

const value = computed({
  get: () => props.modelValue,
  set: (val: any) => emit('update:modelValue', val)
})

const handleChange = (val: any) => {
  emit('change', val)
}
</script>
