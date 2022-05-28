<template>
  <div>
    播放器
    <audio-player :src="src" :list="list" autoplay />
  </div>
</template>

<script lang="ts" setup>
  const src = ref('http://localhost/media/蒲悦 - 如果有来生.mp3')
  const list = ref([
    {
      src: 'http://localhost/media/蒲悦 - 如果有来生.mp3',
      duration: 194,
      title: '蒲悦 - 如果有来生'
    }
  ])
</script>

<style></style>
