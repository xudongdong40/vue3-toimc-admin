import { defineStore } from 'pinia'
import defaultSettings from '@/config'

const { layout, fixHeader, menuWidth } = defaultSettings

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
    },
    setFixHeader(fixHeader) {
      this.fixHeader = fixHeader
    }
  }
})
