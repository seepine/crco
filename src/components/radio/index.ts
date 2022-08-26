import type { App } from 'vue'
import { getComponentPrefix } from '../../util/global-config'
import { CrcoOptions } from '../../types'
import Radio from './index.vue'

const component = Object.assign(Radio, {
  inheritAttrs: false,
  install: (app: App, options?: CrcoOptions) => {
    app.component(`${getComponentPrefix(options)}Radio`, Radio)
  }
})

export default component
