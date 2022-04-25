import { Canceler } from 'axios';
import { UnwrapRef } from 'vue';
import { AppAxiosResponse, IExpose } from './types';



export function useQueries<T>() {
  const queries = reactive<Record<string, IExpose<T>>>({});

  const interceptor = (key) => {
    if(!key) return false;
    if(!queries[key]) {
      queries[key] = {} as any;
    }
    return true
  }

  const queriesBefore = (key) => {
    if(!interceptor(key)) return;
    queries[key].loading = true;
  }

  const setCancel = (key, cancel: Canceler) => {
    if(!interceptor(key)) return;
    if(!cancel) return;
    queries[key].cancel = cancel;
  }

  const queriesAfter = (key, res: AppAxiosResponse<T>) => {
    if(!interceptor(key)) return;
    queries[key].data = <UnwrapRef<T>>res.data.data;
  }

  const queriesFinally = (key) => {
    if(!interceptor(key)) return;
    queries[key].loading = false;
  }

  return {
    queries,
    queriesBefore,
    setCancel,
    queriesAfter,
    queriesFinally
  }

}