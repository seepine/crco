import { AxiosInstance, Method } from 'axios'
import { GlobalApiConfig } from './api'

export interface Done {
  (close?: boolean): void
}

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
