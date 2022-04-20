<template>
  <div class="layout-tabs flex justify-between items-center px-20px h-50px">
    <el-tabs
      v-model="tabActive"
      type="card"
      class="tabs-content"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :label="$t(item.meta.title)"
        :name="item.path"
        :closable="!isAffix(item)"
      ></el-tab-pane>
    </el-tabs>

    <!-- <el-dropdown @command="handleCommand">
      <span style="cursor: pointer">
        更多操作
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="tabs-more">
        <el-dropdown-item command="closeOtherstabs">
          <vab-icon :icon="['fas', 'times-circle']" />
          关闭其他
        </el-dropdown-item>
        <el-dropdown-item command="closeLefttabs">
          <vab-icon :icon="['fas', 'arrow-alt-circle-left']"></vab-icon>
          关闭左侧
        </el-dropdown-item>
        <el-dropdown-item command="closeRighttabs">
          <vab-icon :icon="['fas', 'arrow-alt-circle-right']"></vab-icon>
          关闭右侧
        </el-dropdown-item>
        <el-dropdown-item command="closeAlltabs">
          <vab-icon :icon="['fas', 'ban']"></vab-icon>
          关闭全部
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
  </div>
</template>

<script lang="ts">
  import path from 'path'
  import { defineComponent } from 'vue'
  import { useTabsStore } from '@/store/modules/tabsbar'
  import { useStore } from '@/store/modules/menu'
  import { useRoute, useRouter } from 'vue-router'
  import { AppRouteRecordRaw } from '@/router/types'

  export default defineComponent({
    name: 'MultiTabs',
    setup() {
      const store = useTabsStore()
      const menuStore = useStore()
      let tabActive = ref('')
      const route = useRoute()
      const router = useRouter()

      const isAffix = (tag) => {
        return tag.meta && tag.meta.affix
      }

      const visitedRoutes = computed(() => store.visitedRoutes)

      const filterAffixtabs = (routes, basePath = '/') => {
        let tabs: any = []
        routes.forEach((route) => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tabs.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta }
            })
          }
          if (route.children) {
            const temptabs = filterAffixtabs(route.children, route.path)
            if (temptabs.length >= 1) {
              tabs = [...tabs, ...temptabs]
            }
          }
        })
        return tabs
      }

      const handleTabClick = (tab) => {
        const r = visitedRoutes.value.filter((item, index) => {
          if (tab.index == index) return item
        })[0]
        if (route.path !== r.path) {
          router.push({
            path: r.path
            // query: route.query,
            // fullPath: route.fullPath
          })
        } else {
          return false
        }
      }

      const handleTabRemove = (tabActive) => {
        let view = {} as AppRouteRecordRaw
        visitedRoutes.value.forEach((item) => {
          if (tabActive == item.path) {
            view = item
          }
        })
        store.delVisitedRoute(view)
        if (view.path === route.path) {
          const latestView = visitedRoutes.value.slice(-1)[0]
          if (latestView) {
            router.push(latestView)
          } else {
            router.push('/')
          }
        }
      }

      watch(
        () => route.path,
        () => {
          const affixtabs = filterAffixtabs(menuStore.menus)
          for (const tag of affixtabs) {
            if (tag.name) {
              store.addVisitedRoute(tag)
            }
          }
          if (route.name) {
            store.addVisitedRoute(route)
          }
          store.visitedRoutes.forEach((item) => {
            if (item.path === route.path) {
              tabActive.value = item.path
            }
          })
        },
        {
          immediate: true
        }
      )

      return {
        visitedRoutes,
        tabActive,
        isAffix,
        handleTabClick,
        handleTabRemove
      }
    }
  })
</script>

<style lang="scss" scoped>
  .layout-tabs {
    background-color: #fff;
    border-top: 1px solid #f6f6f6;
    user-select: none;
  }
</style>
