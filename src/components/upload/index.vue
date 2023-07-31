<template>
  <upload
    v-bind="option"
    :custom-request="customRequest"
    :file-list="defaultFileList"
    :default-file-list="defaultFileList"
    @change="change"
    @preview="preview"
    :on-before-remove="onBeforeRemove"
    :on-before-upload="onBeforeUpload"
    :show-link="false"
    :show-remove-button="readonly ? false : option.showRemoveButton"
    :show-retry-button="readonly ? false : option.showRetryButton"
    :show-cancel-button="readonly ? false : option.showCancelButton"
    :show-upload-button="readonly ? false : option.showUploadButton"
    :disabled="option.disabled"
    :class="{
      'crco-upload-readonly': readonly || option.readonly,
      'crco-upload-large': option.large
    }"
  >
    <template #upload-button v-if="$slots.default">
      <slot></slot>
    </template>
  </upload>
  <image-preview
    v-if="imgList.length > 0 && option.limit === 1"
    :src="imgList[0]"
    v-model:visible="preVisible"
  >
    <template #actions>
      <image-preview-action name="下载" @click="download(imgList[0])"
        ><icon-download
      /></image-preview-action>
    </template>
  </image-preview>
  <image-preview-group
    v-if="props.option.limit !== 1"
    v-model:visible="preVisible"
    v-model:current="preCurrent"
    infinite
    :srcList="imgList"
  >
    <template #actions="{ url }">
      <image-preview-action name="下载" @click="download(url)"
        ><icon-download
      /></image-preview-action>
    </template>
  </image-preview-group>
  <modal
    v-model:visible="modalVisible"
    :title="clickFile.name"
    ok-text="下载"
    @ok="handleDownloadFile"
    cancel-text="关闭"
    modal-class="crco-upload-preview-modal"
  >
    <spin :loading="modalLoading" style="width: 100%; height: 100%">
      <iframe
        ref="modalIframeRef"
        frameborder="0"
        v-if="modalVisible"
        style="width: 100%; height: 100%"
        :src="clickFile.url"
      ></iframe
    ></spin>
  </modal>
</template>

<script setup lang="ts">
import {
  Notification,
  Upload,
  ImagePreview,
  Modal,
  Spin,
  ImagePreviewAction
} from '@arco-design/web-vue'
import { withDefaults, ref, computed, nextTick } from 'vue'
import ImagePreviewGroup from './preview-group.vue'
import { deepClone } from '../../util/util'
import { customRequest } from '../../util/data-handle'
import {
  isString,
  isImage,
  isArray,
  isUndefined,
  isNull,
  isFunction,
  isBlank,
  isNumber
} from '../../util/is'
import { UploadType } from '../../types/components/upload'
import { AnyObject } from '../../types'

type ModelValueType = string | object | Array<string | object> | null | File

const props = withDefaults(
  defineProps<{
    option: UploadType & AnyObject
    modelValue?: ModelValueType
    readonly?: boolean
  }>(),
  {
    option: () => {
      return {
        limit: 0,
        large: false
      }
    },
    readonly: false
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: ModelValueType): void
  (event: 'change', value: ModelValueType): void
}>()

const isStringify = computed(() => {
  return isString(props.modelValue) || props.option.stringify === true
})

const getFileList = () => {
  const val = props.modelValue
  if (isUndefined(val) || isNull(val) || val === 'undefined' || val === 'null') {
    return []
  }
  if (isString(val) && isBlank(val)) {
    return []
  }
  let tempFileList: Array<any> = []

  let tempVal: Array<any> = []
  if (isStringify.value && isString(val)) {
    try {
      tempVal = JSON.parse(val)
    } catch (e) {
      tempVal.push(val)
    }
  } else {
    tempVal = deepClone(val)
  }
  if (isArray(tempVal)) {
    tempFileList = tempVal
  } else {
    tempFileList = [tempVal]
  }

  let index = 1000
  return tempFileList.map((item: any) => {
    if (isString(item)) {
      // eslint-disable-next-line no-return-assign
      return {
        url: item,
        uid: (index += 500)
      }
    }
    // eslint-disable-next-line no-return-assign
    return Object.assign(item, { uid: (index += 500) })
  })
}

