/* eslint-disable func-names */
/* eslint-disable no-extend-native */
import beanUtil from './bean-util'

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
}
