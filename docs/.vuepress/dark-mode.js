;(() => {
  const hasClass = (classList, className) => {
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
  var target = document.getElementsByTagName('html')[0]
  const setDark = () => {
    if (target) {
      if (hasClass(target.classList, 'dark')) {
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        document.body.removeAttribute('arco-theme')
      }
    }
  }
  new MutationObserver(() => {
    setDark()
  }).observe(target, {
    attributes: true, //观察node对象的属性
    attributeFilter: ['class'] //只观察class属性
  })
  setDark()
})()
