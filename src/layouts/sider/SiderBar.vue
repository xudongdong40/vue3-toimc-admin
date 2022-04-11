<template>
  <div class="w-auto h-full flex flex-col">
    <Menu :menus="asyncRoutes" :collapse="isCollapse" background-color="#282c34">
      <div class="py-6 px-3">
        <img class="inline-block" src="@/assets/images/logo.png" />
      </div>
    </Menu>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { asyncRoutes } from '@/router/index'
  export default defineComponent({
    name: 'SiderBar',
    setup() {
      const isCollapse = ref(false)

      return {
        asyncRoutes,
        isCollapse
      }
    }
  })
</script>

<style lang="scss" scoped></style>
