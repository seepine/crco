<template>
  <div v-show="init">
    <transition
      class="crco-table-search-collapse"
      name="crco-table-search-collapse"
      v-bind="transitionEvent"
    >
      <div v-show="show" ref="divRef">
        <div
          class="crco-table-search-box"
          :class="{
            'flex-row': width >= 467,
            'flex-column': width < 467
          }"
          style="border-bottom: 1px solid var(--color-neutral-3); box-sizing: border-box"
        >
          <div class="flex-1">
            <crco-form ref="searchFormRef" v-model="form" :option="myOption"></crco-form>
          </div>
          <div style="border-left: 1px solid var(--color-neutral-3); margin: 0 12px 8px 0"></div>
          <div class="flex-column justify-end">
            <a-button
              v-if="myOption.resetBtn"
              style="margin-bottom: 8px"
              :disabled="isSearch"
              @click="reset"
              >重置</a-button
            >
            <crco-button
              style="margin-bottom: 8px"
              type="outline"
              :show-loading="false"
              :loading="isSearch"
              @click="handleSearch"
              >搜索</crco-button
            >
          </div>
        </div>
        <div style="height: 16px"></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { FormOption } from '../../types/form'
import CrcoForm from '../form/index.vue'
import CrcoButton from '../button/index.vue'
import useTransitionEvent from './use-transition-event'
import { Done } from '../../types/index'
import { setStore, getStore } from '../../util/storage'
import { isUndefined } from '../../util/is'

const transitionEvent = useTransitionEvent()
const props = defineProps<{
  option?: FormOption & { notBlank?: boolean }
  width: number
  show: boolean
}>()
const emit = defineEmits<{
  (event: 'search', form: any, done: Done): void
  (event: 'update:show', data: boolean): void
}>()
const init = ref(false)
if (window && window.location) {
  const hashUrl = `${window.location.host}${window.location.pathname}`
  if (getStore(`search-show-${hashUrl}`) === false) {
    emit('update:show', false)
    setTimeout(() => {
      init.value = true
    })
  } else {
    init.value = true
  }
  watch(
    () => props.show,
    () => {
      setStore(`search-show-${hashUrl}`, props.show)
    }
  )
} else {
  init.value = true
}
const myOption = computed<FormOption>(() => {
  return {
    ...props.option,
    justify: props.option?.justify || 'end',
    hideLabel: props.option?.hideLabel || true,
    layout: props.option?.layout || 'inline',
    btn: false,
    columns: props.option?.columns?.map((item) => {
      return {
        ...item,
        placeholder: item.placeholder || `搜索${item.name}`
      }
    })
  }
})
const searchFormRef = ref()
const form = ref({})
const formBack = ref({})
const isSearch = ref(false)

const handleSearch = (done: Done) => {
  if (isSearch.value) return
  isSearch.value = true
  searchFormRef.value
    .submit()
    .then((res: { form: any; done: Done }) => {
      if (props.option?.notBlank !== false) {
        const copyForm: any = {}
        // eslint-disable-next-line no-restricted-syntax
        for (const i in res.form) {
          // eslint-disable-next-line no-prototype-builtins
          if (res.form.hasOwnProperty(i)) {
            if (!isUndefined(res.form[i]) && res.form[i] !== '') {
              copyForm[i] = res.form[i]
            }
          }
        }
        emit('search', copyForm, () => {
          done()
          res.done()
          isSearch.value = false
        })
      } else {
        emit('search', res.form, () => {
          done()
          res.done()
          isSearch.value = false
        })
      }
    })
    .catch(() => {
      done()
      isSearch.value = false
    })
}
const reset = () => {
  form.value = formBack.value
  handleSearch(() => {})
}
</script>
<style>
.crco-table-search-collapse-enter-from,
.crco-table-search-collapse-leave-to {
  height: 0;
  opacity: 0;
}
.crco-table-search-collapse-enter-active,
.crco-table-search-collapse-leave-active {
  transition: height 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
<style scoped lang="scss">
.crco-table-search-box {
  display: flex;
}
</style>
