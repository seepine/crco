import '@arco-design/web-vue/dist/arco.css'
import { defineClientConfig } from '@vuepress/client'
import crco from '../../src/index'

export default defineClientConfig({
  enhance({ app }) {
    app.use(crco)
  },
  setup() {},
  rootComponents: [],
})
