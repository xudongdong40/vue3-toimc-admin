import type { AppRouteRecordRaw } from '@/router/types'
import type { App } from 'vue'

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
export function setupPlugins(app: App, files) {
  Object.keys(files).forEach((file) => {
    app.use(files[file as keyof typeof files])
  })
}

// 注册组件
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T
}
