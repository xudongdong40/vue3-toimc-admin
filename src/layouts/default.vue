<template>
  <div class="w-full h-screen bg-content-bg overflow-hidden">
    <div :class="['layout-' + layout, 'layout-mode-' + layoutMode]">
      <el-scrollbar v-if="layoutMode === 'row'" class="side-bar">
        <sider-bar></sider-bar>
      </el-scrollbar>
      <div class="main-page">
        <div class="layout-header">
          <div class="nav">
            <custom-header
              v-model:collapse="isCollapse"
              class="layout-main"
              :layout="layout"
              @show-theme-setting="handleShowThemeSetting"
            ></custom-header>
          </div>
          <div class="tabs">
            <div class="layout-main">Tabs show here</div>
          </div>
        </div>
        <div class="layout-main">
          <el-scrollbar class="custom-scroll">
            <router-view></router-view>
          </el-scrollbar>
        </div>
      </div>
      <theme-setting v-model:show="isShowThemeSetting"></theme-setting>
    </div>
  </div>
</template>

<script lang="ts">
  import { storeToRefs } from 'pinia'
  import { asyncRoutes } from '@/router/index'
  import CustomHeader from './header/CustomHeader.vue'
  import { useSettingsStore } from '@/store/modules/settings'
  import SiderBar from './sider/SiderBar.vue'

  export default defineComponent({
    components: {
      CustomHeader,
      SiderBar
    },
    setup() {
      const store = useSettingsStore()
      const { layout } = storeToRefs(store)
      const isCollapse = ref(false)
      const isShowThemeSetting = ref(false)

      const layoutMode = computed(() => (layout.value === 'top' ? 'column' : 'row'))

      function handleShowThemeSetting() {
        isShowThemeSetting.value = true
      }

      return {
        layout,
        layoutMode,
        asyncRoutes,
        isCollapse,
        isShowThemeSetting,
        handleShowThemeSetting
      }
    }
  })
</script>

<style lang="scss" scoped>
  :deep(.el-menu) {
    border: none;
  }

  .layout-mode-row {
    display: flex;
    flex-direction: row;
    height: 100%;

    .side-bar {
      background-color: #282c34;
    }

    .main-page {
      flex: 1;
    }
  }

  .layout-mode-column {
    .layout-header {
      .nav {
        color: #ffffffb3;
        background-color: #282c34;
      }
    }

    .layout-main {
      width: 92%;
      margin: auto;
    }
  }
</style>
