import { IconTypes } from '@/components/Icon/types'

// 获取图标
export function getIcons(item) {
  return item.meta?.icon as IconTypes
}
