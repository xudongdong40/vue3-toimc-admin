import { defineStore } from 'pinia'
import defaultSettings from '@/config'
import _ from 'lodash-es'

const localThemeSettings = localStorage.getItem('toimc-admin-theme')
const mergeThemeSettings = _.merge(
  {},
  defaultSettings,
  localThemeSettings !== null ? JSON.parse(localThemeSettings) : {}
)
const { layout, fixHeader, menuWidth } = mergeThemeSettings

const saveThemeSetting = (theme) => {
  localStorage.setItem('toimc-admin-theme', theme)
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    layout: layout || 'siderbar',
    fixHeader: fixHeader || true,
    menuWidth: menuWidth || '266px'
  }),
  getters: {
    getLayout: (state) => state.layout
  },
  actions: {
    setLayout(layout) {
      this.layout = layout
      saveThemeSetting(JSON.stringify(this.$state))
    },
    setFixHeader(fixHeader) {
      this.fixHeader = fixHeader
      saveThemeSetting(JSON.stringify(this.$state))
    }
  }
})
