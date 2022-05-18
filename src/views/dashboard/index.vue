<template>
  <div class="dashboard-body">
    <dashboard-card
      title="总销量"
      :body-style="{
        backgroundColor: '#ff654c',
        backgroundImage: 'linear-gradient(to right, #74bcff , #1890ff)',
        color: '#fff'
      }"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import DashboardCard from './components/card/index.vue'
  // import { DescItem } from '@/components/Descriptions/types'
  // import Mock from 'mockjs'

  export default defineComponent({
    name: 'DashBoard',
    components: {
      DashboardCard
    },
    setup() {
      return {}
    }
  })
</script>

<style scoped lang="scss">
.dashboard-body {
  width: 100%;
  padding: 20px;
  display: flex;
  background: #f6f8f9;
}
</style>
