<template>
  <div>
    <div class="py-3 px-3 h-60px">
      <img class="inline-block h-full" src="@/assets/images/logo.png" />
    </div>
    <div class="flex flex-row h-[calc(100%-60px)]">
      <el-scrollbar class="top-side-menu">
        <Menu
          v-if="layout === 'mixbar'"
          width="auto"
          :menus="allMenu"
          :collapse="false"
          text-color="#fff"
          :is-top="true"
        ></Menu>
      </el-scrollbar>
      <el-scrollbar class="sub-side-menu" :style="{ 'background-color': backgroundColor }">
        <Menu :menus="mainMenu" :text-color="textColor" :collapse="false"></Menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useSettingsStore } from '@/store/modules/settings'
  import { useNav } from '@/components/Menu/useNav'

  export default defineComponent({
    name: 'SiderBar',
    setup() {
      const isCollapse = ref(false)
      const store = useSettingsStore()
      const layout = computed(() => store.layout)
      const { getAllMenu, getSubMenu } = useNav()

      const allMenu = getAllMenu()
      // const topMenu = getTopMenu()
      const subMenu = getSubMenu()

      const mainMenu = computed(() => {
        if (layout.value === 'siderbar') {
          return allMenu.value
        } else if (layout.value === 'mixbar' || layout.value === 'mix') {
          return subMenu.value
        }
      })

      const backgroundColor = computed(() => {
        if (layout.value === 'siderbar' || layout.value === 'mix') {
          return '#282c34'
        } else {
          return '#fff'
        }
      })

      const textColor = computed(() => {
        if (layout.value === 'siderbar' || layout.value === 'mix') {
          return '#fff'
        } else {
          return '#303133'
        }
      })

      return {
        layout,
        allMenu,
        // topMenu,
        subMenu,
        mainMenu,
        isCollapse,
        backgroundColor,
        textColor
      }
    }
  })
</script>

<style lang="scss" scoped>
  .top-side-menu {
    background-color: #282c34;

    :deep(.el-menu-item) {
      padding: 0 6px !important;
      font-size: 14px;
      line-height: unset;
      flex-direction: column;
      justify-content: center;

      .menu-icon {
        margin-right: 0;
        margin-bottom: 1px;
      }
    }
  }

  .sub-side-menu {
    background-color: #fff;
  }
</style>
