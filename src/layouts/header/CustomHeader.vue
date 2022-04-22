<template>
  <!-- header -->
  <el-header class="nav flex justify-between items-center bg-white">
    <el-row>
      <div id="header-collapse" @click="() => handleClick(collapse)">
        <icon :type="collapse ? 'Expand' : 'Fold'" size="24px" />
      </div>
    </el-row>
    <el-row class="items-center">
      <!-- <span id="header-home" class="items">
        <icon type="HomeFilled" size="24px" />
      </span>
      <span id="header-message" class="items">
        <icon type="Bell" size="24px" />
      </span> -->
      <change-locale class="items"></change-locale>
      <full-screen class="items"></full-screen>
      <repo-badge class="items"></repo-badge>
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
  import { FullScreen, ChangeLocale, RepoBadge } from './components'
  export default defineComponent({
    name: 'CustomHeader',
    components: {
      FullScreen,
      ChangeLocale,
      RepoBadge
    },
    props: {
      collapse: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:collapse'],
    setup(_props, { emit }) {
      function handleClick(flag: boolean) {
        emit('update:collapse', !flag)
      }

      return {
        handleClick
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
