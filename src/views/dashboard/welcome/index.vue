<template>
  <div class="p-4">
    <t-card header="">
      <el-row>
        <el-col :span="2">
          <el-avatar :src="header" :size="64"></el-avatar>
        </el-col>
        <el-col :span="18">
          <el-row class="font-bold text-xl text-gray-600"
            >{{ hiMorning }}{{ store.userInfo.username }}，{{ randomCtsen }}
          </el-row>
          <el-row class="text-gray-400 text-sm pt-1 flex-col">
            <p>最近更新：1.0正式版本发布~</p>
            <p
              >欢迎使用！<el-link
                type="primary"
                :underline="false"
                href="https://github.com/toimc-team/vue-toimc-admin"
                >仓库地址</el-link
              ></p
            >
          </el-row>
        </el-col>
        <el-row :span="4" class="flex-col items-center">
          <avatar-list :images="images" :gutter="10" direction="horizontal"></avatar-list>
          <p class="text-sm text-gray-300 pt-2">项目核心贡献者们</p>
        </el-row>
      </el-row>
    </t-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import header from '@/assets/images/brian.jpg'
  import dayjs from 'dayjs'
  import { useUserStore } from '@/store/modules/user'

  const modules = import.meta.globEager('@/assets/images/headers/**/*.jpeg')

  export default defineComponent({
    setup() {
      const images = ref([] as string[])
      const arr = [
        '又是元气满满的一天哦~',
        '今天也要加油哦~',
        '加油！',
        '开心每一天~',
        '快乐每一天~'
      ]

      const store = useUserStore()

      Object.keys(modules).forEach((key) => {
        const mod = modules[key].default || ''
        images.value.push(mod)
      })

      const hiMorning = computed(() => (dayjs().format('A') === 'AM' ? '早上好' : '下午好'))

      return {
        header,
        images,
        hiMorning,
        store,
        randomCtsen: arr[Math.floor(Math.random() * arr.length)]
      }
    }
  })
</script>

<style scoped></style>
