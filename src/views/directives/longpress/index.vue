<template>
  <div class="flex flex-col items-center h-full pt-15">
    <span>长按指令 🍇🍇🍇🍓🍓🍓</span>
    <div class="mt-10">
      <el-button v-longPress="longpress" type="primary">长按2秒触发事件</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  const longpress = () => {
    ElMessage.success('长按事件触发成功 🎉🎉🎉')
  }
</script>
