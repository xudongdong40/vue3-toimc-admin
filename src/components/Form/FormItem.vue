<template>
  <component :is="'el-' + item" v-bind="$attrs">
    <slot></slot>
  </component>
</template>

<script lang="ts">
  import {
    ElInput,
    ElCascader,
    ElCheckbox,
    ElCheckboxGroup,
    ElCheckboxButton,
    ElColorPicker,
    ElDatePicker,
    ElInputNumber,
    ElRadio,
    ElRadioButton,
    ElRate,
    ElSelect,
    ElOption,
    ElSlider,
    ElSwitch,
    ElTimePicker,
    ElTimeSelect,
    ElTransfer,
    ElUpload
  } from 'element-plus'
  import { PropType } from 'vue'
  import { ComponentType } from './types/types'

  export default defineComponent({
    components: {
      ElInput,
      ElCascader,
      ElCheckbox,
      ElCheckboxGroup,
      ElCheckboxButton,
      ElColorPicker,
      ElDatePicker,
      ElInputNumber,
      ElRadio,
      ElRadioButton,
      ElRate,
      ElSelect,
      ElOption,
      ElSlider,
      ElSwitch,
      ElTimePicker,
      ElTimeSelect,
      ElTransfer,
      ElUpload
    },
    props: {
      item: {
        type: String as PropType<ComponentType>,
        default: ''
      }
    },
    setup() {
      return {}
    }
  })
</script>

<style scoped></style>
