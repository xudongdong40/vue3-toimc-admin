import { Canceler } from 'axios'
import { debounce, throttle } from 'lodash-es'
import { Options, Service } from './types'
import { useQueries } from './useQueries'

export function useRequest<T, P extends any[]>(
  service: Service<T, P>,
  options: Options<T, P> = {}
) {
  const { manual = false, defaultParams = [] as unknown as P } = options

  const loading = ref(false)
  const data = ref<T>()
  const cancel = ref<Canceler>()
  const { queries, queriesBefore, queriesAfter, queriesFinally, setCancel } = useQueries<T>()

  const serviceFn = async (...args: P) => {
    let key = ''
    if (options.queryKey) {
      key = options.queryKey(...args)
    }
    queriesBefore(key)
    loading.value = true

    const { instance, cancel: c } = service(...args)
    setCancel(key, c.value as Canceler)
    cancel.value = c.value
    instance
      .then((res) => {
        data.value = res.data.data
        queriesAfter(key, res)
      })
      .finally(() => {
        loading.value = false
        queriesFinally(key)
      })
  }

  let run = serviceFn
  if (options.throttleWait) {
    run = throttle(serviceFn, options.throttleWait)
  }
  if (options.debounceWait) {
    run = debounce(serviceFn, options.debounceWait, {
      leading: options.debounceLeading || true,
      trailing: options.debounceTrailing || false
    })
  }

  if (!manual) {
    run(...defaultParams)
  }

  return {
    run,
    loading,
    queries,
    cancel
  }
}
