import type { App } from 'vue'
import CButton from './button/index'
import CTable from './table/index'
import CForm from './form/index'
import CRadio from './radio/index'
import CSelect from './select/index'
import CUpload from './upload/index'
import CDescriptions from './descriptions/index'
import CPopconfirm from './popconfirm/index'
import CModal from './modal/index'
import { CrcoOptions } from './util/types'
import { filterValue as fValue } from './util/data-handle'
import extend from './util/extend'
import './css/flex.scss'
import { setHttp } from './util/http'
import './util/popstate'

extend()

const components: any = {
  CButton,
  CRadio,
  CTable,
  CForm,
  CSelect,
  CUpload,
  CPopconfirm,
  CModal,
  CDescriptions
}

export function filterValue(record: any, column: any) {
  return fValue(record, column)
}

export default {
  install(app: App, options?: CrcoOptions) {
    if (options !== undefined && options.axios !== undefined) {
      setHttp(options.axios)
    }
    Object.keys(components).forEach((key: string) => {
      app.use(components[key], options)
    })
  }
}
