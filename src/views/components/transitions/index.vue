<template>
  <div class="p-4">
    <el-card header="过渡动画" class="min-h-[1080px]">
      <el-row>
        <el-button type="primary" @click="start">开始动画</el-button>
        <el-button @click="stop">停止动画</el-button>
      </el-row>
      <h1 class="py-4">内置动画</h1>
      <el-row>
        <el-col
          v-for="(item, index) in transitionList"
          :key="index"
          :span="6"
          class="flex flex-col items-center justify-center mb-6"
        >
          <div>{{ item }}</div>
          <div>
            <transition-list :name="item">
              <div v-show="show" class="box"></div>
            </transition-list>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      const show = ref(true)

      const transitionList = [
        'Fade',
        'Scale',
        'SlideY',
        'ScrollY',
        'SlideYReverse',
        'ScrollYReverse',
        'SlideX',
        'ScrollX',
        'SlideXReverse',
        'ScrollXReverse',
        'ScaleRotate',
        'ExpandX',
        'Expand'
      ]

      let ctrl
      const start = () => {
        ctrl = setInterval(() => {
          show.value = false
          setTimeout(() => {
            show.value = true
          }, 300)
        }, 2000)
      }

      const stop = () => {
        clearInterval(ctrl)
      }

      return {
        show,
        start,
        stop,
        transitionList
      }
    }
  })
</script>

<style lang="scss" scoped>
  .box {
    width: 150px;
    height: 150px;
    margin-top: 20px;
    background-color: rgb(126 170 236);
  }
</style>
