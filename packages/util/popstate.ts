import emitter from './emitter'

const stack: Array<number> = []

const emitTop = () => {
  if (stack.length > 0) {
    emitter.emit('top-code', stack[stack.length - 1])
  }
}
emitter.on('popstate-stack-in', (code: any) => {
  window.history.pushState(null, '', document.URL)
  stack.push(code)
  emitTop()
})
emitter.on('popstate-stack-out', (code: any) => {
  stack.splice(stack.indexOf(code), 1)
  emitTop()
})
