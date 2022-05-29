<template>
  <ul :class="['flex', ...addCls]">
    <li
      v-for="(item, index) in newImages"
      :key="item"
      class="rounded-full flex border-white"
      :style="{
        marginLeft: -gutter + 'px',
        borderColor,
        borderWidth,
        zIndex: reverse ? newImages.length - index : index
      }"
    >
      <slot name="item" :item="item">
        <el-avatar :src="item" :size="size" @click="() => handleClick(item, index)"></el-avatar>
      </slot>
    </li>
    <li v-if="num && showMore" class="ml-1">...</li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      // 数据源
      images: {
        type: Array as PropType<string[]>,
        default: () => []
      },
      // 最多显示5个
      num: {
        type: Number,
        default: 5
      },
      // 头像大小
      size: {
        type: Number,
        default: 32
      },
      direction: {
        type: String as PropType<'vertical' | 'horizontal'>,
        default: 'horizontal'
      },
      // 叠加的偏移量，默认是margin-left: 0
      gutter: {
        type: Number,
        default: 0
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: 'white'
      },
      // 边框宽度
      borderWidth: {
        type: String,
        default: '3px'
      },
      showMore: {
        type: Boolean,
        default: true
      },
      // 显示层级
      reverse: {
        type: Boolean,
        default: true
      }
    },
    emits: ['click'],
    setup(props, { emit }) {
      const handleClick = (item: string, index: number) => {
        emit('click', { item, index })
      }

      const addCls = computed(() => {
        if (props.direction === 'vertical') {
          return ['flex-col', 'justify-center']
        } else {
          return ['flex-row', 'items-center']
        }
      })

      return {
        newImages: computed(() => (props.num ? props.images.slice(0, props.num) : props.images)),
        handleClick,
        addCls
      }
    }
  })
</script>

<style scoped></style>
