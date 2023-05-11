import { computed, Ref } from 'vue'
import { getApiConfig, request } from '../../util/http'
import { TableOption } from '../../types/table'
import { isFunction, isObject, isString, isUndefined } from '../../util/is'
import { copyPropertiesNotEmpty, runDone } from '../../util/util'
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
      const url = api.value.base + api.value.page
      const method = api.value.pageMethod
      request({
        type: 'page',
        method,
        url,
        params,
        autoEmptyBody: api.value.autoEmptyBody
      })
        .then((res: any) => {
          if (isFunction(api.value?.pageAfter)) {
            runDone(api.value?.pageAfter, { method, url, data: params, response: res }, done)
              .then(() => {
                done()
              })
              .catch(() => {
                done()
              })
          } else if (isFunction(api.value?.pageAfterOld)) {
            api.value?.pageAfterOld(res, done)
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
      const url = api.value.base + api.value.add
      const method = api.value.addMethod
      request({
        method,
        url,
        params: data,
        autoEmptyBody: api.value.autoEmptyBody
      })
        .then((res) => {
          if (isFunction(api.value?.addAfter)) {
            runDone(
              api.value?.addAfter,
              {
                method,
                url,
                data,
                response: res
              },
              done
            )
              .then(() => {
                done()
              })
              .catch(() => {
                done(false)
              })
          } else {
            done(res)
          }
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
      const url = api.value.base + api.value.edit
      const method = api.value.editMethod
      request({
        method,
        url,
        params: data,
        autoEmptyBody: api.value.autoEmptyBody
      })
        .then((res) => {
          if (isFunction(api.value?.editAfter)) {
            runDone(api.value?.editAfter, { method, url, data, response: res }, done)
              .then(() => {
                done()
              })
              .catch(() => {
                done(false)
              })
          } else {
            done(res)
          }
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
      const url =
        api.value.base +
        api.value.del +
        (api.value.delPathVariable ? `/${data[option.value.rowKey!]}` : '')
      const method = api.value.delMethod
      request({
        method,
        url,
        params: api.value.delPathVariable ? undefined : data,
        autoEmptyBody: api.value.autoEmptyBody
      })
        .then((res) => {
          if (isFunction(api.value?.delAfter)) {
            runDone(api.value?.delAfter, { method, url, data, response: res }, done)
              .then(() => {
                done()
              })
              .catch(() => {
                done(false)
              })
          } else {
            done(res)
          }
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
