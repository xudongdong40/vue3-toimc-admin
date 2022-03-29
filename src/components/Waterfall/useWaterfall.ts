import { onMounted } from 'vue'
import { ref, Ref } from 'vue'
import { _image } from './errorImage'
import { CalculateActualCols, ImagePreload, ListItem, Layout } from './types'

const useWaterFall = () => {
  function calculateCols(
    colWidth: Ref<number>,
    gap: Ref<number>,
    mobileGap: Ref<number>,
    wrapperRef: Ref<HTMLElement | null>
  ): CalculateActualCols {
    const actualColWidth = ref(0) // 实际列宽
    const actualCols = ref(1) // 实际列数
    const colsTop = ref<number[]>([]) // 记录每列的 top 值
    const parentWidth = ref(0)

    // 获得父级宽度
    onMounted(() => {
      getParentWidth()
    })

    function getParentWidth() {
      const dom = wrapperRef.value
      parentWidth.value = dom?.parentElement?.offsetWidth || 0
    }

    // 计算列数以及手机端的宽度
    const calculateActualCols = (isMobile: boolean): void => {
      getParentWidth()
      actualColWidth.value = colWidth.value
      actualCols.value = 1

      if (isMobile && parentWidth.value < colWidth.value * 2 + mobileGap.value) {
        actualColWidth.value = parentWidth.value - 2 * mobileGap.value
        colsTop.value = Array(actualCols.value).fill(0)
        return
      }

      const g = isMobile ? mobileGap.value : gap.value
      actualCols.value = Math.floor((parentWidth.value + g) / (colWidth.value + g))
      colsTop.value = Array(actualCols.value).fill(0)
    }

    return {
      actualColWidth,
      actualCols,
      colsTop,
      calculateActualCols
    }
  }

  function imagePreload(): ImagePreload {
    const actualList = ref<ListItem[]>([]) // 实际用来渲染的列表
    const setActualList = (newList: ListItem[]): void => {
      actualList.value = newList
    }

    let lastPreloadImgIdx = -1 // 上一次最后预加载的图片的下标

    const setLastPreloadImgIdx = (idx: number): void => {
      lastPreloadImgIdx = idx
    }

    // 图片预加载
    function imagePreloadHandle(
      noPreloadList: ListItem[],
      actualColWidth: Ref<number>,
      preloadedFn: () => unknown | undefined,
      srcKey: string,
      errorImgSrc: string
    ): void {
      const errorItems: ListItem[] = [] // 存放图片加载失败的项，等待最后加载错误图片

      let tmpIdx = lastPreloadImgIdx + 1
      const tmpArr: ListItem[] = []

      const render = () => {
        // 预加载完成，开始渲染
        actualList.value = actualList.value.concat(tmpArr)
        nextTick(() => {
          // 图片预加载完成后的回调
          preloadedFn && preloadedFn()
        })
      }
      while (tmpIdx < noPreloadList.length) {
        const item = noPreloadList[tmpIdx]
        tmpArr.push(item)
        tmpIdx++
        if (!item[srcKey]) {
          lastPreloadImgIdx++
          item._height = 0
          continue
        }

        const oImg = new Image()
        oImg.src = item[srcKey]
        oImg.onload = oImg.onerror = (e): void => {
          if ((e as Event).type === 'error') {
            errorItems.push(item)
          } else if ((e as Event).type === 'load') {
            item._height = Math.round(actualColWidth.value / (oImg.width / oImg.height))
          }
          lastPreloadImgIdx++
          if (lastPreloadImgIdx + 1 === noPreloadList.length) {
            loadErrorImgOrRender(actualColWidth, srcKey, errorImgSrc, errorItems, render)
          }
        }
      }

      // 兼容所有内容都没有图片的情况
      if (lastPreloadImgIdx + 1 === noPreloadList.length) {
        render()
      }
    }

    function loadErrorImgOrRender(
      colWidth: Ref<number>,
      srcKey: string,
      errorImgSrc: string,
      errorItems: ListItem[],
      render?: () => void
    ): void {
      if (errorItems.length === 0) {
        // 没有加载失败的图片
        render && render()
        return
      }

      const setErrorImg = (src: string, height: number): void => {
        errorItems.forEach((item) => {
          item[srcKey] = src
          item._height = height
        })
      }
      // 用户没有添加错误图片
      if (!errorImgSrc) {
        setErrorImg(_image, colWidth.value)
        render && render()
        return
      }
      // 尝试加载用户提供的错误图片，如果有的话
      const errImg = new Image()
      errImg.src = errorImgSrc
      errImg.onload = errImg.onerror = (e): void => {
        if ((e as Event).type === 'error') {
          // 用户的图片加载失败，使用内置错误图片
          setErrorImg(_image, colWidth.value)
          render && render()
        } else if ((e as Event).type === 'load') {
          const height = Math.round(colWidth.value / (errImg.width / errImg.height))
          setErrorImg(errorImgSrc, height)
          render && render()
        }
      }
    }

    return {
      actualList,
      setActualList,
      setLastPreloadImgIdx,
      imagePreloadHandle
    }
  }

  function layout(
    list: Ref<unknown[]>,
    actualColWidth: Ref<number>,
    actualList: Ref<ListItem[]>,
    actualCols: Ref<number>,
    actualGap: number,
    bottomGap: number
  ): Layout {
    let lastLayoutImgIdx = -1 // 上一次排版最后排的元素下标

    const setLastLayoutImgIdx = (idx: number): void => {
      lastLayoutImgIdx = idx
    }

    const wrapperHeight = ref(0)
    // 布局-调整位置
    const layoutHandle = (colsTop: Ref<Array<number>>): void => {
      const waterfallItems = document.querySelectorAll('.waterfall-item') as NodeListOf<HTMLElement>
      if (waterfallItems.length === 0) return
      // 只对新的未排版的元素进行排版，优化性能
      let idx = lastLayoutImgIdx + 1
      for (; idx < list.value.length; idx++) {
        const current = waterfallItems[idx]
        const imgTag = current.querySelector('img') as HTMLElement
        // 由于有 img 标签会对其他整体元素的高度计算造成误差，因此在计算的过程中先隐藏 img 标签
        hiddenImg(imgTag)
        const eleHeight = current.offsetHeight
        showImg(imgTag)
        // 找到现有列最小高度
        const minHeight = Math.min.apply(null, colsTop.value)
        // 最小高度的列
        const minOfColIdx = colsTop.value.indexOf(minHeight)
        // 设置决定定位位置
        const left =
          actualColWidth.value * minOfColIdx +
          (minOfColIdx - 1 < 0 ? 0 : minOfColIdx - 1) * actualGap +
          'px'
        const top = minHeight + 'px'
        colsTop.value[minOfColIdx] =
          colsTop.value[minOfColIdx] + eleHeight + actualList.value[idx]._height + bottomGap
        const marginLeft = actualCols.value !== 1 && minOfColIdx !== 0 ? actualGap + 'px' : '0'
        // 一次修改，减少重排
        actualList.value[idx].styles = {
          width: actualColWidth.value + 'px',
          left,
          top,
          marginLeft,
          visibility: 'visible'
        }
      }
      wrapperHeight.value = Math.max.apply(null, colsTop.value)
      lastLayoutImgIdx = waterfallItems.length - 1
    }

    return {
      wrapperHeight,
      setLastLayoutImgIdx,
      layoutHandle
    }
  }

  function hiddenImg(img: HTMLElement): void {
    if (!img) return
    img.style.display = 'none'
  }

  function showImg(img: HTMLElement): void {
    if (!img) return
    img.style.display = ''
  }

  return {
    calculateCols,
    imagePreload,
    layout
  }
}

export default useWaterFall
