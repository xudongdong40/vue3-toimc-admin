<template>
  <el-menu-item :index="getIndex(item)" @click="(e) => handleMenuClick(e, item)">
    <icon v-if="item?.meta?.icon" :type="getIcons(item)" />
    <template #title>
      {{
        item.meta?.title
      }}
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import type { AppRouteRecordRaw } from '@/router/types';
import type { PropType } from 'vue'
import { useNav } from './useNav';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<AppRouteRecordRaw>,
      default: () => ({})
    }
  },
  emits: ['menuClick'],
  setup(_props, { emit }) {
    const { menuHasChildren, getIndex, handleMenuClick, getIcons } = useNav(emit)

    return {
      menuHasChildren,
      getIndex,
      handleMenuClick,
      getIcons
    }
  }
})
</script>

<style scoped>
</style>