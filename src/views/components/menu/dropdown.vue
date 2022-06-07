<template>
  <div class="p-4 grid grid-cols-3 gap-3">
    <t-card header="Dropdown下拉菜单">
      <drop-down :actions="actions" trigger="hover">过来hover一下</drop-down>
    </t-card>
    <t-card header="Dropdown下拉菜单">
      <drop-down :actions="actions" trigger="click">点击展示</drop-down>
    </t-card>
    <t-card header="Dropdown下拉菜单">
      <drop-down split-button type="primary" :actions="actions" trigger="hover"
        >split-button模式</drop-down
      >
      <drop-down split-button type="warning" :actions="actions" trigger="hover"
        >split-button模式</drop-down
      >
      <drop-down split-button type="danger" :actions="actions" trigger="hover"
        >split-button模式</drop-down
      >
    </t-card>
    <t-card header="Dropdown下拉菜单">
      <drop-down split-button type="primary" :actions="actions" trigger="hover">按钮点击</drop-down>
    </t-card>
    <t-card header="Dropdown下拉菜单">
      <drop-down :actions="actions" trigger="hover" @command="handleCommand"
        >点击command回调</drop-down
      >
    </t-card>
    <t-card header="Dropdown下拉菜单">
      <div>状态： {{ status }}</div>
      <drop-down :actions="actions" trigger="hover" @visible-change="handleVisibleChange"
        >菜单状态</drop-down
      >
    </t-card>
    <t-card header="Dropdown下拉菜单">
      <div>v-model的用法</div>
      <el-button type="primary" @click="toggle">toggle</el-button>
      <div class="pb-2">菜单状态：{{ show }}</div>
      <drop-down v-model="show" :actions="actions" trigger="hover">被控菜单, hover看状态</drop-down>
    </t-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { localeList } from '@/settings/localeSetting'
  import { ElMessage } from 'element-plus'

  export default defineComponent({
    setup() {
      const actions = localeList
      const status = ref(false)
      const [show, toggle] = useToggle<any>(false)
      actions.push(
        ...[
          {
            text: '选项1-禁用',
            value: 1,
            disabled: true
          },
          {
            text: '选项2-分段',
            value: 1,
            divider: true
          },
          {
            text: '选项click事件',
            value: 2,
            click: (item, index) => ElMessage.success(`点击了${item.text}, 第${index}个`)
          }
        ]
      )

      function handleCommand(command) {
        ElMessage.success(`点击了${command}`)
      }

      function handleVisibleChange(val) {
        status.value = val
      }

      return {
        actions,
        handleCommand,
        handleVisibleChange,
        status,
        show,
        toggle
      }
    }
  })
</script>

<style scoped></style>
