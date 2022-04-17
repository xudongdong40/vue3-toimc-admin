<template>
  <el-menu-item :index="getIndex(item)" @click="(e) => handleMenuClick(e, item)">
    <icon v-if="item?.meta?.icon" :type="getIcons(item)" />
    <template #title>{{ $t(item.meta?.title) }}</template>
    <div v-if="showTitle">{{ $t(item.meta?.title) }}</div>
  </el-menu-item>
</template>

<script lang="ts">
  import type { AppRouteRecordRaw } from '@/router/types'
  import type { PropType } from 'vue'
  import { useNav } from './useNav'
  import { isUrl } from '@/utils/is'

  export default defineComponent({
    name: 'MenuItem',
    props: {
      item: {
        type: Object as PropType<AppRouteRecordRaw>,
        default: () => ({})
      },
      showTitle: {
        type: Boolean,
        default: false
      }
    },
    emits: ['menuClick'],
    setup(_props, { emit }) {
      const router = useRouter()
      const { menuHasChildren, getIndex, getIcons } = useNav()

      // 菜单点击回调
      function handleMenuClick(e, item: AppRouteRecordRaw) {
        const { push } = router
        if (isUrl(item.path)) {
          window.open(item.path)
        } else {
          push(item)
        }
        emit('menuClick', e)
      }

      return {
        menuHasChildren,
        getIndex,
        handleMenuClick,
        getIcons
      }
    }
  })
</script>

<style scoped></style>
