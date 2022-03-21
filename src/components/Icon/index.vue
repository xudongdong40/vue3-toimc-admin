<template>
  <el-icon :color="color" :size="size" :class="classes" @click="handleClick">
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
    emits: ['click'],
    setup(props, { emit }) {
      const { collection, type, icon } = toRefs(props)
      const handleClick = () => {
        emit('click')
      }

      return {
        iconName: computed(() => icon.value || `${collection.value}:${toLine(type.value)}`),
        handleClick
      }
    }
  })
</script>

<style lang="scss" scoped></style>
