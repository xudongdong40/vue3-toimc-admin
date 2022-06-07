<template>
  <div class="p-4">
    <el-card :header="$t('menu.component.player.video')">
      <video-player
        v-model:index="playerState.index"
        v-model:loop="playerState.loop"
        v-model:volume="playerState.volume"
        v-model:rate="playerState.rate"
        :list="playerState.list"
        autoplay
        class="player"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  const playerState = reactive({
    index: 0,
    loop: 1,
    volume: 0.5,
    rate: 2,
    list: [
      {
        sources: [
          {
            src: 'http://localhost:2222/001.mp4',
            type: 'video/mp4'
          }
        ],
        title: '001.mp4'
      },
      {
        src: 'http://localhost:2222/002.mp4',
        title: '002.mp4'
      },
      {
        src: 'http://localhost:2222/003.mp4',
        title: '003.mp4'
      },
      {
        src: 'http://localhost:2222/004.mp4',
        title: '004.mp4'
      }
    ]
  })
</script>

<style scoped>
  :deep(.video-player) {
    height: 75vh !important;
    max-width: 100%;
  }
</style>
