<template>
  <div class="p-4">
    <el-card :header="$t('menu.component.player.audio')">
      <audio-player
        v-model:index="index"
        v-model:loop="loop"
        v-model:volume="volume"
        v-model:rate="rate"
        :list="list"
        autoplay
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  const index = ref(1)
  const loop = ref(2)
  const volume = ref(0.8)
  const rate = ref(1)
  const list = ref([
    {
      src: 'http://localhost:1111/蒲悦 - 如果有来生.mp3',
      // duration: 194,
      title: '蒲悦 - 如果有来生'
    },
    {
      src: 'http://localhost:1111/姚贝娜 - 鱼.mp3',
      // duration: 304,
      title: '姚贝娜 - 鱼'
    }
  ])
</script>

<style></style>
