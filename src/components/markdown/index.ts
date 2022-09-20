import type { App } from 'vue'
import { getComponentPrefix } from '../../util/global-config'
import { CrcoOptions } from '../../types'
import CMarkdown from './index.vue'

const component = Object.assign(CMarkdown, {
  inheritAttrs: false,
  install: (app: App, options?: CrcoOptions) => {
    app.component(`${getComponentPrefix(options)}markdown`, CMarkdown)
  }
})

export default component
