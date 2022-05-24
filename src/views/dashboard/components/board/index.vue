<template>
  <t-card
    :header="title"
    :class="{
      'dashboard-card': true,
      'no-border': !haveBorder,
      'hover-shadow': hoverShadow
    }"
    :body-style="{ ...bodyStyle, height: '100%' }"
    shadow="never"
  >
    <div v-if="type === 'pie'" id="pieMain"></div>
    <div v-if="type === 'line'" id="lineMain"></div>
    <div v-if="type === 'bar'" id="barMain"></div>
  </t-card>
</template>

<script lang="ts">
  import { CSSProperties, defineComponent, onMounted } from 'vue'
  import * as echarts from 'echarts'
  // import Mock from 'mockjs'

  export default defineComponent({
    name: 'EchartsBoard',
    props: {
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'line'
      },
      data: {
        type: Object,
        default: () => ({})
      },
      haveBorder: {
        type: Boolean,
        default: true
      },
      hoverShadow: {
        type: Boolean,
        default: true
      },
      bodyStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
      }
    },
    setup(props) {
      const drawLine = () => {
        const chartDom: HTMLElement = document.getElementById('lineMain') as HTMLElement;
        const myChart = echarts.init(chartDom);
        const option = {
          color: ['#80FFA5', '#00DDFF'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '1%',
            top: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '签单',
              type: 'line',
              smooth: true,
              lineStyle: {
                width: 3
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.6,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(128, 255, 165)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(1, 191, 236)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data: props.data.line1
            },
            {
              name: '回款',
              type: 'line',
              smooth: true,
              lineStyle: {
                width: 3
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.6,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(0, 221, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(77, 119, 255)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data: props.data.line2
            }
          ]
        };
        option && myChart.setOption(option);
      }
      const drawPie = () => {
        const chartDom: HTMLElement = document.getElementById('pieMain') as HTMLElement;
        const myChart = echarts.init(chartDom);
        const option = {
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: true,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              labelLine:{
                show: true,
                length: 8
              },
              data: props.data.pie
            }
          ]
        };
        option && myChart.setOption(option);
      }
      const drawBar = () => {
        const chartDom: HTMLElement = document.getElementById('barMain') as HTMLElement;
        const myChart = echarts.init(chartDom);
        const option = {
          color: '#4e53df',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          dataset: [
            {
              dimensions: ['name', 'score'],
              source: props.data.bar
            },
            {
              transform: {
                type: 'sort',
                config: { dimension: 'score', order: 'desc' }
              }
            }
          ],
          grid: {
            left: '1%',
            right: '5%',
            bottom: '1%',
            top: '1%',
            containLabel: true
          },
          xAxis: {
            axisLine: {
              show: false
            },
            axisTick:{
              show: false
            }
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick:{
              show: false
            },
            type: 'category',
            inverse: true,
            axisLabel: { interval: 0, rotate: 0 }
          },
          series: {
            type: 'bar',
            encode: { x: 'score', y: 'name' },
            datasetIndex: 1,
            itemStyle: {
              borderRadius: 30
            }
          }
        };
        option && myChart.setOption(option);
      }
      
      onMounted(() => {
        const { type } = props;
        if (type === 'line') {
          drawLine()
        }
        if (type === 'pie') {
          drawPie()
        }
        if (type === 'bar') {
          drawBar()
        }
      })
      return {}
    }
  })
</script>

<style scoped lang="scss">
  #lineMain, #pieMain {
    width: 100%;
    height: 200px;
  }
  #barMain {
    width: 100%;
    height: 200px;
  }
  .dashboard-card {
    margin: 0 5px;
    background-color: transparent;
    box-sizing: border-box;
    :deep(.el-card) {
      height: 100%;
    }
  }
  .no-border {
    :deep(.el-card) {
      border: none;
    }
  }
  .hover-shadow {
    &:hover {
      transition: all 0.2s;
      box-shadow: 0 0 15px #b3b3b3;
    }
  }
</style>
