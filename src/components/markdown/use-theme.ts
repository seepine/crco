import { onMounted, ref } from 'vue'

export default (themeChange: Function) => {
  const isDark = ref(false)

  onMounted(() => {
    const hasClass = (classList: DOMTokenList, className: string) => {
      if (!classList || classList.length <= 0) {
        return false
      }
      for (let i = 0; i < classList.length; i += 1) {
        if (classList[i] === className) {
          return true
        }
      }
      return false
    }
    const target = document.getElementsByTagName('html')[0]
    const setDark = () => {
      if (target) {
        if (hasClass(target.classList, 'dark')) {
          isDark.value = true
          themeChange(true)
        } else {
          isDark.value = false
          themeChange(false)
        }
      }
    }
    new MutationObserver(() => {
      setDark()
    }).observe(target, {
      attributes: true,
      attributeFilter: ['class']
    })
    setDark()
  })

  return {
    isDark
  }
}
