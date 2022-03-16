import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import WindiCSS from 'vite-plugin-windicss'

import vueJsx from '@vitejs/plugin-vue-jsx'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
      resolvers: [ElementPlusResolver()],
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      dts: true
    }),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver()],
      dts: true
    }),
    vueJsx(),
    Icons({
      autoInstall: true
    })
  ],
  json: {
    stringify: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      types: path.resolve(__dirname, '/types')
    }
  }
})
