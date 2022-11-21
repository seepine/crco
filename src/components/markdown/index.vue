<template>
  <div class="crco-markdown" :id="divId" />
</template>

<script setup lang="ts">
import Vditor from 'vditor'
import { withDefaults, ref, watch, onMounted, onUnmounted } from 'vue'
import { isFunction, isNotBlank, isString } from '../../util/is'
import { copyPropertiesNotEmpty, runCallback } from '../../util/util'
import useTheme from './use-theme'

const code = Math.round(Math.random() * 100000000)
const props = withDefaults(
  defineProps<{
    option: any
    modelValue?: string
  }>(),
  {
    option: {},
    modelValue: ''
  }
)
const emit = defineEmits<{
  (event: 'update:modelValue', val: any): void
  (event: 'change', val: any): void
}>()

const divId = ref(`vditor${code}`)
const vditor = ref<Vditor | null>(null)

const { isDark } = useTheme((dark: boolean) => {
  if (vditor.value) {
    vditor.value.setTheme(dark ? 'dark' : 'classic', isDark.value ? 'dark' : 'light')
  }
})

// eslint-disable-next-line no-undef
const myOption = ref<IOptions>({
  mode: 'ir',
  theme: isDark.value ? 'dark' : 'classic',
  width: '100%',
  minHeight: 240,
  preview: {
    actions: ['desktop', 'mobile'],
    theme: {
      current: isDark.value ? 'dark' : 'light'
    },
    hljs: {
      lineNumber: false,
      style: 'github',
      enable: true
    }
  },
  after: () => {
    if (vditor.value) {
      if (isNotBlank(props.modelValue)) {
        vditor.value!.setValue(props.modelValue)
      }
      vditor.value.setTheme(isDark.value ? 'dark' : 'classic', isDark.value ? 'dark' : 'light')
    }
  },
  upload: {
    handler: (files) => {
      return new Promise((RES) => {
        if (isFunction(props.option.onUpload)) {
          runCallback(props.option.onUpload, { files, ctx: vditor.value })
            .then(() => {})
            .catch((err) => {
              if (err instanceof Error) {
                RES(err.message)
              } else if (isString(err)) {
                RES(err)
              }
            })
        }
      })
    }
  },
  ...props.option,
  input: (val: string) => {
    if (isFunction(props.option.input)) {
      props.option.onInput(val)
    }
    emit('change', val)
    emit('update:modelValue', val)
  }
})
watch(
  () => props.option,
  () => {
    copyPropertiesNotEmpty(props.option, myOption.value)
  },
  {
    immediate: true,
    deep: true
  }
)
onMounted(() => {
  vditor.value = new Vditor(divId.value, myOption.value)
  if (props.modelValue) {
    if (vditor.value) {
      vditor.value.setValue(props.modelValue)
    }
  }
  // 不能双向绑定，光标会有问题
  // watch(
  //   () => props.modelValue,
  //   () => {
  //     if (vditor.value) {
  //       // vditor.value.setValue(props.modelValue)
  //     }
  //   }
  // )
})

onUnmounted(() => {
  if (vditor.value) {
    vditor.value.destroy()
  }
})
</script>
<style lang="scss">
.crco-markdown {
  // --panel-background-color: #f2f3f5;
  &--dark {
    // --panel-background-color: #262626;
  }

  max-height: 80vh;
  &.vditor--fullscreen {
    max-height: 100%;
  }

  .vditor-toolbar {
    padding: 4px 10px !important;
  }
  .vditor-reset {
    font-size: 14px;
    padding: 4px 12px !important;
    margin: 0;
  }
  .vditor-ir pre.vditor-reset pre {
    padding: 0;
  }
}

.vditor-ir pre.vditor-reset:focus {
  // background-color: var(--color-bg-2);
  // border-color: rgb(var(--primary-6));
  // box-shadow: 0 0 0 0 var(--color-primary-light-2);
}
.theme-default-content pre {
  border-radius: 0;
}
.vditor-hint {
  // background-color: var(--color-bg-popup);
  .vditor-hint button:not(.vditor-menu--disabled):hover,
  .vditor-hint--current {
    // background-color: var(--color-fill-2);
  }
}
// .theme-default-content pre code,
// .theme-default-content pre[class*='language-'] {
//   color: unset !important;
// }
// .vditor-ir__marker--pre .vditor-ir__marker {
//   color: var(--textarea-text-color) !important;
// }
</style>
