---
home: true
navbar: true
title: Crco
heroImage: logo.png
actions:
  - text: 快速开始
    link: /guide/quickstart/
    type: primary
  - text: 表  单
    link: /form/base/
    type: secondary
  - text: 表  格
    link: /table/base/
    type: secondary
features:
- title: 快速开发
  details: 坚实贯彻配置驱动视图的思想，落实万物皆可 option。
- title: 极简代码
  details: 坚决贯彻极简封装和最少代码原则，让枯燥的crud在几秒内即可完成。
- title: 最佳实践
  details: 提供最佳实践代码，让每一位开发者都能以正确的姿势来使用 crco。
footer: MIT Licensed | Copyright © 2020 seepine 
---

### 安装

推荐使用 npm 的方式安装，它能更好地和打包工具配合使用。

```shell
npm i crco -D
```
### 引入

```js
import { createApp } from 'vue'
import App from './App.vue'

import Crco from 'crco'
import 'crco/dist/index.css'
import './utils/axios'

createApp(App)
  .use(Crco, {
    axios  // 如果有自定义拦截的话，可传给crco
  })
  .mount('#app')
```
