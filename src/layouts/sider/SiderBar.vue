<template>
  <div class="w-auto">
    <Menu :menus="showRoutes" :collapse="isCollapse" background-color="#282c34">
      <div class="py-6 px-3">
        <img class="inline-block" src="@/assets/images/logo.png" />
      </div>
    </Menu>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { asyncRoutes } from '@/router/index'
  import { useRoute } from 'vue-router'
  import { useSettingsStore } from '@/store/modules/settings'

  export default defineComponent({
    name: 'SiderBar',
    setup() {
      const isCollapse = ref(false)
      const route = useRoute()
      const curRoutePath = unref(toRaw(route).path)

      console.log(curRoutePath)

      const mixSideMenu = computed(() => {
        return (
          asyncRoutes.find((item) =>
            [item.path, item.redirect].includes('/' + curRoutePath.split('/')[1])
          )?.children || []
        )
      })

      const store = useSettingsStore()
      const layout = store.layout

      const showRoutes = computed(() => {
        if (layout === 'sidebar') {
          return curRoutePath
        } else if (layout === 'mix') {
          return mixSideMenu
        }
      })

      console.log(showRoutes)

      return {
        showRoutes,
        isCollapse
      }
    }
  })
</script>

<style lang="scss" scoped></style>
