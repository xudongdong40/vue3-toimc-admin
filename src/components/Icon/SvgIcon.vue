<template>
  <div v-if="isExternal" :style="styleExternalIcon" :class="['svg-external-icon svg-icon']" />
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    :style="{ height: height || size, width: width || size }"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'SvgIcon',
    props: {
      // 图标类名
      iconClass: {
        type: String,
        required: true
      },
      // svg图标的类名
      className: {
        type: String,
        default: ''
      },
      // 宽度
      width: {
        type: [Number, String],
        default: ''
      },
      // 高度
      height: {
        type: [Number, String],
        default: ''
      },
      // 如果设置了size，可以不用设置width和height
      size: {
        type: [Number, String],
        default: ''
      }
    },
    setup(props) {
      const isExternal = /^(https?:|mailto:|tel:)/.test(props.iconClass)

      const iconName = `#icon-${props.iconClass}`
      const svgClass = props.className ? `svg-icon ${props.className}` : 'svg-icon '
      const styleExternalIcon = computed(() => {
        return {
          mask: `url(${props.iconClass}) no-repeat 50% 50%`,
          '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`,
          width: props.width || props.size,
          height: props.height || props.size
        }
      })
      return {
        isExternal,
        iconName,
        svgClass,
        styleExternalIcon
      }
    }
  })
</script>

<style lang="scss" scoped>
  .svg-icon {
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentcolor;
  }

  .svg-external-icon {
    display: inline-block;
    background-color: currentcolor;
    mask-size: cover !important;
  }
</style>
