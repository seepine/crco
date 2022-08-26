import type { App } from 'vue'
import { getComponentPrefix } from '../../util/global-config'
import { CrcoOptions } from '../../types'
import Form from './index.vue'

const component = Object.assign(Form, {
  inheritAttrs: false,
  install: (app: App, options?: CrcoOptions) => {
    app.component(`${getComponentPrefix(options)}Form`, Form)
  }
})

export default component
