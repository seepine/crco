import type { App } from 'vue'
import { getComponentPrefix } from '../../util/global-config'
import { CrcoOptions } from '../../types'
import Modal from './index.vue'

const component = Object.assign(Modal, {
  inheritAttrs: false,
  install: (app: App, options?: CrcoOptions) => {
    app.component(`${getComponentPrefix(options)}Modal`, Modal)
  }
})

export default component
