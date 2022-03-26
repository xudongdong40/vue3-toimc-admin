<template>
  <div>
    dashboard
    <cropper
      v-if="img"
      :src="img"
      height="300px"
      :circled="circled"
      :options="{ aspectRatio: 4 / 3 }"
      @cropend="handleCropend"
      @ready="handleReady"
    ></cropper>
    <cropper-modal v-model="show"></cropper-modal>
    <el-button @click="() => (show = !show)">toggle</el-button>
  </div>
</template>

<script lang="ts">
  import { CropendResult, Cropper } from '@/components/Cropper/typing'
  import { defineComponent } from 'vue'
  import img from '@/assets/images/logo.png'

  export default defineComponent({
    setup() {
      const cropper = ref<Cropper>()
      const previewSource = ref('')
      const show = ref(false)

      function handleCropend({ imgBase64 }: CropendResult) {
        previewSource.value = imgBase64
      }

      function handleReady(cropperInstance: Cropper) {
        cropper.value = cropperInstance
      }
      return {
        handleCropend,
        handleReady,
        img,
        show
      }
    }
  })
</script>

<style lang="scss" scoped></style>
