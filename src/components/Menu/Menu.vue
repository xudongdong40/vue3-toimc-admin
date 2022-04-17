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
      <template v-if="!isTop">
        <sub-menu
          v-for="item in menusWithKeys"
          :key="item.path"
          :item="item"
          :collapse="collapse"
        ></sub-menu>
      </template>
      <template v-else>
        <menu-item
          v-for="item in topMenusWithKeys"
          :key="item.path"
          :show-title="true"
          :item="item"
        ></menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
  import type { AppRouteRecordRaw } from '@/router/types'
  import { useNav } from './useNav'

  import type { PropType } from 'vue'
  import { useRoute } from 'vue-router'

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
      isTop: {
        type: Boolean,
        default: false
      }
    },
    emits: ['menuClick'],
    setup(props) {
      const { mode, menus, width, isTop } = toRefs(props)
      // 设置menu的调试
      const menuHeight = ref(0)
      // const scroll = ref()
      const menuRef = ref()
      const { genMenuKeys } = useNav()
      const route = useRoute()

      // 给树形菜单添加key
      let menusWithKeys = computed(() => genMenuKeys(menus.value))

      // 顶级菜单含key
      const topMenusWithKeys = computed(() => {
        let topMenus: Array<object> = []
        menusWithKeys.value.forEach((item) => {
          let menu = {}
          let item2 = Object.assign({}, unref(item))
          Object.keys(item2).forEach((i) => {
            if (i !== 'children') {
              menu[i] = item[i]
            }
          })
          topMenus.push(menu)
        })
        return topMenus
      })

      const routeName = computed(() => route.name)

      const defaultActive = computed(() => {
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
        findActive(menusWithKeys.value)
        return isTop.value ? currentKey.split('-')[0] : currentKey
      })

      const menuWidth = computed(() => (mode.value === 'vertical' ? width.value : 'auto'))

      // const initHeight = async () => {
      //   const { slots } = ctx
      //   if (slots.default) {
      //     const defaults = slots.default()
      //     if (defaults.length) {
      //       const elRef = defaults[0]
      //       const dom = elRef.el as HTMLElement
      //       // -100的目的是距离底部一定的距离
      //       if (dom) {
      //         menuHeight.value = window.innerHeight - dom.offsetHeight
      //         scroll.value?.update()
      //       }
      //     }
      //   }
      // }

      // watch(
      //   () => props.collapse,
      //   () => {
      //     initHeight()
      //   }
      // )

      // onMounted(() => {
      //   // 获取slots的高度
      //   initHeight()

      //   const debouncedFn = useDebounceFn(() => {
      //     initHeight()
      //   }, 1000)

      //   useResizeObserver(menuRef, debouncedFn)
      // })

      return {
        menuWidth,
        menusWithKeys,
        topMenusWithKeys,
        menuHeight,
        menuRef,
        defaultActive
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
