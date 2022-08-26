import type { App } from 'vue'
import { getComponentPrefix } from '../../util/global-config'
import { CrcoOptions } from '../../types'
import Descriptions from './index.vue'

const component = Object.assign(Descriptions, {
  inheritAttrs: false,
  install: (app: App, options?: CrcoOptions) => {
    app.component(`${getComponentPrefix(options)}Descriptions`, Descriptions)
  }
})

export default component
