import { Method } from 'axios'
import { PageCallback, PageRes } from './page'
import { Callback } from '.'

export interface GlobalApiConfig {
  /**
   * 分页接口地址，默认/fetch，即拼接后地址为 GET:/sys/user/fetch
   */
  fetch?: string
  /**
   * 默认GET
   */
  fetchMethod: Method
  /**
   * 分页接口地址，默认/page，即拼接后地址为 GET:/sys/user/page
   */
  page?: string
  /**
   * 默认GET
   */
  pageMethod: Method
  /**
   * 默认/add，即拼接后地址为 POST:/sys/user/add
   */
  add?: string
  /**
   * add接口请求方式
   */
  addMethod: Method
  /**
   * 默认/edit,即拼接后地址为 PUT:/sys/user/edit
   */
  edit?: string
  /**
   * edit接口请求方式
   */
  editMethod: Method
  /**
   * 默认/del,即拼接后地址为 DELETE:/sys/user/del
   */
  del?: string
  /**
   * 默认false,del接口是否开启路径变量,
   * true则为例如:/sys/user/del/{id},参数通过url传递
   * false则为:/sys/user/del,参数通过body传递
   */
  delPathVariable?: boolean
  /**
   * del接口请求方式
   */
  delMethod: Method
  /**
   * 非GET接口，当body为null时，是否自动填充为{}，默认true
   */
  autoEmptyBody?: boolean
}
export type AfterData = {
  /** 请求url */
  url: string
  /** 请求方式 */
  method?: string
  /** 请求参数 */
  data: any
  /** 相应值 */
  response: any
}
export interface ApiConfig {
  /**
   * 基础接口地址，例如/sys/user
   */
  base: string
  /**
   * 获取数据地址，默认/fetch，即拼接后地址为 GET:/sys/user/fetch
   */
  fetch?: string
  /**
   * 默认GET
   */
  fetchMethod?: Method
  /**
   * 获得数据以后回调，一般用于前端修改后端返回数据用
   *
   * pageAfter:(data: any[], done: (newData?: any[]) => void)=>{
   *
   *    // 无需后端修改接口，前端拿到数据后，增加rowKey字段，值同id一样
   *    const newData = data.map(item=>{
   *       return {
   *         ...item,
   *         rowKey: item.id
   *       }
   *    })
   *
   *    done(newData)
   * }
   *
   */
  fetchAfter?: (data: any[], done: (newData?: any[]) => void) => void
  /**
   * 分页接口地址，默认/page，即拼接后地址为 GET:/sys/user/page
   */
  page?: string
  /**
   * 默认GET
   */
  pageMethod?: Method
  /**
   * 获得数据以后回调，一般用于前端修改后端返回数据用
   *
   * pageAfter:(data: PageRes, done: PageCallback)=>{
   *
   *    // 无需后端修改接口，前端拿到数据后，增加rowKey字段，值同id一样
   *    const newData = data.map(item=>{
   *       return {
   *         ...item,
   *         rowKey: item.id
   *       }
   *    })
   *
   *    done({
   *      ...data,
   *      records:newData
   *    }})
   * }
   *
   */
  pageAfterOld?: (data: PageRes, done: PageCallback) => void

  /**
   * 例如/add,默认空，即拼接后地址为 POST:/sys/user
   */
  add?: string
  /**
   * 默认POST
   */
  addMethod?: Method
  /**
   * 例如/edit,默认空，即拼接后地址为 PUT:/sys/user
   */
  edit?: string
  /**
   * 默认PUT
   */
  editMethod?: Method
  /**
   * 例如/del,默认空，即拼接后地址为 DELETE:/sys/user
   */
  del?: string
  /**
   * 默认false,del接口是否开启路径变量,
   * true则为例如:/sys/user/del/{rowKey},参数通过url传递,其中rowKey为c-table的option配置项，默认为'id'
   * false则为:/sys/user/del,参数通过body传递
   */
  delPathVariable?: boolean
  /**
   * DELETE
   */
  delMethod?: Method
  /**
   * 非GET接口，当body为null时，是否自动填充为{}，默认true
   */
  autoEmptyBody?: boolean
  /**
   * 获得数据以后回调，一般用于前端修改后端返回数据用
   *
   * addAfter:(data: {data:any,response:any}, done: (data:any)=>void)=>{
   *    done({
   *      ...data,
   *      newName:'hello'
   *    }})
   * }
   *
   * addAfter:(data: any)=>{
   *    return new Promise((RES)=>{
   *       RES({
   *          ...data,
   *          newName:'hello'
   *       }})
   *    })
   * }
   *
   */
  pageAfter?: Callback<AfterData, any>
  addAfter?: Callback<AfterData, any>
  editAfter?: Callback<AfterData, any>
  delAfter?: Callback<AfterData, any>
}
