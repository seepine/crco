import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'

import { defineClientAppEnhance } from '@vuepress/client'

import crco from '../../packages/index'
import darkMode from './dark-mode'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'


export default defineClientAppEnhance(({ app, router, siteData }) => {
  // app.use(Antd)
  app.use(ArcoVue)
  app.use(ArcoVueIcon)
  app.use(crco)
})
