import { AxiosInstance, Method } from 'axios'
import { GlobalApiConfig } from './api'
import { ListProps } from './list'
import { TableProps } from './table'

export type { FormOption } from './form'
export interface Done {
  (close?: boolean): void
}

export type DoneRes<T> = (modifyForm?: T) => void

export type Callback<T, R> =
  | ((form: T) => R)
  | ((form: T, done: DoneRes<R>) => void)
  | ((form: any) => Promise<R>)

export type RequestMethod = Method | (GlobalApiConfig & { dicMethod?: Method }) | 'RESTFul'

export interface CrcoOptions {
  componentPrefix?: string
  axios?: AxiosInstance
  // default 'RESTFul'
  method?: RequestMethod
}

export interface Responsive {
  /**
   * < 576px 响应式配置
   */
  xs?: number
  /**
   * >= 576px 响应式配置
   */
  sm?: number
  /**
   * >= 768px 响应式配置
   */
  md?: number
  /**
   * >= 992px 响应式配置
   */
  lg?: number
  /**
   * >= 1200px 响应式配置
   */
  xl?: number
  /**
   * >= 1600px 响应式配置
   */
  xxl?: number
}
export type ResponsiveValue = number | string | Responsive

export interface TableOption {
  tableProps?: TableProps
}

export interface ListFormOption {
  listProps?: ListProps
}
