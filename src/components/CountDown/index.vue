<template>
  <div>
    <div>
      <el-button @click="isShow = true">Show</el-button>
    </div>
    <setting v-model:visible="isShow"></setting>
  </div>
</template>

<script lang="ts">
  import Setting from './setting.vue'
  export default defineComponent({
    name: 'CountDown',
    components: {
      Setting
    },
    setup() {
      const isShow = ref(false)
      return {
        isShow
      }
    }
  })
</script>

<style scoped></style>
