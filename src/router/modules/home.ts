import LayoutsDefault from '@/layouts/default.vue'
import type { AppRouteRecordRaw } from '../types'

const homeRoutes: Array<AppRouteRecordRaw> = [
  {
    name: 'Home',
    meta: {
      title: '首页',
      order: 10,
      icon: 'House'
    },
    path: '/',
    component: LayoutsDefault,
    redirect: '/dashboard',
    children: [
      {
        name: 'DashBoard',
        path: '/dashboard',
        component: () => import('@/views/dashboard/welcome/index.vue'),
        meta: {
          title: '概览'
        }
      }
    ]
  }
]

export default homeRoutes
