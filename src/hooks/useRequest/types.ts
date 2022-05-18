import { AxiosResponse, Canceler } from 'axios'
import { Ref } from 'vue'

export interface Response<T> {
  status: number
  data: T
  msg: string
}

export type AppAxiosResponse<T> = AxiosResponse<Response<T>>

export interface RequestResponse<T> {
  instance: Promise<AppAxiosResponse<T>>
  cancel: Ref<Canceler | undefined>
}

export type Service<T, P extends any[]> = (...args: P) => RequestResponse<T>

export interface Options<T, P extends any[]> {
  // 是否启用 默认false - 不加入防抖节流
  manual?: boolean
  // 默认参数
  defaultParams?: P

  // 防抖时间
  debounceWait?: number

  // leading  防抖部分 决定延迟前后如何触发, true-先调用后等待
  debounceLeading?: boolean
  // trailing 防抖部分 决定延迟前后如何触发, true-先等待后调用
  debounceTrailing?: boolean

  // 节流时间
  throttleWait?: number
  // 同上 文档：https://www.lodashjs.com/docs/lodash.debounce
  throttleLeading?: boolean
  throttleTrailing?: boolean

  queryKey?: (...args: P) => string
}

export interface IExpose<T> {
  data: T
  loading: boolean
  cancel: Ref<Canceler>
}
