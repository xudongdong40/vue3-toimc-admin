<template>
  <div class="w-full h-screen bg-content-bg overflow-hidden">
    <div :class="['layout-' + layout, 'layout-mode-' + layoutMode, 'h-full']">
      <sider-bar v-if="layoutMode === 'row'"></sider-bar>
      <div
        class="flex-1 h-full"
        :class="{ 'overflow-auto': fixHeader !== true, 'w-0': layout !== 'top' }"
      >
        <div class="layout-header">
          <div class="nav">
            <custom-header
              v-model:collapse="isCollapse"
              class="layout-main"
              :layout="layout"
              @show-theme-setting="handleShowThemeSetting"
            ></custom-header>
          </div>
          <div class="tabs bg-white">
            <multi-tabs></multi-tabs>
            <!-- <div class="layout-main">Tabs show here</div> -->
          </div>
        </div>
        <div class="layout-main" :class="{ 'h-[calc(100%-84px)]': fixHeader === true }">
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
  import { useSettingsStore } from '@/store/modules/settings'
  import SiderBar from './sider/SiderBar.vue'
  import CustomHeader from './header/CustomHeader.vue'
  import MultiTabs from './tabs/MultiTabs.vue'

  export default defineComponent({
    components: {
      CustomHeader,
      SiderBar,
      MultiTabs
    },
    setup() {
      const store = useSettingsStore()
      const { layout, fixHeader } = storeToRefs(store)
      const isCollapse = ref(false)
      const isShowThemeSetting = ref(false)

      const layoutMode = computed(() => (layout.value === 'top' ? 'column' : 'row'))

      function handleShowThemeSetting() {
        isShowThemeSetting.value = true
      }

      return {
        layout,
        layoutMode,
        fixHeader,
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
