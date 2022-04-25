import { AxiosResponse, Canceler } from 'axios';
import { Ref } from 'vue';

export interface Response<T> {
  status: number;
  data: T;
  msg: string;
}

export type AppAxiosResponse<T> = AxiosResponse<Response<T>>;

export interface RequestResponse<T>{
  instance: Promise<AppAxiosResponse<T>>;
  cancel: Ref<Canceler | undefined>
}

export type Service<T, P extends any[]> = (...args: P) => RequestResponse<T>;

export interface Options<T, P extends any[]> {
  manual?: boolean;
  defaultParams?: P;

  debounceWait?: number;
  debounceLeading?: boolean;
  debounceTrailing?: boolean;

  throttleWait?: number;
  throttleLeading?: boolean;
  throttleTrailing?: boolean;

  queryKey?: (...args: P) => string;
}

export interface IExpose<T> {
  data: T;
  loading: boolean;
  cancel: Ref<Canceler>
}