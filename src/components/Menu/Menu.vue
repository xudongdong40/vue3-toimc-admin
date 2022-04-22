<template>
  <!-- menu -->
  <div
    class="flex"
    :class="['menu-mode-' + mode, mode === 'horizontal' ? 'flex-row flex-1 pr-50px' : 'flex-col']"
    :style="{ width: menuWidth }"
  >
    <div class="flex items-center flex-shrink-0">
      <slot></slot>
    </div>
    <el-menu
      v-bind="$attrs"
      :default-active="defaultActive"
      class="flex-1"
      :class="{ 'w-0': mode === 'horizontal' }"
      :mode="mode"
      :collapse="collapse"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :default-openeds="defaultOpeneds"
    >
      <sub-menu v-for="item in menus" :key="item.path" :item="item" :collapse="collapse"></sub-menu>
    </el-menu>
  </div>
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
        default: '266px'
      },
      backgroundColor: {
        type: String,
        default: 'transparent'
      },
      textColor: {
        type: String,
        default: '#303133'
      },
      activeTextColor: {
        type: String,
        default: '#303133'
      },
      defaultOpeneds: {
        type: Array,
        default: () => []
      },
      defaultActive: {
        type: String,
        default: ''
      }
    },
    emits: ['menuClick'],
    setup(props) {
      const { mode, width } = toRefs(props)
      const menuWidth = computed(() => (mode.value === 'vertical' ? width.value : 'auto'))
      return {
        menuWidth
      }
    }
  })
</script>

<style lang="scss" scoped>
  .menu-mode-horizontal {
    :deep(.el-menu--horizontal > .el-menu-item.is-active) {
      color: #1890ff !important;
      border-bottom: 2px solid #1890ff;
    }

    :deep(.el-menu-item:not(.is-disabled):hover) {
      color: #1890ff;
      background-color: transparent;
    }
  }

  .menu-mode-vertical {
    :deep(.el-menu-item.is-active) {
      color: #fff;
      background-color: #1890ff;
    }
  }
</style>
