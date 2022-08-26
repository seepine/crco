import type { App } from 'vue'
import { getComponentPrefix } from '../../util/global-config'
import { CrcoOptions } from '../../types'
import Row from './index.vue'

const component = Object.assign(Row, {
  inheritAttrs: false,
  install: (app: App, options?: CrcoOptions) => {
    app.component(`${getComponentPrefix(options)}Row`, Row)
  }
})

export default component
