<template>
  <div class="p-4">
    <el-card :header="$t('menu.component.player.audio')">
      <p class="pb-2">播放控制：</p>
      <basic-form :schemas="formSchema" @change="update">
        <template #action="{ form: formRef }">
          <el-row>
            <el-button type="primary" @click="() => handleFormReset(formRef)">重置</el-button>
            <el-button type="info" @click="shuffleHandle">随机列表</el-button>
          </el-row>
        </template>
      </basic-form>
      <p class="pt-6 pb-2">播放器示例：</p>
      <audio-player
        v-model:index="index"
        v-model:loop="loop"
        v-model:rate="rate"
        :list="list"
        :autoplay="model['autoplay']"
      />
      <div class="text-gray-300 text-sm pt-8">
        <p
          >所有音乐均来自于互联网，用于测试演示使用，并无商业用途，如有侵犯版权，请联系:
          admin@wayearn.com 删除。</p
        >
        <p
          >All music is sourced from the internet for testing and demonstration purposes, and is not
          for commercial use. Please contact: admin@wayearn.com to remove any infringement of
          copyright.</p
        >
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { FormSchema } from '@/components/Form/types/types'
  import { useForm } from '@/components/Form/useForm'
  import { shuffle } from 'lodash-es'

  const index = ref(0)
  const loop = ref(0)
  // const volume = ref(0.8)
  const rate = ref(1)

  // 音乐列表
  const list = ref([
    {
      src: 'https://toimc-online.obs.cn-east-3.myhuaweicloud.com/vue-toimc-admin/music/%E5%A6%82%E6%84%BF.mp3',
      title: '如愿 - Cover王菲'
    },
    {
      src: 'https://toimc-online.obs.cn-east-3.myhuaweicloud.com/vue-toimc-admin/music/%E5%AD%A4%E5%8B%87%E8%80%85.mp3',
      title: '孤勇者 - Cover陈奕迅'
    },
    {
      src: 'https://toimc-online.obs.cn-east-3.myhuaweicloud.com/vue-toimc-admin/music/%E7%88%B1%E4%BD%A0.mp3',
      title: '爱你 - 王心凌'
    },
    {
      src: 'https://toimc-online.obs.cn-east-3.myhuaweicloud.com/vue-toimc-admin/music/%E9%9D%92%E9%B8%9F%EF%BC%88%E3%83%95%E3%82%99%E3%83%AB%E3%83%BC%E3%83%8F%E3%82%99%E3%83%BC%E3%83%88%E3%82%99%EF%BC%89.mp3',
      title: '青鸟（ブルーバード） - 生物股长'
    },
    {
      src: 'https://toimc-online.obs.cn-east-3.myhuaweicloud.com/vue-toimc-admin/music/%E5%85%89%E8%BE%89%E5%B2%81%E6%9C%88.mp3',
      title: '光辉岁月 - Beyond'
    }
  ])

  // let form = reactive({
  //   autoplay: false
  // })

  // 表格属性
  const formSchema: FormSchema[] = reactive([
    {
      component: 'switch',
      value: false,
      label: '自动播放',
      prop: 'autoplay'
    }
  ])

  const { update, model } = useForm(formSchema)

  const shuffleHandle = () => {
    list.value = shuffle(list.value)
  }

  // 表格控制
  const handleFormReset = (formRef) => {
    formRef?.resetFields()
  }
</script>

<style></style>
