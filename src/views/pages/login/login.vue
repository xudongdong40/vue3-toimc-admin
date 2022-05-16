<template>
  <div class="w-full p-1 custom-login">
    <!-- 右上角扫码部分，若不需要，可直接注销 -->
    <div class="flex items-center justify-end">
      <div class="px-3 py-2 rounded-md mr-2 flex items-center bg-[#ECFAF3]">
        <span class="we inline-block pr-2 bg-contain"></span>
        <span class="text-sm text-[#07C160]">微信扫码登录</span>
      </div>
      <router-link to="/login/scan">
        <img class="relative cursor-pointer" src="@/assets/images/qr.png" />
      </router-link>
    </div>
    <!-- 登陆表单主体部分，可按需进行修改 -->
    <div class="my-10 mx-auto max-w-96">
      <div class="text-3xl pb-6">toimc管理系统</div>
      <el-tabs v-model="activeName" class="pt-5" @tab-click="handleClick">
        <!-- 密码登陆 -->
        <el-tab-pane label="密码登录" name="pwd">
          <basic-form :schemas="loginForm" label-width="0" class="pt-4">
            <template #action>
              <el-button type="primary" size="large" class="w-full" @click="loginHandler"
                >登录</el-button
              >
            </template>
          </basic-form>
        </el-tab-pane>
        <!-- 验证码登陆 -->
        <el-tab-pane label="验证码登录" name="code">
          <basic-form :schemas="codeLoginForm" label-width="0" class="pt-4">
            <template #suffix>
              <el-link
                v-if="!state.sending"
                type="primary"
                :underline="false"
                class="mr-2"
                href="javascript:;"
                @click="sendCode"
                >获取验证码</el-link
              >
              <span
                v-else
                class="text-sm text-gray-400 w-[70px] text-center inline-block flex items-center"
                >重发{{ leftCount }}秒</span
              >
            </template>
            <template #action>
              <el-button type="primary" size="large" class="w-full" @click="loginHandler"
                >登录</el-button
              >
            </template>
          </basic-form>
        </el-tab-pane>
      </el-tabs>
      <div class="flex justify-between text-sm text-gray-400">
        <router-link class="text-blue-400" to="/login/forget">忘记密码？</router-link>
        <div>
          还没有账号？
          <router-link class="text-blue-400" to="/login/reg">立即注册></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { FormSchema } from '@/components/Form/types/types'
  import { TabsPaneContext } from 'element-plus'
  import { defineComponent } from 'vue'
  import sendUtils from '@/utils/sendCode'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    setup() {
      const { push } = useRouter()
      // 默认为密码登陆，将pwd改成code，将默认为验证码登陆
      const activeName = ref('pwd')
      const handleClick = (tab: TabsPaneContext, event: Event) => {
        console.log(tab, event)
      }

      // 登陆表单配置，作为配置参数传递给basic-form组件
      const loginForm = [
        {
          component: 'input',
          class: 'py-1',
          prop: 'username',
          value: 'admin',
          attrs: {
            placeholder: '请输入手机号/账号',
            size: 'large',
            prefixIcon: 'Avatar'
          }
        },
        {
          component: 'input',
          class: 'py-1',
          prop: 'password',
          value: '123456',
          attrs: {
            placeholder: '请输入密码',
            type: 'password',
            size: 'large',
            prefixIcon: 'Lock'
          }
        }
      ] as FormSchema[]

      // 验证码登陆配置，作为配置参数传递给basic-form组件
      const codeLoginForm = [
        {
          component: 'input',
          class: 'py-1',
          prop: 'mobile',
          value: '13400001234',
          attrs: {
            placeholder: '请输入手机号',
            size: 'large',
            prefixIcon: 'Avatar'
          }
        },
        {
          component: 'input',
          class: 'py-1',
          prop: 'code',
          value: '622233',
          attrs: {
            placeholder: '请输入验证码',
            size: 'large',
            prefixIcon: 'Lock'
          },
          itemSlot: { suffix: 'suffix' }
        }
      ] as FormSchema[]

      // 验证码处理，state 为状态，sendCode为处理发送的函数，leftCount为重发时间
      const { state, sendCode, leftCount } = sendUtils()

      // 登陆成功后的跳转
      const loginHandler = () => {
        push('/home')
      }

      return {
        activeName,
        handleClick,
        loginForm,
        codeLoginForm,
        state,
        sendCode,
        leftCount,
        loginHandler
      }
    }
  })
</script>

<style scoped lang="scss">
  .we {
    width: 19px;
    height: 19px;
    background: url('@/assets/images/security.png') no-repeat center center;
  }

  .custom-login {
    :deep(.el-tabs__nav-wrap::after) {
      height: unset;
    }
  }
</style>
