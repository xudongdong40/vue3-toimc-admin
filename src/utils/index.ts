import type { AppRouteRecordRaw } from '@/router/types'
import { sortBy } from 'lodash'

// 菜单排序
export function sortMenu(menus: Array<AppRouteRecordRaw> = []) {
  menus.forEach((i) => {
    if (i && i.children) {
      i.children = sortMenu(i.children)
    }
  })
  return sortBy(menus, 'meta.order')
}

// 驼峰转换下划线
export function toLine(name: string) {
  return name.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

// 导入插件
export function setupPlugins(app, files) {
  Object.keys(files).forEach((file) => {
    app.use(files[file as keyof typeof files])
  })
}
