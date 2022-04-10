import { defineStore } from 'pinia'
import defaultSettings from '@/config'

const { layout } = defaultSettings

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    layout: layout || 'siderbar'
  }),
  getters: {
    getLayout: (state) => state.layout
  },
  actions: {
    setLayout(layout) {
      this.layout = layout
    }
  }
})
