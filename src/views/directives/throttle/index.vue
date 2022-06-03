<template>
  <div class="flex flex-col items-center h-full pt-15">
    <span>节流指令 🍇🍇🍇🍓🍓🍓</span>
    <div class="mt-10">
      <el-button v-throttle="throttleClick" type="primary">节流按钮 (每隔1S秒后执行)</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  const throttleClick = () => {
    ElMessage.success('我是节流按钮触发的事件 🍍🍓🍌')
  }
</script>
