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
          :collapse="true"
          text-color="#fff"
          :is-top="true"
        ></Menu>
      </el-scrollbar>
      <el-scrollbar class="sub-side-menu">
        <Menu :menus="mainMenu" :collapse="false"></Menu>
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

      return {
        layout,
        allMenu,
        // topMenu,
        subMenu,
        mainMenu,
        isCollapse
      }
    }
  })
</script>

<style lang="scss" scoped>
  .top-side-menu {
    background-color: #282c34;
  }

  .sub-side-menu {
    background-color: #fff;
  }
</style>
