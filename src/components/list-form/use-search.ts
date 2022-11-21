interface Callback {
  (val: string): void
}
export default (callback: Callback) => {
  let timeout: any
  const handleChange = (val: string) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(val)
    }, 300)
  }

  return {
    handleChange
  }
}
