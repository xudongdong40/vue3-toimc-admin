<template>
  <div class="flex flex-col items-center h-full pt-15">
    <span>防抖指令 🍇🍇🍇🍓🍓🍓</span>
    <div class="mt-10">
      <el-button v-debounce="debounceClick" type="primary">防抖按钮 (0.5秒后执行)</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  const debounceClick = () => {
    ElMessage.success('我是防抖按钮触发的事件 🍍🍓🍌')
  }
</script>
