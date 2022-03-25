import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'
import lineClampPlugin from 'windicss/plugin/line-clamp'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        'content-bg': '#F5F6FA'
      },
      lineClamp: {
        sm: '3',
        lg: '10'
      }
    }
  },
  plugins: [formsPlugin, lineClampPlugin]
})
