<template>
  <el-slider
    ref="elSlider"
    v-bind="$attrs"
    v-model="value"
    :format-tooltip="formatTooltip"
    @change="handleChange"
    @input="handleInput"
  ></el-slider>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'DSlider',
    props: {
      modelValue: {
        type: [Number, Array] as PropType<number | number[]>,
        default: 0
      },
      formatTooltip: {
        type: Function as PropType<(val: number) => number | string>,
        default: undefined
      },
      tooltipVisible: {
        type: Boolean,
        default: false
      }
    },
    emits: ['change', 'input'],
    setup(props, { emit }) {
      const { modelValue } = toRefs(props)
      const elSlider = ref()
      const currentValue = ref(modelValue.value)

      watch(
        () => modelValue.value,
        (val) => {
          currentValue.value = val
        }
      )

      return {
        elSlider,
        handleChange(val: number) {
          currentValue.value = val
          emit('change', val)
        },
        handleInput(val: number) {
          currentValue.value = val
          emit('input', val)
        },
        value: currentValue
        // formatTooltip
      }
    }
  })
</script>

<style scoped></style>
