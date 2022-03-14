<template>
  <el-icon :color="color" :size="size" :class="classes">
    <component :is="type"></component>
  </el-icon>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { IconTypes } from './types'

export default defineComponent({
  name: 'Icon',
  props: {
    color: {
      type: String,
      default: 'auto'
    },
    size: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<IconTypes>,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    }
  },
  setup() {


    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>