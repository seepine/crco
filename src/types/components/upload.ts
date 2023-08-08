import { FileItem, RequestOption, UploadRequest } from '@arco-design/web-vue'
import { CustomIcon, ListType } from '@arco-design/web-vue/es/upload/interfaces'

export type UploadType = {
  /**
   * 上传
   *
   * @href <a href="https://arco.design/vue/component/upload">ArcoUpload</a>
   */
  type: 'upload'
  /**
   * @zh 接收的上传文件类型，具体参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept "_blank")
   * @en For the received upload file type, please refer to [HTML standard](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept "_blank")
   */
  accept?: string
  /**
   * @zh 上传的URL
   * @en Uploaded URL
   */
  action?: string
  /**
   * @zh 是否支持多文件上传
   * @en Whether to support multiple file upload
   * @defaultValue false
   */
  multiple?: boolean
  /**
   * @zh 是否支持文件夹上传（需要浏览器支持）
   * @en Whether to support folder upload (requires browser support)
   * @defaultValue false
   */
  directory?: boolean
  /**
   * @zh 是否支持拖拽上传
   * @en Whether to support drag and drop upload
   * @defaultValue false
   */
  draggable?: boolean
  /**
   * @zh 提示文字
   * @en Prompt text
   */
  tip?: string
  /**
   * @zh 上传请求附加的头信息
   * @en Additional header information for upload request
   */
  headers?: Record<string, string>
  /**
   * @zh 上传请求附加的数据
   * @en Upload request additional data
   */
  data?: Record<string, string | Blob> | ((fileItem: FileItem) => Record<string, string | Blob>)
  /**
   * @zh 上传的文件名
   * @en Uploaded file name
   */
  name?: string | ((fileItem: FileItem) => string)
  /**
   * @zh 上传请求是否携带 cookie
   * @en Whether the upload request carries cookies
   * @defaultValue false
   */
  withCredentials?: boolean
  /**
   * @zh 自定义上传行为
   * @en Custom upload behavior
   */
  customRequest?: (option: RequestOption) => UploadRequest
  /**
   * @zh 限制上传文件的数量。`0`表示不限制
   * @en Limit the number of uploaded files. `0` means no limit
   * @defaultValue 0
   */
  limit?: number
  /**
   * @zh 是否自动上传文件
   * @en Whether to upload files automatically
   * @defaultValue true
   */
  autoUpload?: boolean
  /**
   * @zh 是否显示文件列表
   * @en Whether to display the file list
   * @defaultValue true
   */
  showFileList?: boolean
  /**
   * @zh 是否显示删除按钮
   * @en Whether to display the remove button
   * @version 2.11.0
   * @defaultValue true
   */
  showRemoveButton?: boolean
  /**
   * @zh 是否显示重试按钮
   * @en Whether to display the retry button
   * @version 2.11.0
   * @defaultValue true
   */
  showRetryButton?: boolean
  /**
   * @zh 是否显示取消按钮
   * @en Whether to display the cancel button
   * @version 2.11.0
   * @defaultValue true
   */
  showCancelButton?: boolean
  /**
   * @zh 是否显示上传按钮。2.14.0 版本新增 `showOnExceedLimit` 支持
   * @en Whether to display the retry button. Added `showOnExceedLimit` support in version 2.14.0
   * @version 2.11.0
   * @defaultValue true
   */
  showUploadButton?: boolean | { showOnExceedLimit: boolean }
  /**
   * @zh 照片墙是否显示预览按钮
   * @en Whether to display the preview button in picture-card
   * @version 2.42.0
   * @defaultValue true
   */
  showPreviewButton?: boolean
  /**
   * @zh 是否在 `<a>` 链接上添加 download 属性
   * @en Whether to add download attribute to `<a>` link
   * @version 2.11.0
   * @defaultValue false
   */
  download?: boolean
  /**
   * @zh 在列表模式下，如果上传的文件存在 URL 则展示链接。如果关闭仅展示文字并且点击可以触发 `preview` 事件。
   * @en In the list mode, if the uploaded file has a URL, the link will be displayed. If you turn off only display text and click to trigger the `preview` event.
   * @version 2.13.0
   * @defaultValue true
   */
  showLink?: boolean
  /**
   * @zh `<img>` 的原生 HTML 属性，需要浏览器支持
   * @en Native HTML attributes of `<img>`, browser support is required
   * @version 2.11.0
   */
  imageLoading?: 'eager' | 'lazy'
  /**
   * @zh 图片列表类型
   * @en Picture list type
   * @values 'text','picture','picture-card'
   * @defaultValue 'text'
   */
  listType?: ListType
  /**
   * @zh Response中获取图片URL的key，开启后会用上传的图片替换预加载的图片
   * @en Get the key of the image URL in the Response. After opening, it will replace the pre-load image with the uploaded image
   */
  responseUrlKey?: string | ((fileItem: FileItem) => string)
  /**
   * @zh 自定义图标
   * @en Custom icon
   */
  customIcon?: CustomIcon
  /**
   * @zh 是否使用 ImagePreview 组件进行预览
   * @version 2.14.0
   * @defaultValue false
   */
  imagePreview?: boolean
  /**
   * @zh 上传文件前触发
   * @en Trigger before uploading a file
   */
  onBeforeUpload?: (file: File) => boolean | Promise<boolean | File>
  /**
   * @zh 移除文件前触发
   * @en Triggered before removing the file
   */
  onBeforeRemove?: (fileItem: FileItem) => Promise<boolean>
  /**
   * @zh 点击上传按钮触发（如果返回 Promise 则会关闭默认 input 上传）
   * @en Click the upload button to trigger (if the Promise is returned, the default input upload will be closed)
   */
  onButtonClick?: (event: Event) => Promise<FileList> | void

  /** ******************** 以下为扩展属性 ******************** */

  /**
   * @zh 是否序列号为字符串
   * @default false
   */
  stringify?: boolean
  /**
   * @zh 是否仅返回url
   * @default false
   */
  urlOnly?: boolean
  /**
   * @zh 限制大小，若文件超过此大小则 Notification.warning 提示
   */
  limitSize?: number
  /**
   * @zh 是否只读
   * @default false
   */
  readonly?: boolean
  /**
   * @zh 图片模式时是否显示大图，默认40px，为true则80px
   * @default false
   */
  large?: boolean
}
