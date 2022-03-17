<template>
  <el-icon :color="color" :size="size" :class="classes">
    <IconifyVueIcon :icon="iconName" v-bind="$attrs"></IconifyVueIcon>
  </el-icon>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  // import type { IconTypes } from './types'
  import { Icon as IconifyVueIcon } from '@iconify/vue'
  import { toLine } from '@/utils'

  export default defineComponent({
    name: 'Icon',
    components: {
      IconifyVueIcon
    },
    props: {
      collection: {
        type: String,
        default: 'ep'
      },
      color: {
        type: String,
        default: 'auto'
      },
      size: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      },
      classes: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      const { collection, type, icon } = toRefs(props)

      return {
        iconName: computed(() => icon.value || `${collection.value}:${toLine(type.value)}`)
      }
    }
  })
</script>

<style lang="scss" scoped></style>