const uploadModelValue = (arr: Array<any>, uploadFinish: boolean) => {
  let tmpArr = arr
  if (props.option.urlOnly === true) {
    tmpArr = arr.map((item) => item.url)
  }
  let val = tmpArr
  if (props.option.limit === 1) {
    val = arr.length > 0 ? tmpArr[0] : undefined
  }
  try {
    if (isStringify.value && !isUndefined(val)) {
      let str: any = isString(val) ? val : JSON.stringify(val)
      if (str === '[]') {
        str = undefined
      }
      if (uploadFinish) {
        emit('update:modelValue', str)
      }
      emit('change', str)
      return
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  if (uploadFinish) {
    emit('update:modelValue', val)
  }
  emit('change', val)
}

const defaultFileList = ref(getFileList())

const fileList = computed({
  get: getFileList,
  set: (val) => {
    let uploadFinish = true
    const arr = val.map((item: any) => {
      const hasFile = !isUndefined(item.file)
      const res: any = {
        name: hasFile ? item.file.name : item.name,
        size: hasFile ? item.file.size : item.size,
        type: hasFile ? item.file.type : item.type,
        filename: item.response && item.response.filename ? item.response.filename : item.name,
        url: item.response && item.response.url ? item.response.url : item.url
      }
      if (props.option.autoUpload === false) {
        res.file = hasFile ? item.file : item
      } else if (props.option.action) {
        if (!res.url || res.url.startsWith('data:')) {
          uploadFinish = false
        }
      }
      return res
    })
    uploadModelValue(arr, uploadFinish)
  }
})
const preVisible = ref(false)
const preCurrent = ref(0)

const getUrl = (data: any) => {
  if (isString(data)) {
    return data
  }
  return data.url
}
const imgList = computed(() => {
  const arr: Array<string> = []
  if (props.option.limit === 1 && fileList.value.length > 0) {
    if (isImage(fileList.value[0])) {
      arr.push(getUrl(fileList.value[0]))
    }
  } else if (isArray(fileList.value)) {
    // @ts-ignore
    fileList.value.forEach((item) => {
      if (isImage(item)) {
        arr.push(getUrl(item))
      }
    })
  }
  return arr
})

// 预览

const isImg = (url: string) => {
  if (!url) {
    return false
  }
  if (url.startsWith('data:image')) {
    return true
  }
  return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(url)
}
const isOffice = (url: string) => {
  return /\.(doc|docx|ppt|pptx|xls|xlsx)$/.test(url)
}
const isPdf = (url: string) => {
  return /\.(pdf)$/.test(url)
}
const isTxt = (url: string) => {
  return /\.(txt)$/.test(url)
}
const getHost = () => {
  return window.document.location.origin
}
const clickFile = ref({
  name: '',
  originUrl: '',
  url: ''
})
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalIframeRef = ref()
const handleDownloadFile = () => {
  window.open(clickFile.value.originUrl)
}
const preview = (file: any) => {
  if (props.option.listType !== 'picture' && props.option.listType !== 'picture-card') {
    const url = file.response && file.response.url ? file.response.url : file.url
    if (!isImg(url)) {
      if (!isPdf(url) && !isOffice(url) && !isTxt(url)) {
        window.open(url)
        return
      }
      clickFile.value = {
        name: file.name,
        originUrl: url,
        url: isOffice(url)
          ? `https://view.officeapps.live.com/op/view.aspx?src=${getHost() + url}`
          : `${url}?view`
      }
      modalLoading.value = true
      modalVisible.value = true
      nextTick(() => {
        if (modalIframeRef.value.attachEvent) {
          // IE
          modalIframeRef.value.attachEvent('onload', () => {
            modalLoading.value = false
          })
        } else {
          // 非IE
          modalIframeRef.value.onload = () => {
            modalLoading.value = false
          }
        }
      })
      return
    }
  }
  preCurrent.value = imgList.value.findIndex((img) => {
    if (img === file.url) {
      return true
    }
    if (file.response && img === file.response.url) {
      return true
    }
    if (img === file.response) {
      return true
    }
    return false
  })
  preVisible.value = true
}
const change = (files: any) => {
  fileList.value = files
}
const onBeforeRemove = (e: any) => {
  if (isFunction(props.option.onBeforeRemove)) {
    return props.option.onBeforeRemove(e)
  }
  return Promise.resolve(true)
}
const onBeforeUpload = (e: any) => {
  // 如果有大小限制
  if (isNumber(props.option.limitSize)) {
    // 判断一下
    if (e.size > props.option.limitSize) {
      Notification.warning('超出可上传文件大小限制')
      return Promise.resolve(false)
    }
  }
  if (isFunction(props.option.onBeforeUpload)) {
    return props.option.onBeforeUpload(e)
  }
  return Promise.resolve(true)
}

const downloadIamge = (imgsrc: string, name: string) => {
  // // 下载图片地址和图片名
  // const image = new Image()
  // // 解决跨域 Canvas 污染问题
  // image.setAttribute('crossOrigin', 'anonymous')
  // image.onload = () => {
  //   const canvas = document.createElement('canvas')
  //   canvas.width = image.width
  //   canvas.height = image.height
  //   const context = canvas.getContext('2d')
  //   if (context) {
  //     context.drawImage(image, 0, 0, image.width, image.height)
  //     const isJpg = /\.(jpg|jpeg|JPG)$/.test(imgsrc)
  //     const url = canvas.toDataURL(isJpg ? 'image/jpg' : 'image/png') // 得到图片的base64编码数据
  //     const a = document.createElement('a') // 生成一个a元素
  //     const event = new MouseEvent('click') // 创建一个单击事件
  //     a.download = name // 设置图片名称
  //     a.href = url // 将生成的URL设置为a.href属性
  //     a.dispatchEvent(event) // 触发a的单击事件
  //   }
  // }
  // image.src = imgsrc
  const a = document.createElement('a') // 生成一个a元素
  const event = new MouseEvent('click') // 创建一个单击事件
  a.download = name // 设置图片名称
  a.href = imgsrc // 将生成的URL设置为a.href属性
  a.dispatchEvent(event) // 触发a的单击事件
}

const download = (url: string) => {
  let name = 'image'
  if (isArray(fileList.value)) {
    const find = fileList.value.find((item) => item === url || item.url === url)
    name = find.name || find.filename || name
  }
  downloadIamge(url, name)
}
</script>
<style scoped lang="scss">
::v-deep(.arco-upload-list-item-name-text) {
  color: rgb(var(--link-6));
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: normal;
  cursor: pointer;
}
.crco-upload-readonly {
  ::v-deep(.arco-upload-list-picture) {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
  ::v-deep(.arco-upload-list-picture-mask) {
    line-height: 40px;
  }
  ::v-deep(.arco-upload-icon-remove),
  ::v-deep(.arco-upload) {
    display: none;
  }
  ::v-deep(.arco-upload-list-item-operation) {
    display: none;
  }
  ::v-deep(.arco-upload-progress) {
    display: none;
  }
  ::v-deep(.arco-upload-list-item-content) {
    background-color: unset;
    padding: 0;
  }
  ::v-deep(.arco-upload-list-item) {
    margin-top: 0;
  }
}
.crco-upload-large {
  ::v-deep(.arco-upload-list-picture) {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  ::v-deep(.arco-upload-list-picture-mask) {
    line-height: 80px;
  }
}
::v-deep(.arco-upload-list.arco-upload-list-type-text .arco-upload-list-item:first-of-type),
::v-deep(.arco-upload-list.arco-upload-list-type-picture .arco-upload-list-item:first-of-type) {
  margin-top: 0;
}
</style>
<style lang="scss">
.crco-upload-preview-modal {
  width: 100%;
  height: 100%;
  max-width: 860px;
  .arco-modal-body {
    height: 90%;
    overflow-y: hidden;
  }
}
</style>
