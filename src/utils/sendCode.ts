import { reactive, computed } from 'vue'

export default () => {
  // 验证码的状态
  const state = reactive({
    sending: false,
    count: 60
  })

  // 剩余多少秒重发
  const leftCount = computed<string>(() => {
    return state.count < 10 ? '0' + state.count : state.count + ''
  })

  // 发送验证码的处理函数
  const sendCode = () => {
    state.sending = true
    const ctrl = setInterval(() => {
      state.count--
      if (state.count === 0) {
        clearInterval(ctrl)
        state.count = 60
        state.sending = false
      }
    }, 1000)
  }

  return {
    state,
    sendCode,
    leftCount
  }
}
