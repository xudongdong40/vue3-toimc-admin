<template>
  <div class="flex flex-col items-center h-full pt-15">
    <span>拖拽指令 🍇🍇🍇🍓🍓🍓</span>
    <div v-draggable class="box">我可以拖拽哦~</div>
  </div>
</template>

<style lang="scss" scoped>
  .box {
    top: 100px;
    width: 300px;
    height: 300px;
    font-size: 24px;
    line-height: 300px;
    color: #b2bec3;
    text-align: center;
    background: #dfe6e9;
    border-radius: 50%;
    user-select: none;
  }
</style>
