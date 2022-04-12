<template>
  <div class="w-full h-screen bg-content-bg overflow-hidden">
    <Menu :menus="asyncRoutes" mode="horizontal"> </Menu>

    <div style="display: flex;">
      <div style="width: 200px;">
        <img class="inline-block" style="height: 30px;" src="@/assets/images/logo.png" />
      </div>
      <el-menu mode="horizontal" style="width: 0; flex: 1;">
        <el-menu-item index="1">Menu1</el-menu-item>
        <el-sub-menu index="21">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">Menu2</el-menu-item>
        <el-menu-item index="3">Menu3</el-menu-item>
        <el-menu-item index="4">Menu4</el-menu-item>
        <el-menu-item index="5">Menu5</el-menu-item>
        <el-menu-item index="6">Menu6</el-menu-item>
        <el-menu-item index="7">Menu7</el-menu-item>
        <el-menu-item index="8">Menu8</el-menu-item>
        <el-menu-item index="9">Menu9</el-menu-item>
        <el-menu-item index="10">Menu10</el-menu-item>
        <el-menu-item index="11">Menu11</el-menu-item>
        <el-menu-item index="12">Menu12</el-menu-item>
      </el-menu>
      <div class="flex items-center">
        <div style="padding: 0 10px;">操作1</div>
        <div style="padding: 0 10px;">操作2</div>
        <div style="padding: 0 10px;">操作3</div>
        <div style="padding: 0 10px;">操作4</div>
      </div>
    </div>

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
