/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 14:59:00
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-24 11:01:51
 */
import type { WaterfallProps } from '../types/waterfall'
import type { Nullable } from '../types/util'
import type { Ref } from 'vue'
import type { CssStyleObject } from '../types/util'

import { computed, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { getItemWidth } from '../utils/itemWidth'
import { addClass, hasClass, prefixStyle } from '../utils/dom'

const transform = prefixStyle('transform')
const duration = prefixStyle('animation-duration')
const delay = prefixStyle('animation-delay')
const transition = prefixStyle('transition')
const fillMode = prefixStyle('animation-fill-mode')

export function useCalculateCols(props: WaterfallProps) {
  const wrapperWidth = ref<number>(0)
  const waterfallWrapper = ref<Nullable<HTMLElement>>(null)

  useResizeObserver(waterfallWrapper, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    wrapperWidth.value = width
  })

  // 列实际宽度
  const colWidth = computed(() => {
    return getItemWidth({
      wrapperWidth: wrapperWidth.value,
      breakpoints: props.breakpoints,
      gutter: props.gutter,
      hasAroundGutter: props.hasAroundGutter,
      initWidth: props.width
    })
  })

  // 列
  const cols = computed(() => {
    const offset = props.hasAroundGutter ? -props.gutter : props.gutter
    return Math.floor((wrapperWidth.value + offset) / (colWidth.value + props.gutter))
  })

  // 偏移
  const offsetX = computed(() => {
    const offset = props.hasAroundGutter ? props.gutter : -props.gutter
    const contextWidth = cols.value * (colWidth.value + props.gutter) + offset
    return (wrapperWidth.value - contextWidth) / 2
  })

  return {
    waterfallWrapper,
    wrapperWidth,
    colWidth,
    cols,
    offsetX
  }
}

export function useLayout(
  props: WaterfallProps,
  colWidth: Ref<number>,
  cols: Ref<number>,
  offsetX: Ref<number>
) {
  const posY = ref<number[]>([])
  const wrapperHeight = ref(0)

  // 获取对应y下标的x的值
  const getX = (index: number): number => {
    const count = props.hasAroundGutter ? index + 1 : index
    return props.gutter * count + colWidth.value * index + offsetX.value
  }

  // 初始y
  const initY = (): void => {
    posY.value = new Array(cols.value).fill(props.hasAroundGutter ? props.gutter : 0)
  }

  // 添加入场动画
  const animation = addAnimation(props)

  // 排版
  const layoutHandle = async () => {
    // 初始化y集合
    initY()

    // 获取节点
    const items = document.querySelectorAll('.waterfall-item') as NodeListOf<HTMLElement>
    if (items.length === 0) return false

    // 遍历节点
    for (let i = 0; i < items.length; i++) {
      const curItem = items[i] as HTMLElement
      // curItem.addEventListener('transitionend', handle, false)
      // function handle() {
      //   console.log('css事件过渡效果完成')
      // }

      // 最小的y值
      const minY = Math.min.apply(null, posY.value)
      // 最小y的下标
      const minYIndex = posY.value.indexOf(minY)
      // 当前下标对应的x
      const curX = getX(minYIndex)

      // 设置x,y,width
      const style = curItem.style as CssStyleObject

      // 设置偏移
      if (transform) style[transform] = `translate3d(${curX}px,${minY}px, 0)`
      style.width = `${colWidth.value}px`

      // 更新当前index的y值
      const height = curItem.clientHeight
      if (i < 6 && i > 4) {
        debugger
      }
      posY.value[minYIndex] += height + props.gutter

      // 添加入场动画
      animation(curItem, () => {
        // 添加动画时间
        if (transition) style[transition] = '.3s'
      })
    }

    wrapperHeight.value = Math.max.apply(null, posY.value)
  }

  return {
    wrapperHeight,
    layoutHandle
  }
}

// 动画
function addAnimation(props: WaterfallProps) {
  return (item: HTMLElement, callback?: () => void) => {
    const content = item!.firstChild as HTMLElement
    if (content && !hasClass(content, props.animationPrefix)) {
      const durationSec = `${props.animationDuration / 1000}s`
      const delaySec = `${props.animationDelay / 1000}s`
      const style = content.style as CssStyleObject
      style.visibility = 'visible'
      if (duration) style[duration] = durationSec

      if (delay) style[delay] = delaySec

      if (fillMode) style[fillMode] = 'both'

      addClass(content, props.animationPrefix)
      addClass(content, props.animationEffect)

      if (callback) {
        setTimeout(() => {
          callback()
        }, props.animationDuration + props.animationDelay)
      }
    }
  }
}
