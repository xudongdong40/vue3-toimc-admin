/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */

import { ElMessage } from 'element-plus'
import type { DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  copyData: string | number
  __handleClick__: any
}

function handleClick(this) {
  const input = document.createElement('input')
  input.value = this.copyData.toLocaleString()
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
  ElMessage({
    type: 'success',
    message: '复制成功'
  })
}

export default {
  install(app) {
    app.directive('copy', {
      mounted(el: ElType, binding: DirectiveBinding) {
        el.copyData = binding.value
        el.addEventListener('click', handleClick)
      },
      updated(el: ElType, binding: DirectiveBinding) {
        el.copyData = binding.value
      },
      beforeUnmount(el: ElType) {
        el.removeEventListener('click', el.__handleClick__)
      }
    })
  }
}
