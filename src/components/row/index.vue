<template>
  <div ref="crcoRowRef" :class="classNames" :style="customStyle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, StyleValue, withDefaults } from 'vue'
import { analyzeResponsiveValue } from '../../util/responsive'
import { ResponsiveValue } from '../../types'
import useElementResize from '../_hooks/use-element-resize'

const props = withDefaults(
  defineProps<{
    align?: 'start' | 'center' | 'end' | 'stretch'
    justify?: 'start' | 'center' | 'end' | 'space-around' | 'space-between'
    wrap?: boolean
    gutter?: ResponsiveValue
    customStyle?: StyleValue
  }>(),
  {
    align: 'start',
    justify: 'start',
    wrap: true
  }
)
const crcoRowRef = ref()
const { divWidth } = useElementResize(crcoRowRef)
provide('divWidth', divWidth)

const calGutter = computed(() => {
  return analyzeResponsiveValue(props.gutter, divWidth.value)
})
provide('gutter', calGutter)
const classNames = computed(() => {
  return {
    'crco-row': true,
    'flex-row': true,
    [`flex-wrap`]: props.wrap,
    [`flex-nowrap`]: !props.wrap,
    [`align-${props.align}`]: props.align,
    [`justify-${props.justify}`]: props.justify
  }
})
</script>
