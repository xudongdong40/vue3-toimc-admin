<template>
  <!-- menu -->
  <el-menu
    :default-active="'1'"
    class="el-menu-custom flex-1"
    :mode="mode"
    :collapse="collapse"
    :background-color="backgroundColor"
    text-color="#ffffffb3"
    active-text-color="#fff"
    :style="{ '--menu-width': width }"
    v-bind="$attrs"
  >
    <slot></slot>
    <template v-for="item in menusWithKeys" :key="item.path">
      <sub-menu :item="item"></sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts">
  import type { AppRouteRecordRaw } from '@/router/types'

  import type { PropType } from 'vue'

  export default defineComponent({
    name: 'Menu',
    props: {
      mode: {
        type: String as PropType<'vertical' | 'horizontal'>,
        default: 'vertical'
      },
      menus: {
        type: Array as PropType<AppRouteRecordRaw[]>,
        default: () => []
      },
      collapse: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '210px'
      },
      backgroundColor: {
        type: String,
        default: '#000'
      }
    },
    emits: ['menuClick'],
    setup(props) {
      const { menus } = toRefs(props)
      // 给树形菜单添加key
      function genMenuKeys(menus: Array<AppRouteRecordRaw>, level = '0') {
        menus.forEach((item, index) => {
          const key = level.indexOf('-') !== -1 ? `${level}${index}` : index + ''
          item.meta = {
            ...item.meta,
            key
          }
          if (item.children) {
            return (item.children = genMenuKeys(item.children, key + '-'))
          }
        })
        return menus
      }
      const menusWithKeys = genMenuKeys(menus.value)
      return {
        menusWithKeys
      }
    }
  })
</script>

<style lang="scss" scoped>
  .el-menu-custom {
    // --menu-width: 210px;
    &:not(.el-menu--collapse) {
      width: var(--menu-width);
    }
  }
</style>
