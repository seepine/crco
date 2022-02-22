import axios, { AxiosInstance } from 'axios'
import { isNull, isUndefined } from './is'

let http: AxiosInstance = axios

export const setHttp = (data: any) => {
  if (!isNull(data) && !isUndefined(data)) {
    http = data
  }
}
export const getHttp = (): AxiosInstance => {
  return http
}
