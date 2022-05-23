<template>
  <t-card
    header="分布"
    :class="{
      'dashboard-card': true,
      'no-border': !haveBorder,
      'hover-shadow': hoverShadow
    }"
    :body-style="{ ...bodyStyle, height: '100%' }"
    shadow="never"
  >
    <div id="echartsMain"></div>
  </t-card>
</template>

<script lang="ts">
  import { CSSProperties, defineComponent, onMounted } from 'vue'
  import * as echarts from 'echarts'
  // import Mock from 'mockjs'

  export default defineComponent({
    name: 'EchartsBoard',
    props: {
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
    setup() {
      const drawImg = () => {
        const chartDom: HTMLElement = document.getElementById('echartsMain') as HTMLElement;
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
                normal: {
                  length: 20
                }
              },
              data: [
                { value: 1048, name: '搜索引擎' },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' },
                { value: 484, name: '联盟广告' },
                { value: 300, name: '视频广告' }
              ]
            }
          ]
        };
        option && myChart.setOption(option);
      }
      
      onMounted(() => {
        drawImg()
      })
      return {}
    }
  })
</script>

<style scoped lang="scss">
  #echartsMain {
    width: 500px;
    height: 300px;
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
