import type { App } from 'vue'
import { getComponentPrefix } from '../../util/global-config'
import { CrcoOptions } from '../../types'
import PopConfirm from './index.vue'

const component = Object.assign(PopConfirm, {
  inheritAttrs: false,
  install: (app: App, options?: CrcoOptions) => {
    app.component(`${getComponentPrefix(options)}PopConfirm`, PopConfirm)
  }
})

export default component
