import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        'content-bg': '#F5F6FA'
      }
    }
  },
  plugins: [formsPlugin]
})
