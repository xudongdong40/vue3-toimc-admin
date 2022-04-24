<template>
  <div class="toimc relative">
    <el-input
      v-if="showInput"
      v-model="innerValueRef"
      type="password"
      :placeholder="placeholder"
      :disabled="disabled"
      show-password
      clearable
      @change="handleChange" >
    </el-input>
    <div class="toimc-bar">
      <div class="toimc-bar--fill" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { zxcvbn } from '@zxcvbn-ts/core';
  export default defineComponent({
    name: 'PasswordCard',
    props: {
      value: {
        type: String,
        default: ''
      },
      showInput: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    emits: ['score-change', 'change'],
    setup(props, { emit }) {
      const { value, disabled } = toRefs(props);
      const innerValueRef = ref(value.value || '')
      const getPasswordStrength = computed(() => {
        if (disabled.value) return -1;
        const score = innerValueRef.value ? zxcvbn(innerValueRef.value).score : -1;
        emit('score-change', score);
        return score;
      });
      function handleChange(e) {
        emit('change', e);
      }
      return {
        innerValueRef,
        getPasswordStrength,
        handleChange
      }
    }
  })
</script>

<style lang="scss" scoped>
  .toimc {
    :deep(.el-input__inner:focus) {
      box-shadow: none !important;
    }
    :deep(input:disabled) {
      cursor: not-allowed;
    }
    &-bar {
      position: relative;
      height: 6px;
      margin: 10px auto 6px;
      background-color: #00000040;
      border-radius: 6px;
      &::before,
      &::after {
        position: absolute;
        z-index: 10;
        display: block;
        width: 20%;
        height: inherit;
        background-color: transparent;
        border-color: #fff;
        border-style: solid;
        border-width: 0 5px;
        content: '';
      }
      &::before {
        left: 20%;
      }
      &::after {
        right: 20%;
      }
      .toimc-bar--fill {
        position: absolute;
        width: 0;
        height: inherit;
        background-color: transparent;
        border-radius: inherit;
        transition: width 0.5s ease-in-out, background 0.25s;
        &[data-score='0'] {
          width: 20%;
          background-color: darken(#e74242, 10%);
        }
        &[data-score='1'] {
          width: 40%;
          background-color: #ed6f6f;
        }
        &[data-score='2'] {
          width: 60%;
          background-color: #efbd47;
        }
        &[data-score='3'] {
          width: 80%;
          background-color: #55d18780;
        }
        &[data-score='4'] {
          width: 100%;
          background-color: #55d187;
        }
      }
    }
  }
</style>
