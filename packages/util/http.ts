import axios from 'axios'

let http = axios

export const setHttp = (data: any) => {
  if (data != null) {
    http = data
  }
}
export const getHttp = () => {
  return http
}
