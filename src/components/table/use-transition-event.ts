/* eslint-disable no-param-reassign */
export default () => {
  return {
    onEnter: (el: Element) => {
      ;(el as HTMLDivElement).style.height = `${el.scrollHeight}px`
    },
    onAfterEnter: (el: Element) => {
      ;(el as HTMLDivElement).style.height = 'auto'
    },
    onBeforeLeave: (el: Element) => {
      ;(el as HTMLDivElement).style.height = `${el.scrollHeight}px`
    },
    onLeave: (el: Element) => {
      ;(el as HTMLDivElement).style.height = '0'
    }
  }
}
