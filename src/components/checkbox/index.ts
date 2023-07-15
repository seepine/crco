import type { App } from 'vue'
import { getComponentPrefix } from '../../util/global-config'
import { CrcoOptions } from '../../types'
import Checkbox from './index.vue'

const component = Object.assign(Checkbox, {
  inheritAttrs: false,
  install: (app: App, options?: CrcoOptions) => {
    app.component(`${getComponentPrefix(options)}Checkbox`, Checkbox)
  }
})

export default component
