import { defineStore } from 'pinia'
import { MenuProps } from '@/components/Menu/types'

export const useStore = defineStore('menu', {
  state: (): MenuProps => ({
    collapse: false,
    mode: 'vertical'
  }),
  actions: {
    setCollapse(flag: boolean) {
      this.collapse = flag
    }
  }
})
