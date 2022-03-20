<template>
  <el-descriptions
    :title="title"
    :direction="direction"
    :size="size"
    :extra="extra"
    :border="border"
    :column="column"
    class="custom-descriptions"
  >
    <template v-if="!extra" #extra>
      <slot name="extra"></slot>
    </template>
    <el-descriptions-item v-for="(item, index) in items" :key="index" v-bind="item.attrs">
      <template #label>
        <icon v-if="item.icon" :type="item.icon" :size="item.iconSize" :color="item.iconColor" />
        {{ item.label }}
      </template>
      <slot name="field">
        <el-tag v-if="item.tag" v-bind="item.tag">{{ item.label }}</el-tag>
        <el-link
          v-else-if="typeof item.field !== 'string'"
          target="_target"
          :underline="false"
          :href="item.field.link || '#'"
          :type="item.field.type || 'primary'"
          >{{ item.field.text }}</el-link
        >
        <template v-else>{{ item.field }}</template>
      </slot>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
  import { DescItem } from './types'

  export default defineComponent({
    props: {
      direction: {
        type: String as PropType<'vertical' | 'horizontal'>,
        default: 'horizontal'
      },
      size: {
        type: String as PropType<'large' | 'default' | 'small'>,
        default: 'default'
      },
      title: {
        type: String,
        default: ''
      },
      extra: {
        type: String,
        default: ''
      },
      border: {
        type: Boolean,
        default: true
      },
      items: {
        type: Array as PropType<DescItem[]>,
        default: () => []
      },
      column: {
        type: Number,
        default: 3
      }
    },
    setup() {
      return {}
    }
  })
</script>

<style lang="scss">
  .custom-descriptions {
    padding: 6px 0;

    .el-descriptions__header {
      margin-bottom: 8px;
    }
  }
</style>
