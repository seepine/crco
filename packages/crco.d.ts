declare module '*.vue' {
  import { ComponentOptions } from 'vue'

  const componentOptions: ComponentOptions
  export default componentOptions
}
// eslint-disable-next-line no-unused-vars
declare interface Date {
  format: (p_format: string) => string
  lastMonth: () => Date
}

// eslint-disable-next-line no-unused-vars
declare interface Window {
  axios: any
}
