import type { App } from 'vue'
import { getComponentPrefix } from '../util/global-config'
import { CrcoOptions } from '../util/types'
import Popconfirm from './index.vue'

const component = Object.assign(Popconfirm, {
  inheritAttrs: false,
  install: (app: App, options?: CrcoOptions) => {
    app.component(`${getComponentPrefix(options)}Popconfirm`, Popconfirm)
  }
})

export default component
