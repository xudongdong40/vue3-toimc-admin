<template>
  <div :style="{ width: menuWidth }">
    <div class="py-3 px-3 h-60px">
      <img class="inline-block h-full" src="@/assets/images/logo.png" />
    </div>
    <div class="flex flex-row h-[calc(100%-60px)]">
      <el-scrollbar class="top-side-menu">
        <Menu
          v-if="layout === 'mixbar'"
          width="auto"
          :menus="topMenu"
          :collapse="false"
          text-color="#fff"
          :default-active="defaultActive"
          :is-top="true"
        ></Menu>
      </el-scrollbar>
      <el-scrollbar class="sub-side-menu" :style="{ 'background-color': backgroundColor }">
        <Menu
          :menus="mainMenu"
          :default-active="defaultSubActive"
          :text-color="textColor"
          :collapse="collapse"
        ></Menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useSettingsStore } from '@/store/modules/settings'
  import { useStore } from '@/store/modules/menu'
  import { useRoute } from 'vue-router'
  import _ from 'lodash-es'

  export default defineComponent({
    name: 'SiderBar',
    props: {
      collapse: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const menuStore = useStore()
      const store = useSettingsStore()
      const layout = computed(() => store.layout)
      const route = useRoute()
      const routeName = computed(() => route.name)
      const curRoutePath = computed(() => route.path)

      const menuWidth = computed(() => {
        if (store.layout !== 'top') {
          if (props.collapse) {
            return '64px'
          } else {
            return store.menuWidth
          }
        } else {
          return ''
        }
      })

      const allMenu = computed(() => menuStore.menus)

      const mainMenu = computed(() => {
        if (layout.value === 'siderbar') {
          return allMenu.value
        } else if (layout.value === 'mixbar' || layout.value === 'mix') {
          return (
            menuStore.menus?.find((item) =>
              [item.path, item.redirect].includes('/' + curRoutePath.value.split('/')[1])
            )?.children || []
          )
        }
      })

      const topMenu = computed(() => {
        return _.cloneDeep(allMenu.value)?.map((item) => {
          delete item.children
          return item
        })
      })

      const defaultSubActive = computed(() => {
        if (routeName) {
          let currentKey = ''
          const findActive = function (arr) {
            arr.forEach((item) => {
              if (item.name === routeName.value) {
                currentKey = item.meta.key
                return
              } else if (item.children && item.children.length > 0) {
                findActive(item.children)
              }
            })
          }
          findActive(mainMenu.value)
          return currentKey
        }
      })

      const defaultActive = computed(() => defaultSubActive.value?.split('-')[0])

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
        menuWidth,
        defaultActive,
        defaultSubActive,
        layout,
        allMenu,
        topMenu,
        mainMenu,
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
