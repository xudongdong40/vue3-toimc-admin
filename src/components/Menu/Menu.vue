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
      ref="menuRef"
      :default-active="'1'"
      class="flex-1"
      :class="{ 'w-0': mode === 'horizontal' }"
      :mode="mode"
      :collapse="collapse"
      :background-color="backgroundColor"
      :text-color="textColor"
      active-text-color="#fff"
    >
      <template v-for="item in menusWithKeys" :key="item.path">
        <sub-menu :item="item" :collapse="collapse"></sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
  import type { AppRouteRecordRaw } from '@/router/types'
  import { useNav } from './useNav'

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
        default: '#ffffffb3'
      }
    },
    emits: ['menuClick'],
    setup(props, ctx) {
      const { mode, menus, width } = toRefs(props)
      // 设置menu的调试
      const menuHeight = ref(0)
      const scroll = ref()
      const menuRef = ref()
      const { genMenuKeys } = useNav()

      // 给树形菜单添加key
      const menusWithKeys = computed(() => genMenuKeys(menus.value))

      const menuWidth = computed(() => (mode.value === 'vertical' ? width.value : 'auto'))

      const initHeight = async () => {
        const { slots } = ctx
        if (slots.default) {
          const defaults = slots.default()
          if (defaults.length) {
            const elRef = defaults[0]
            const dom = elRef.el as HTMLElement
            // -100的目的是距离底部一定的距离
            if (dom) {
              menuHeight.value = window.innerHeight - dom.offsetHeight
              scroll.value?.update()
            }
          }
        }
      }

      watch(
        () => props.collapse,
        () => {
          initHeight()
        }
      )

      onMounted(() => {
        // 获取slots的高度
        initHeight()

        const debouncedFn = useDebounceFn(() => {
          initHeight()
        }, 1000)

        useResizeObserver(menuRef, debouncedFn)
      })

      return {
        menuWidth,
        menusWithKeys,
        menuHeight,
        menuRef
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

  // .menu-slot-wrap {
  //   width: var(--menu-width);
  // }
  // .el-menu--horizontal {
  //   border-bottom: none;
  // }

  // .el-menu-custom {
  //   // --menu-width: 210px;
  //   &:not(.el-menu--collapse) {
  //     width: var(--menu-width);
  //   }
  // }
</style>
