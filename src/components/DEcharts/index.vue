<template>
  <div ref="chartRef" class="chart" @resize="resize"></div>
</template>

<script lang="ts">
  import * as echarts from 'echarts'
  import { debounce } from 'lodash-es'
  import type { ECharts } from 'echarts'

  export default defineComponent({
    props: {
      option: {
        type: Object,
        default: () => {}
      },
      responsive: {
        type: Boolean,
        default: true
      }
    },
    setup(props: any) {
      const chartRef = ref<any>(null)
      const chart = ref<ECharts | null>(null)

      const init = (option: any) => {
        chart.value = echarts.init(chartRef.value)
        chart.value.setOption(option)

        if (props.responsive) {
          window.addEventListener('resize', debounce(resize, 200))
        }
      }

      const resize = () => {
        chart.value?.resize()
      }

      const destroy = () => {
        chart.value = null
        if (props.responsive) {
          window.removeEventListener('resize', resize)
        }
      }

      onMounted(() => {
        init(props.option)
      })

      onUnmounted(destroy)

      return { chartRef, chart, init, resize, destroy }
    }
  })
</script>

<style lang="scss" scoped>
  .chart {
    width: 100%;
    height: 400px;
  }
</style>
