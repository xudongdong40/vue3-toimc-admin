<template>
  <el-dropdown
    v-bind="$attrs"
    ref="dropdown"
    :split-button="splitButton"
    :type="type"
    :trigger="trigger"
    :size="size"
    :placement="placement"
    :max-height="maxHeight"
    @click="handleClick"
    @command="handleCommand"
    @visible-change="handleVisibleChange"
  >
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #dropdown>
      <slot name="dropdown" :actions="actions">
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in actions"
            :key="index"
            :divided="item.divider"
            :disabled="item.disabled"
            :command="item.value"
          >
            <span class="flex items-center" @click="() => item.click && item.click(item, index)">
              <icon :icon="item.icon" v-bind="item.iconProps"></icon>
              {{ item.text }}
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </slot>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { DropMenuItem, DropMenuPlacementType } from './types'

  export default defineComponent({
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: ''
      },
      splitButton: {
        type: Boolean,
        default: false
      },
      actions: {
        type: Array as PropType<DropMenuItem[]>,
        default: () => []
      },
      size: {
        type: String as PropType<'large' | 'default' | 'small'>,
        default: 'default'
      },
      trigger: {
        type: String as PropType<'click' | 'hover' | 'contextmenu'>,
        default: 'click'
      },
      placement: {
        type: String as PropType<DropMenuPlacementType>,
        default: 'bottom'
      },
      maxHeight: {
        type: [Number, String],
        default: null
      }
    },
    emits: ['command', 'click', 'visible-change', 'update:modelValue'],
    setup(props, { emit, expose }) {
      const dropdown = ref()

      function handleClick() {
        props.splitButton && emit('click')
      }
      function handleCommand(command: string | number) {
        emit('command', command)
      }
      function handleVisibleChange(visible: boolean) {
        emit('visible-change', visible)
        emit('update:modelValue', visible)
      }

      function handleOpen() {
        dropdown.value?.handleOpen()
      }
      function handleClose() {
        dropdown.value?.handleClose()
      }

      watch(
        () => props.modelValue,
        (val) => {
          if (val) {
            handleOpen()
          } else {
            handleClose()
          }
        }
      )

      expose({
        handleOpen,
        handleClose
      })

      return {
        dropdown,
        handleClick,
        handleCommand,
        handleVisibleChange
      }
    }
  })
</script>

<style scoped></style>
