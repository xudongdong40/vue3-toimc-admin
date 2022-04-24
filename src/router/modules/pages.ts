import { t } from '@/hooks/useI18n'
import LayoutsDefault from '@/layouts/default.vue'
import type { AppRouteRecordRaw } from '../types'

const pagesRoutes: Array<AppRouteRecordRaw> = [
  {
    name: 'Pages',
    meta: {
      title: t('menu.pages.title'),
      order: 40,
      icon: 'CopyDocument'
    },
    path: '/page',
    component: LayoutsDefault,
    redirect: '/pages/form',
    children: [
      {
        name: 'FormPages',
        path: 'form',
        component: () => import('@/views/pages/form/index.vue'),
        meta: {
          title: t('menu.pages.form.title')
        },
        children: [
          {
            name: 'DefaultFormPages',
            path: 'default',
            component: () => import('@/views/pages/form/default.vue'),
            meta: {
              title: t('menu.pages.form.default')
            }
          }
        ]
      },
      {
        name: 'DetailPages',
        path: 'detail',
        component: () => import('@/views/pages/details/index.vue'),
        meta: {
          title: t('menu.pages.detail.title')
        },
        children: [
          {
            name: 'BasicDetailPages',
            path: 'basic',
            component: () => import('@/views/pages/details/basic.vue'),
            meta: {
              title: t('menu.pages.detail.basic')
            }
          }
        ]
      },
      {
        name: 'ResultPages',
        path: 'result',
        component: () => import('@/views/pages/form/index.vue'),
        meta: {
          title: t('menu.pages.result.title')
        }
      },
      {
        name: 'UsersPages',
        path: 'users',
        component: () => import('@/views/pages/form/index.vue'),
        meta: {
          title: t('menu.pages.users.title')
        }
      },
      {
        name: 'SettingsPages',
        path: 'settings',
        component: () => import('@/views/pages/form/index.vue'),
        meta: {
          title: t('menu.pages.settings.title')
        }
      },
      {
        name: 'ErrorsPages',
        path: 'errors',
        component: () => import('@/views/pages/errors/index.vue'),
        meta: {
          title: t('menu.pages.errors.title'),
          alone: false
        },
        redirect: '/page/errors/default',
        children: [
          {
            name: 'Default404',
            path: 'default',
            component: () => import('@/views/pages/errors/default.vue'),
            meta: {
              title: t('menu.pages.errors.default')
            }
          }
        ]
      },
      {
        name: 'ListsPages',
        path: 'lists',
        component: () => import('@/views/pages/form/index.vue'),
        meta: {
          title: t('menu.pages.lists.title')
        }
      }
    ]
  }
]

export default pagesRoutes
