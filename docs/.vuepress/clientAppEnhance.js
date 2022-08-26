import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'

import { defineClientAppEnhance } from '@vuepress/client'

import crco from '../../src/index'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(ArcoVue)
  app.use(ArcoVueIcon)
  app.use(crco)
})
