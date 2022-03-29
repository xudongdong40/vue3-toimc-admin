<template>
  <div> </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Waterfall',
    props: {
      width: {
        // 容器宽度
        type: Number,
        default: 0
      },
      height: {
        // 容器高度
        type: [Number, String],
        default: 0
      },
      reachBottomDistance: {
        // 滚动触底距离，触发加载新图片
        type: Number, // selector
        default: 20 // 默认在最低那一列到底时触发
      },
      loadingDotCount: {
        // loading 点数
        type: Number,
        default: 3
      },
      loadingDotStyle: {
        type: Object,
        default: () => {}
      },
      gap: {
        // .img-box 间距
        type: Number,
        default: 20
      },
      mobileGap: {
        type: Number,
        default: 8
      },
      maxCols: {
        type: Number,
        default: 5
      },
      imgsArr: {
        type: Array,
        required: true
      },
      srcKey: {
        type: String,
        default: 'src'
      },
      hrefKey: {
        type: String,
        default: 'href'
      },
      imgWidth: {
        type: Number,
        default: 240
      },
      isRouterLink: {
        type: Boolean,
        default: false
      },
      linkRange: {
        type: String as PropType<'card' | 'img' | 'custom'>,
        default: 'card'
      },
      loadingTimeOut: {
        // 预加载事件小于500毫秒就不显示加载动画，增加用户体验
        type: Number,
        default: 500
      },
      cardAnimationClass: {
        type: [String],
        default: 'default-card-animation'
      },
      enablePullDownEvent: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { slots }) {
      // 初始信息
      const msg = ref('this is from vue-waterfall-easy.vue')
      // 是否为移动端
      const isMobile = !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
      const isPreloading = ref(true)
      const isPreloading_c = ref(true)

      const imgsArr_c = ref([]) // 待图片预加载imgsArr完成，插入新的字段height之后,才会生成imgsArr_c，这时才开始渲染
      const loadedCount = ref(0)
      const cols = ref(0) // 需要根据窗口宽度初始化
      const imgBoxEls = ref(null) // 所有的.img-box元素
      const beginIndex = ref(0) // 开始要排列的图片索引首次为第二列的第一张图片，后续加载则为已经排列图片的下一个索引
      const colsHeightArr = ref([])
      // 自定义loading
      const LoadingTimer = ref(null)
      const isFirstLoad = ref(true) // 首次加载
      const over = ref(false) // 结束waterfall加载

      // 每一列的宽度
      const colWidth = computed(() => props.width / props.gap)

      const imgWidth_c = computed(() =>
        isMobile ? window.innerWidth / 2 - props.mobileGap : props.imgWidth
      )

      const hasLoadingSlot = computed(() => !!slots.loading)

      return {
        msg,
        isMobile,
        isPreloading,
        isPreloading_c,
        imgsArr_c,
        loadedCount,
        cols,
        imgBoxEls,
        beginIndex,
        colsHeightArr,
        LoadingTimer,
        isFirstLoad,
        over,
        colWidth,
        imgWidth_c,
        hasLoadingSlot
      }
    }
  })
</script>

<style lang="scss" scoped>
  .vue-waterfall-easy-container {
    position: relative;
    width: 100%;
    height: 100%;

    .vue-waterfall-easy-scroll {
      position: relative;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }

    .vue-waterfall-easy {
      @keyframes show-card {
        0% {
          transform: scale(0.5);
        }

        100% {
          transform: scale(1);
        }
      }

      position: absolute;
      width: 100%; // 移动端生效
      & > .img-box {
        position: absolute;
        width: 50%; // 移动端生效
        box-sizing: border-box;
      }

      & > .img-box.default-card-animation {
        animation: show-card 0.4s;
        transition: left 0.6s, top 0.6s;
        transition-delay: 0.1s;
      }

      a {
        display: block;
      }

      a.img-inner-box {
        border-radius: 4px;
        box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      }

      a.img-wrapper {
        & > img {
          display: block;
          width: 100%;
          border: none;
        }
      }

      .over {
        position: absolute;
        width: 100%;
        font-size: 12px;
        line-height: 1.6;
        color: #aaa;
        text-align: center;
      }
    }

    & > .loading.first {
      bottom: 50%;
      transform: translate(-50%, 50%);
    }

    & > .loading {
      @keyframes ball-beat {
        50% {
          opacity: 0.2;
          transform: scale(0.75);
        }

        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      position: absolute;
      bottom: 6px;
      left: 50%;
      z-index: 999;
      transform: translateX(-50%);

      &.ball-beat > .dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin: 3px;
        vertical-align: bottom;
        background-color: #4b15ab;
        border-radius: 50%;
        animation: ball-beat 0.7s 0s infinite linear;
        animation-fill-mode: both;
      }

      &.ball-beat > .dot:nth-child(2n-1) {
        animation-delay: 0.35s;
      }
    }
  }
</style>
