import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
    // , dts()
  ],
  css: {
    preprocessorOptions: { scss: { charset: false } }
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'crco',
      fileName: (format) => {
        return format === 'es' ? 'index.js' : `index.${format}.js`
      }
    },
    cssCodeSplit: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'axios', 'mitt', '@arco-design/web-vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
    terserOptions: {
      compress: {
        // eslint-disable-next-line camelcase
        drop_console: true, // 生产环境去除console
        // eslint-disable-next-line camelcase
        drop_debugger: true // 生产环境去除debugger
      }
    }
  }
})
