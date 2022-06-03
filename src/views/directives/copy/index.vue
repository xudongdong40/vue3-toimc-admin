<template>
  <div class="flex flex-col items-center h-full pt-15">
    <span>复制指令 🍇🍇🍇🍓🍓🍓</span>
    <div class="mt-10">
      <el-input v-model="data" placeholder="请输入内容" style="width: 500px">
        <template #append>
          <el-button v-copy="data">复制</el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const data = ref<string>('我是被复制的内容 🍒 🍉 🍊')
</script>

<style lang="scss" scoped></style>
