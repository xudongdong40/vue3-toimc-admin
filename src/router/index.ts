import type { App } from 'vue'
import type { AppRouteRecordRaw } from './types'

import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import { sortMenu } from '@/utils'

const modules = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: AppRouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const asyncRoutes = sortMenu([...routeModuleList])

const router = createRouter({
  history: createWebHashHistory(),
  routes: asyncRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
