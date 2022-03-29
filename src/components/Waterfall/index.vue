<template>
  <div ref="waterfallRef">
    <div
      :id="id"
      class="relative w-full my-0 mx-auto"
      :style="{
        height: wrapperHeight + 'px',
        width: wrapperWidth + 'px'
      }"
    >
      <div
        v-for="(item, idx) of actualList"
        :key="'w' + idx"
        class="waterfall-item"
        :style="item.styles || { width: actualColWidth + 'px' }"
      >
        <slot :item="item"></slot>
      </div>
    </div>
    <slot v-if="actualLoading && !isOver" name="loading">
      <div class="waterfall-loading">
        <div class="dot-wrapper">
          <span
            v-for="(_, idx) of new Array(dotsNum)"
            :key="idx"
            class="dot"
            :style="'background-color:' + dotsColor"
          ></span>
        </div>
      </div>
    </slot>
    <slot v-if="isOver" name="footer">
      <div class="waterfall-over-message">没有数据了</div>
    </slot>
  </div>
</template>

<script lang="ts">
  import { v4 as uuid } from 'uuid'
  import { getDevice } from '@/utils'
  import useWaterFall from './useWaterfall'
  export default defineComponent({
    name: 'V3Waterfall',
    props: {
      list: {
        type: Array,
        default: () => []
      },
      colWidth: {
        // 每列的宽度，不包括两列的间隔
        type: Number,
        default: 250
      },
      srcKey: {
        // 图片地址的键值
        type: String,
        default: 'src'
      },
      gap: {
        // 两列间的间隔，PC 端，px
        type: Number,
        default: 20
      },
      mobileGap: {
        // 两列间的间隔，手机端，px
        type: Number,
        default: 8
      },
      bottomGap: {
        // 上下间距, px
        type: Number,
        default: 10
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      isOver: {
        type: Boolean,
        default: false
      },
      dotsNum: {
        type: Number,
        default: 5
      },
      dotsColor: {
        type: String,
        default: ''
      },
      distanceToScroll: {
        type: Number,
        default: 200
      },
      scrollBodySelector: {
        // 滚动主体选择器，默认为页面
        type: String,
        default: ''
      },
      errorImgSrc: {
        // 图片加载失败时默认展示的图片
        type: String,
        default: ''
      }
    },
    emits: ['scroll-reach-bottom'],
    setup(props, { emit }) {
      // 瀑布流ref
      const waterfallRef = ref<HTMLElement | null>(null)
      // 滚动容器
      let scrollElement: HTMLElement

      const { colWidth, gap, mobileGap, list, isLoading, isOver } = toRefs(props)

      // 是否为手机端
      let isMobile = getDevice(navigator.userAgent) === 'mobile'

      // 列间隔
      let actualGap = isMobile ? mobileGap.value : gap.value

      const id = uuid()

      const { calculateCols, imagePreload, layout } = useWaterFall()

      const { actualColWidth, actualCols, colsTop, calculateActualCols } = calculateCols(
        colWidth,
        gap,
        mobileGap,
        id
      )

      const { actualList, setActualList, setLastPreloadImgIdx, imagePreloadHandle } = imagePreload()

      const { wrapperHeight, setLastLayoutImgIdx, layoutHandle } = layout(
        list,
        actualColWidth,
        actualList,
        actualCols,
        actualGap,
        props.bottomGap
      )

      // 容器实际宽度
      const wrapperWidth = computed(() => {
        return actualColWidth.value * actualCols.value + actualGap * (actualCols.value - 1)
      })

      // 加载状态
      const actualLoading = computed(() => {
        return isLoading.value || actualList.value.length !== list.value.length
      })

      // 进行瀑布流计算
      const waterfall = <T extends object>(itemList: T[]): void => {
        const itemListNew: T[] = JSON.parse(JSON.stringify(itemList))
        imagePreloadHandle(
          itemListNew,
          actualColWidth,
          () => layoutHandle(colsTop),
          props.srcKey,
          props.errorImgSrc
        )
      }

      // 第一次加载或者重载
      const firstOrReset = <T extends object>(): void => {
        setLastPreloadImgIdx(-1)
        setLastLayoutImgIdx(-1)
        setActualList([])
        calculateActualCols(isMobile)
        waterfall(list.value as T[])
      }

      watch(list, <T extends object>(newValue: unknown[], oldValue: unknown[]) => {
        if (newValue[0] !== oldValue[0]) {
          firstOrReset()
          return
        }
        waterfall(newValue as T[])
      })

      const documentBody = document.documentElement || document.body

      let timeHandler: any
      let lastClientWidth = documentBody.offsetWidth
      const resizeHandle = (): void => {
        const clientWidth = documentBody.offsetWidth
        if (clientWidth === lastClientWidth) return
        lastClientWidth = clientWidth
        clearTimeout(timeHandler)
        // 重新计算
        timeHandler = setTimeout(() => {
          isMobile = getDevice(navigator.userAgent) === 'mobile'
          actualGap = isMobile ? mobileGap.value : gap.value
          firstOrReset()
        }, 500)
      }

      // 兼容滚动事件绑定在 window 上，
      // 并且页面被 keep-alive 缓存时滚动穿越的情形
      // (a 页面绑定滚动被缓存，b 页面滚动会影响 a 页面的监听)
      let isActive = true
      onActivated(() => (isActive = true))
      onDeactivated(() => (isActive = false))

      // 滚动
      let body = document.documentElement || document.body
      let scrollTimeoutHandle: any
      // 滚动事件
      const scrollFn = (): void => {
        if (actualLoading.value || isOver.value || !isActive) return
        const [scrollHeight, scrollTop, clientHeight] = [
          body.scrollHeight,
          body.scrollTop,
          body.clientHeight
        ]
        if (scrollHeight - scrollTop - clientHeight <= props.distanceToScroll) {
          clearTimeout(scrollTimeoutHandle)
          scrollTimeoutHandle = setTimeout(() => {
            emit('scroll-reach-bottom')
          }, 200)
        }
      }

      // 挂载时 监听父组件 scroll 事件
      onMounted(() => {
        scrollElement = waterfallRef?.value?.parentElement as HTMLElement
        scrollElement.addEventListener('scroll', scrollFn)
      })

      // 卸载时 删除父组件 scroll 事件
      onBeforeUnmount(() => {
        scrollElement.removeEventListener('scroll', scrollFn)
      })

      onMounted(() => {
        if (list.value && list.value.length > 0) {
          firstOrReset()
        }
        window.addEventListener('resize', resizeHandle)
      })
      onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeHandle)
      })

      return {
        isMobile,
        wrapperWidth,
        wrapperHeight,
        actualLoading,
        actualColWidth,
        actualList,
        actualCols,
        waterfallRef,
        id
      }
    }
  })
</script>

<style lang="scss" scoped>
  .waterfall-wrapper {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }

  .waterfall-item {
    position: absolute;
    animation: scale-item 0.3s linear forwards;
    transition: all 0.3s;
  }

  .waterfall-over-message {
    height: 40px;
    line-height: 40px;
    color: #999;
    text-align: center;
  }

  .dot-wrapper {
    padding: 10px 0;
    text-align: center;

    .dot {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin: 0 2px;
      background-color: rgb(169 169 169 / 80%);
      border-radius: 50%;

      &:nth-of-type(2n) {
        animation: dot-scale 0.4s linear infinite alternate;
      }

      &:nth-of-type(2n - 1) {
        animation: dot-scale 0.4s linear 0.4s infinite alternate;
      }
    }
  }

  @keyframes dot-scale {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.5);
    }
  }

  @keyframes scale-item {
    0% {
      transform: scale(0.5);
    }

    100% {
      transform: scale(1);
    }
  }
</style>
