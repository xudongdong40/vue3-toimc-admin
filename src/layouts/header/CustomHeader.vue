<template>
  <!-- header -->
  <el-header class="nav flex justify-between items-center bg-white">
    <!-- fix no menu -->
    <div v-show="layout === 'top'" class="fix-no-menu-block"></div>
    <!-- Expand Btn -->
    <el-row v-show="layout !== 'top'">
      <div @click="() => handleClick(collapse)">
        <icon :type="collapse ? 'Expand' : 'Fold'" size="24px" />
      </div>
    </el-row>
    <!-- Menu -->
    <el-row class="flex-1">
      <Menu v-if="layout === 'top'" :menus="asyncRoutes" :mode="menuMode">
        <div>
          <img class="inline-block" style="height: 30px;" src="@/assets/images/logo.png" />
        </div>
      </Menu>
    </el-row>
    <!-- Actions -->
    <el-row class="items-center flex-shrink-0">
      <span class="items">
        <icon type="HomeFilled" size="24px" />
      </span>
      <span class="items">
        <icon type="Bell" size="24px" />
      </span>
      <span class="items">
        <drop-down :actions="localeList" :current="getCurrent" @command="handleCommand">
          <icon icon="ion:language" size="24px"></icon>
        </drop-down>
      </span>
      <span class="items" @click="handleShowThemeSetting">
        <icon collection="ri" type="brush-2-line" size="24px" />
      </span>
      <el-divider direction="vertical"></el-divider>
      <el-avatar
        :size="32"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <span>管理员</span>
      <el-divider direction="vertical"></el-divider>
      <span class="pr-1">{{ $t('Header.CustomHeader.quit') }}</span>
      <icon type="SwitchButton" size="24px" />
    </el-row>
  </el-header>
</template>

<script lang="ts">
  // useLocale把vue-i18n的useI18n封装了一层，加入了cache
  import { useLocale } from '@/hooks/useLocale'
  import { localeList } from '@/settings/localeSetting'
  import { LocaleType } from 'types/config'
  import { asyncRoutes } from '@/router/index'

  export default defineComponent({
    name: 'CustomHeader',
    props: {
      collapse: {
        type: Boolean,
        default: false
      },
      showThemeSetting: {
        type: Boolean,
        default: false
      },
      layout: {
        type: String,
        default: 'sidebar'
      }
    },
    emits: ['update:collapse', 'show-theme-setting'],
    setup(_props, { emit }) {
      const { changeLocale, getLocale } = useLocale()

      const menuMode = computed(() => (_props.layout !== 'top' ? 'vertical' : 'horizontal'))

      const getCurrent = computed(() => {
        return localeList.findIndex((item) => item.value + '' === getLocale.value)
      })

      function handleClick(flag: boolean) {
        emit('update:collapse', !flag)
      }

      function handleCommand(command: string) {
        changeLocale(command as LocaleType)
      }

      function handleShowThemeSetting() {
        emit('show-theme-setting')
      }

      return {
        menuMode,
        asyncRoutes,
        handleClick,
        localeList,
        handleCommand,
        getCurrent,
        handleShowThemeSetting
      }
    }
  })
</script>

<style lang="scss" scoped>
  .items {
    @apply flex items-center cursor-pointer pr-4;
  }
</style>
