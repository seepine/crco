import { App } from 'vue'

import CButton from './components/button'

import CRadio from './components/radio'
import CSelect from './components/select'
import CUpload from './components/upload'
import CDescriptions from './components/descriptions'
import CPopConfirm from './components/pop-confirm'
import CModal from './components/modal'
import CRow from './components/row'
import CCol from './components/col'
import CTable from './components/table'
import CForm from './components/form'
import CListForm from './components/list-form'
import CTreeSelect from './components/tree-select'

import { setHttp, setMethod } from './util/http'
import { CrcoOptions } from './types'

const components: any = {
  CRow,
  CCol,
  CButton,
  CRadio,
  CTable,
  CForm,
  CSelect,
  CUpload,
  CPopConfirm,
  CModal,
  CDescriptions,
  CListForm,
  CTreeSelect
}

export default {
  install(app: App, options?: CrcoOptions) {
    if (options !== undefined) {
      if (options.axios !== undefined) {
        setHttp(options.axios)
      }
      if (options.method !== undefined) {
        setMethod(options.method)
      }
    }
    Object.keys(components).forEach((key: string) => {
      app.use(components[key], options)
    })
  }
}
