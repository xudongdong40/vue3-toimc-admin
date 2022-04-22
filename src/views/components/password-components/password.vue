<template>
  <div :class="['p-4', 'prefixCls']" class="relative">
    <el-input
      v-model="innerValueRef"
      type="password"
      placeholder="Please input password"
      @change="handleChange"
      :disabled="disabled"
      show-password />
    <div class="prefixCls-bar">
      <div class="`prefixCls-bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'
  import { zxcvbn } from '@zxcvbn-ts/core';
  export default defineComponent({
    name: 'PasswordCard',
    props: {
      value: String,
      showInput: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
    },
    emits: ['score-change', 'change'],
    setup(props, { emit }) {
      const innerValueRef = ref('')
      const getPasswordStrength = computed(() => {
        const { disabled } = props;
        if (disabled) return -1;
        const innerValue = unref(innerValueRef);
        const score = innerValue ? zxcvbn(unref(innerValueRef)).score : -1;
        emit('score-change', score);
        return score;
      });
      function handleChange(e) {
        innerValueRef.value = e;
      }
      watchEffect(() => {
        innerValueRef.value = props.value || '';
      });
      watch(
        () => unref(innerValueRef),
        (val) => {
          emit('change', val);
        },
      );
      return {innerValueRef, getPasswordStrength, handleChange}
    }
  })
</script>

<style lang="scss" scoped>
  // @prefix-cls: ~'@{namespace}-strength-meter';
  .prefixCls {
    &-bar {
      position: relative;
      height: 6px;
      margin: 10px auto 6px;
      background-color: grey;
      border-radius: 6px;
      &::before,
      &::after {
        position: absolute;
        z-index: 10;
        display: block;
        width: 20%;
        height: inherit;
        background-color: transparent;
        border-color: white;
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
      &--fill {
        position: absolute;
        width: 0;
        height: inherit;
        background-color: transparent;
        border-radius: inherit;
        transition: width 0.5s ease-in-out, background 0.25s;
        &[data-score='0'] {
          width: 20%;
          background-color: darken(red, 10%);
        }
        &[data-score='1'] {
          width: 40%;
          background-color: red;
        }
        &[data-score='2'] {
          width: 60%;
          background-color: yellow;
        }
        &[data-score='3'] {
          width: 80%;
          background-color: fade(green, 50%);
        }
        &[data-score='4'] {
          width: 100%;
          background-color: green;
        }
      }
    }
  }
</style>
