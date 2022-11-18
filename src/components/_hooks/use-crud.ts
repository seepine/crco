import { computed, Ref } from 'vue'
import { getApiConfig, request } from '../../util/http'
import { TableOption } from '../../types/table'
import { isFunction, isObject, isString, isUndefined } from '../../util/is'
import { copyPropertiesNotEmpty } from '../../util/util'
import { PageCallback } from '../../types/page'
import { ApiConfig } from '../../types/api'
import { ListFormOption } from '../../types/list-form'

export default (emit: any, option: Ref<TableOption | ListFormOption>) => {
  const api = computed<ApiConfig | undefined>(() => {
    const global = getApiConfig()
    if (isUndefined(option.value.api)) {
      return undefined
    }
    const defaultApiConfig: ApiConfig = {
      ...global,
      base: isString(option.value.api) ? option.value.api : option.value.api!.base
    }
    if (isObject(option.value.api)) {
      copyPropertiesNotEmpty(option.value.api, defaultApiConfig)
    }
    return defaultApiConfig
  })
  const requestFetch = (params: any, done: (newData?: any[]) => void) => {
    if (api.value) {
      request({
        type: 'fetch',
        method: api.value.fetchMethod,
        url: api.value.base + api.value.fetch,
        params,
        autoEmptyBody: api.value.autoEmptyBody
      })
        .then((res: any) => {
          if (isFunction(api.value?.fetchAfter)) {
            api.value?.fetchAfter(res, done)
          } else {
            done(res)
          }
        })
        .catch(() => {
          done(undefined)
        })
    } else {
      emit('load', params, done)
    }
  }
  const requestPage = (params: any, done: PageCallback) => {
    if (api.value) {
      request({
        type: 'page',
        method: api.value.pageMethod,
        url: api.value.base + api.value.page,
        params,
        autoEmptyBody: api.value.autoEmptyBody
      })
        .then((res: any) => {
          if (isFunction(api.value?.pageAfter)) {
            api.value?.pageAfter(res, done)
          } else {
            done(res)
          }
        })
        .catch(() => {
          done(undefined)
        })
    } else {
      emit('load', params, done)
    }
  }

  const requestAdd = (data: any, done: Function) => {
    if (api.value) {
      request({
        method: api.value.addMethod,
        url: api.value.base + api.value.add,
        params: data,
        autoEmptyBody: api.value.autoEmptyBody
      })
        .then(() => {
          done()
        })
        .catch((err) => {
          done(err)
        })
    } else {
      emit('add', data, done)
    }
  }

  const requestEdit = (data: any, done: Function) => {
    if (api.value) {
      request({
        method: api.value.editMethod,
        url: api.value.base + api.value.edit,
        params: data,
        autoEmptyBody: api.value.autoEmptyBody
      })
        .then(() => {
          done()
        })
        .catch((err) => {
          done(err)
        })
    } else {
      emit('edit', data, done)
    }
  }

  const requestDel = (data: any, done: Function) => {
    if (api.value) {
      request({
        method: api.value.delMethod,
        url:
          api.value.base +
          api.value.del +
          (api.value.delPathVariable ? `/${data[option.value.rowKey!]}` : ''),
        params: api.value.delPathVariable ? undefined : data,
        autoEmptyBody: api.value.autoEmptyBody
      })
        .then(() => {
          done()
        })
        .catch((err) => {
          done(err)
        })
    } else {
      emit('del', data, done)
    }
  }

  return {
    requestFetch,
    requestPage,
    requestAdd,
    requestEdit,
    requestDel
  }
}
