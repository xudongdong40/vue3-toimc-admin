import { Ref } from '@vue'

export type CalculateActualCols = {
  actualColWidth: Ref<number>
  actualCols: Ref<number>
  colsTop: Ref<number[]>
  calculateActualCols: (isMobile: boolean) => void
}

export type ListItem = Record<string, any>

export type ImagePreload = {
  actualList: Ref<ListItem[]>
  setLastPreloadImgIdx: (idx: number) => void
  setActualList: (newList: ListItem[]) => void
  imagePreloadHandle: (
    noPreloadList: ListItem[],
    actualColWidth: Ref<number>,
    preloadedFn: () => unknown | undefined,
    srcKey: string,
    errorImgSrc: string
  ) => void
}

export type Layout = {
  wrapperHeight: Ref<number>
  setLastLayoutImgIdx: (idx: number) => void
  layoutHandle: (colsTop: Ref<number[]>) => void
}
