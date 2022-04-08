<template>
  <div class="flex justify-around">
    <div
      v-for="item of navType"
      :key="item"
      :class="['setting-menu', 'type-picker-' + item, { active: type === item }]"
      @click="handleChangeNavType(item)"
    ></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      modelValue: {
        type: String,
        default: 'siderbar'
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const { modelValue: type } = toRefs(props)
      // console.log(modelValue.value)
      const navType = ['siderbar', 'mix', 'top', 'mixbar']

      const handleChangeNavType = (type) => {
        emit('update:modelValue', type)
      }

      return {
        navType,
        type,
        handleChangeNavType
      }
    }
  })
</script>

<style lang="scss" scoped>
  .setting-menu {
    position: relative;
    width: 56px;
    height: 48px;
    overflow: hidden;
    cursor: pointer;
    background-color: #f0f2f5;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

    &.active {
      border: 2px solid #0960bd;
    }

    &.type-picker-siderbar::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 33%;
      height: 100%;
      background-color: #273352;
      content: "";
    }

    &.type-picker-siderbar::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #fff;
      content: "";
    }

    &.type-picker-mix::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 33%;
      height: 100%;
      background-color: #fff;
      border-radius: 4px 0 0 4px;
      content: "";
    }

    &.type-picker-mix::after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 25%;
      background-color: #273352;
      content: "";
    }

    &.type-picker-top::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #273352;
      content: "";
    }

    &.type-picker-mixbar::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 40%;
      height: 100%;
      background-color: #273352;
      border-right: 10px solid #fff;
      content: "";
    }

    &.type-picker-mixbar::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #fff;
      content: "";
    }
  }
</style>
