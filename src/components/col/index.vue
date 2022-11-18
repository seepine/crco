<template>
  <div class="crco-col" :class="classNames" :style="styleValue">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { inject, withDefaults, computed, Ref, ref, CSSProperties } from 'vue'
import { isUndefined } from '../../util/is'
import { ResponsiveValue } from '../../types'
import { analyzeResponsiveValue } from '../../util/responsive'

const props = withDefaults(
  defineProps<{
    span?: ResponsiveValue
    customStyle?: CSSProperties
  }>(),
  {}
)

const divWidth = inject<Ref<number>>('divWidth', ref(1080))
const gutter = inject<Ref<number>>('gutter', ref(0))

const classNames = computed(() => {
  const classObj: any = {}
  const valSpan = analyzeResponsiveValue(props.span, divWidth.value)
  if (!isUndefined(valSpan)) {
    classObj[`crco-col-${valSpan}`] = true
  }
  return classObj
})
const styleValue = computed(() => {
  const styleObj = {
    ...props.customStyle
  }
  if (gutter.value > 0) {
    styleObj.paddingLeft = `${gutter.value / 2}px`
    styleObj.paddingRight = `${gutter.value / 2}px`
    styleObj.paddingBottom = `${gutter.value / 2}px`
  }
  return styleObj
})
</script>
<style lang="scss">
.crco-col {
  box-sizing: border-box;
}
@for $i from 1 through 24 {
  .crco-col-#{$i} {
    flex: 0 0 100% / 24 * $i;
    max-width: 100% / 24 * $i;
  }
}
</style>
