# 快速入门

## npm 安装

### 1.安装 crco

安装后请锁定版本号
```shell
npm i crco -D
```

### 2.安装@arco-design/web-vue

`crco`基于`arco`封装，因此必须安装，且建议安装后锁定版本号

```shell
npm i @arco-design/web-vue -D
```

### 3.安装 axios

`crco`使用`axios`发起请求，因此必须安装，若项目中自定义请求拦截，请将自定义的`axios`传给`crco`或赋值给`window.axios`

```shell
npm i axios
```

## 引入 crco

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
