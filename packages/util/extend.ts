/* eslint-disable func-names */
/* eslint-disable no-extend-native */
import beanUtil from './bean-util'
import emitter from './emitter'

export default () => {
  // @ts-ignore
  Date.prototype.format = function (format = 'yyyy-MM-dd hh:mm:ss') {
    return beanUtil.dateFormat(this, format)
  }
  // @ts-ignore
  Date.prototype.lastMonth = function () {
    if (this.getMonth() === 0) {
      this.setFullYear(this.getFullYear() - 1)
      this.setMonth(11)
    } else {
      this.setMonth(this.getMonth() - 1)
    }
    return this
  }
  const stack: Array<number> = []
  window.addEventListener('popstate', () => {
    if (stack.length > 0) {
      emitter.emit('popstate', stack[stack.length - 1])
    }
  })

  emitter.on('popstate-stack-in', (code: any) => {
    window.history.pushState(null, '', document.URL)
    stack.push(code)
  })
  emitter.on('popstate-stack-out', (code: any) => {
    stack.splice(stack.indexOf(code), 1)
  })
}
