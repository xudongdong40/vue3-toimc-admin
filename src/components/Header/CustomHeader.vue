<template>
  <!-- header -->
  <el-header class="nav flex justify-between items-center bg-white">
    <el-row>
      <div @click="() => handleClick(collapse)">
        <icon :type="collapse ? 'Expand' : 'Fold'" size="24px" />
      </div>
    </el-row>
    <el-row class="items-center">
      <div class="pr-4">
        <icon type="HomeFilled" size="24px" />
      </div>
      <icon type="Bell" size="24px" />
      <el-divider direction="vertical"></el-divider>
      <el-avatar
        :size="32"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <span>管理员</span>
      <el-divider direction="vertical"></el-divider>
      <span class="pr-1">退出</span>
      <icon type="SwitchButton" size="24px" />
    </el-row>
  </el-header>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'CustomHeader',
    props: {
      collapse: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:collapse'],
    setup(_props, { emit }) {
      function handleClick(flag: boolean) {
        emit('update:collapse', !flag)
      }

      return {
        handleClick
      }
    }
  })
</script>

<style scoped></style>
