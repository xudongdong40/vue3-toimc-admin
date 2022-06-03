import type { ECharts } from 'echarts'
// import { debounce } from 'lodash-es'

export function useCharts() {
  const chartRef = ref<ECharts | null>(null)

  // onMounted(() => {
  //   if (responsive) {
  //     window.addEventListener('resize', debounce(resize, 200))
  //   }
  // })

  // function resize() {
  //   chartRef.value?.resize()
  // }

  // function destroy() {
  //   chartRef.value = null
  //   if (responsive) {
  //     window.removeEventListener('resize', resize)
  //   }
  // }

  function delegate(method: string, ...args: any[]) {
    return chartRef.value?.[method](...args)
  }

  // onUnmounted(destroy)

  return { chartRef, delegate }
}
