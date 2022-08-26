import { getHttp } from './http'

interface Option {
  // eg:/sys/system/menu
  path: string
  // eg:page/res 前面会自动拼接上 `${path}/`
  pagePath?: string
  pageAfter?: Function
  // eg:add 前面会自动拼接上 `${path}/`
  addPath?: string
  // eg:edit 前面会自动拼接上 `${path}/`
  editPath?: string
  // eg:del 前面会自动拼接上 `${path}/`
  delPath?: string
}
export default (config: Option) => {
  const { path, pagePath, pageAfter, addPath, editPath, delPath } = config
  const axios = getHttp()
  let apiPath = path
  if (apiPath && !apiPath.startsWith('http')) {
    apiPath = apiPath.startsWith('/') ? apiPath : `/${apiPath}`
  }
  const handleLoad = (params: any, done: Function) => {
    axios
      .post(`${apiPath}/${pagePath || 'page'}`, params, {
        params: {
          current: params.current,
          size: params.size
        }
      })
      .then((res: any) => {
        if (pageAfter) {
          pageAfter(params, done, res)
        } else {
          done(res)
        }
      })
      .catch(() => done())
  }
  const handleAdd = (data: any, done: Function) => {
    axios
      .post(`${apiPath}/${addPath || ''}`, data)
      .then(() => {
        done()
      })
      .catch((err: any) => {
        done(err)
      })
  }
  const handleDel = (row: any, done: Function) => {
    axios
      .delete(`${apiPath}/${delPath || ''}${row.id}`)
      .then(() => {
        done()
      })
      .catch((err: any) => {
        done(err)
      })
  }
  const handleEdit = (data: any, done: Function) => {
    axios
      .put(`${apiPath}/${editPath || ''}`, data)
      .then(() => {
        done()
      })
      .catch((err: any) => {
        done(err)
      })
  }
  return {
    handleLoad,
    handleAdd,
    handleEdit,
    handleDel
  }
}
