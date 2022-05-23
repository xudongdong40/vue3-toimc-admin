<template>
  <div class="dashboard-body">
    <el-row>
      <el-col :span="6">
        <dashboard-card
          :options="{
            title: '总销量',
            end: end1,
            dot: 2,
            prefix: '￥',
            mainIcon: 'RMBc',
            dataFrom: '自上周以来',
            dataStatus: 'rise',
            dataNum: '12%'
          }"
          :have-border="false"
          :hover-shadow="false"
          :body-style="{
            backgroundColor: '#ff654c',
            backgroundImage: 'linear-gradient(to right, #74bcff , #1890ff)',
            color: '#fff'
          }"
        />
      </el-col>
      <el-col :span="6">
        <dashboard-card
          :options="{
            title: '总成交',
            end: end2,
            mainIcon: 'RMBs',
            dataFrom: '自上周以来',
            dataStatus: 'riseC',
            dataNum: '36%'
          }"
        />
      </el-col>
      <el-col :span="6">
        <dashboard-card
          :options="{
            title: '活跃用户',
            end: end3,
            mainIcon: 'user',
            dataFrom: '自上周以来',
            dataStatus: 'fallC',
            dataNum: '5%'
          }"
        />
      </el-col>
      <el-col :span="6">
        <dashboard-card
          :options="{
            title: '订单',
            end: end4,
            mainIcon: 'order',
            dataFrom: '自上周以来',
            dataStatus: 'riseC',
            dataNum: '8%'
          }"
        />
      </el-col>
    </el-row>
    <echarts-board />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import DashboardCard from './components/card/index.vue'
  import EchartsBoard from './components/board/index.vue'
  // import { DescItem } from '@/components/Descriptions/types'
  import Mock from 'mockjs'

  export default defineComponent({
    name: 'DashBoard',
    components: {
      DashboardCard,
      EchartsBoard
    },
    setup() {
      const end1 = Mock.mock('@float(100, 50000, 2, 2)')
      const end2 = Mock.mock('@float(600, 3000)')
      const end3 = Mock.mock('@float(5000, 60000)')
      const end4 = Mock.mock('@float(800, 6000)')
      return {
        end1,
        end2,
        end3,
        end4
      }
    }
  })
</script>

<style scoped lang="scss">
.dashboard-body {
  width: 100%;
  padding: 20px;
  background: #f6f8f9;
}
</style>
