import LayoutsDefault from '@/layouts/default.vue'
import type { AppRouteRecordRaw } from '../types'

const iframeRoutes: Array<AppRouteRecordRaw> = [
  {
    name: 'Iframe',
    meta: {
      title: '外部页面',
      order: 80,
      icon: 'Document'
    },
    path: '/',
    component: LayoutsDefault,
    redirect: '/iframe',
    children: [
      {
        name: 'Iframe',
        path: 'iframe',
        component: () => import('@/views/iframe/index.vue'),
        meta: {
          title: '内嵌页面',
          frameSrc: 'https://toimc-team.github.io/notes-page/'
        }
      },
      {
        name: 'External',
        path: 'https://toimc-team.github.io/notes-page/',
        component: () => import('@/views/iframe/blank.vue'),
        meta: {
          title: '外链页面'
        }
      }
    ]
  }
]

export default iframeRoutes
