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
      <Menu
        v-if="['top', 'mix'].includes(layout)"
        :menus="showMenu"
        mode="horizontal"
        :text-color="layout === 'top' ? '#ffffffb3' : '#515a6e'"
      >
        <img v-if="layout === 'top'" style="height: 30px;" src="@/assets/images/logo.png" />
      </Menu>
    </el-row>
    <!-- Actions -->
    <el-row class="items-center flex-shrink-0">
      <span class="items">
        <icon type="HomeFilled" size="20px" />
      </span>
      <span class="items">
        <icon type="Bell" size="20px" />
      </span>
      <span id="header-internationalization" class="items">
        <drop-down :actions="localeList" :current="getCurrent" @command="handleCommand">
          <icon icon="ion:language" size="20px"></icon>
        </drop-down>
      </span>
      <span class="items" @click="handleShowThemeSetting">
        <icon collection="ri" type="brush-2-line" size="20px" />
      </span>
      <span class="items" @click="setStorage">
        <el-badge :value="state.github ? 'new' : ''" class="badge">
          <el-link :underline="false" :href="GITHUB_URL" target="_blank">
            <icon icon="ant-design:github-filled" size="20px"></icon>
          </el-link>
        </el-badge>
      </span>
      <!-- <el-divider direction="vertical"></el-divider> -->
      <el-avatar
        :size="20"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <span class="text-sm mr-4">管理员</span>
      <!-- <el-divider direction="vertical"></el-divider> -->
      <span class="text-sm pr-1">{{ $t('Header.CustomHeader.quit') }}</span>
      <icon type="SwitchButton" size="20px" />
    </el-row>
  </el-header>
</template>

<script lang="ts">
  // useLocale把vue-i18n的useI18n封装了一层，加入了cache
  import { useLocale } from '@/hooks/useLocale'
  import { localeList } from '@/settings/localeSetting'
  import { LocaleType } from 'types/config'
  import { useStore } from '@/store/modules/menu'
  import { GITHUB_URL } from '@/settings/siteSetting'
  import _ from 'lodash-es'
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
    setup(props, { emit }) {
      const { layout } = toRefs(props)
      const { changeLocale, getLocale } = useLocale()
      const menuStore = useStore()
      const state = useStorage('my-repo', { github: true })

      const getCurrent = computed(() => {
        return localeList.findIndex((item) => item.value + '' === getLocale.value)
      })

      const allMenu = computed(() => menuStore.menus)

      const topMenu = computed(() => {
        return _.cloneDeep(allMenu.value)?.map((item) => {
          delete item.children
          return item
        })
      })

      const showMenu = computed(() => (layout.value === 'top' ? allMenu.value : topMenu.value))

      function handleClick(flag: boolean) {
        emit('update:collapse', !flag)
      }

      function handleCommand(command: string) {
        changeLocale(command as LocaleType)
      }

      function handleShowThemeSetting() {
        emit('show-theme-setting')
      }
      function setStorage() {
        state.value.github = false
      }

      return {
        // asyncRoutes,
        // topMenu,
        showMenu,
        handleClick,
        localeList,
        handleCommand,
        getCurrent,
        handleShowThemeSetting,
        GITHUB_URL,
        state,
        setStorage
      }
    }
  })
</script>

<style lang="scss" scoped>
  .items {
    @apply flex items-center cursor-pointer mr-4;
  }

  .badge {
    --el-badge-padding: 4px;
    --el-badge-size: 16px;

    :deep(.el-badge__content) {
      line-height: 13px;
    }
  }
</style>
