import axios, { AxiosInstance, Method, AxiosRequestConfig } from 'axios'
import { RequestMethod } from '../types'
import { isNull, isString, isUndefined } from './is'
import { ApiConfig } from '../types/api'

let http: AxiosInstance = axios

let globalMethod: RequestMethod = 'RESTFul'
type RequestType = 'fetch' | 'page' | 'add' | 'edit' | 'del' | 'dic'

export const setHttp = (data: any) => {
  if (!isNull(data) && !isUndefined(data)) {
    http = data
  }
}
export const getHttp = (): AxiosInstance => {
  return http
}
export const setMethod = (method: RequestMethod) => {
  globalMethod = method
}
export const getApiConfig = (): ApiConfig => {
  if (globalMethod === 'RESTFul') {
    return {
      base: '',
      fetch: '/fetch',
      fetchMethod: 'GET',
      page: '/page',
      pageMethod: 'GET',
      add: '',
      addMethod: 'POST',
      edit: '',
      editMethod: 'PUT',
      del: '',
      delPathVariable: true,
      delMethod: 'DELETE',
      autoEmptyBody: true
    }
  }
  if (isString(globalMethod)) {
    return {
      base: '',
      fetch: '/fetch',
      fetchMethod: globalMethod,
      page: '/page',
      pageMethod: globalMethod,
      add: '/add',
      addMethod: globalMethod,
      edit: '/edit',
      editMethod: globalMethod,
      del: '/del',
      delPathVariable: false,
      delMethod: globalMethod,
      autoEmptyBody: true
    }
  }
  return {
    base: '',
    fetch: globalMethod.fetch || '/fetch',
    fetchMethod: globalMethod.fetchMethod,
    page: globalMethod.page || '/page',
    pageMethod: globalMethod.pageMethod,
    add: globalMethod.add || '/add',
    addMethod: globalMethod.addMethod,
    edit: globalMethod.edit || '/edit',
    editMethod: globalMethod.editMethod,
    del: globalMethod.del || '/del',
    delPathVariable: globalMethod.delPathVariable || false,
    delMethod: globalMethod.delMethod,
    autoEmptyBody: globalMethod.autoEmptyBody || true
  }
}
export interface RequestConfig {
  type?: RequestType
  url: string
  method?: Method
  autoEmptyBody?: boolean
  /**
   * 传递参数，若get请求则放在params，若其他请求，放在body
   */
  params?: any
}
export const request = (config: RequestConfig) => {
  let { method } = config
  if (method === undefined && config.type === 'dic') {
    if (globalMethod === undefined) {
      method = 'GET'
    } else if (globalMethod === 'RESTFul') {
      method = 'GET'
    } else if (isString(globalMethod)) {
      method = globalMethod
    } else {
      method = globalMethod.dicMethod
    }
  }
  const req: AxiosRequestConfig = {
    method,
    url: config.url
  }
  if (!isUndefined(config.params)) {
    if (method === 'GET') {
      req.params = config.params
    } else {
      req.data = config.params
    }
    if (config.type === 'page' || config.type === 'fetch') {
      if (isUndefined(req.params)) {
        req.params = {}
      }
      if (config.params.size) {
        req.params.size = config.params.size
      }
      if (config.params.current) {
        req.params.current = config.params.current
      }
    }
  } else if (method !== 'GET') {
    req.data = {}
  }
  return http.request(req)
}
