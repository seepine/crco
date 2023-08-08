import { AxiosInstance, Method } from 'axios'
import { GlobalApiConfig } from './api'

export type { FormColumn, DicItem, OnChange } from './column'
export type { FormOption } from './form'
export type { TableOption, TableColumn } from './table'
export type { PageCallback, PageRes } from './page'
export type { ListFormOption } from './list-form'

export type AnyObject = {
  [propName: string]: any
}
export interface Done {
  (close?: boolean): void
}

export type DoneRes<T> = (modifyForm?: T) => void

/**
 * // 1. 普通返回
 * (form)=>{
 *   // 返回新值
 *   return {
 *     ...form,
 *     name: 'newName'
 *   }
 *   // 终止
 *   return false
 * }
 * // 2. Promise异步返回
 * (form)=>{
 *   return new Promise((RES,REJ)=>{
 *      RES(form) 返回新值
 *      REJ() // 终止
 *   })
 * }
 * // 3. 回调返回
 * (form,done)=>{
 *   // 返回新值
 *   done(form)
 *   // 终止
 *   done(false)
 * }
 */
export type Callback<T, R> =
  | ((form: T) => R | false)
  | ((form: T, done: DoneRes<R | false>) => void)
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
