<template>
  <div class="p-4">
    <t-card header="头像列表">
      <p class="pb-1">头像列表</p>
      <avatar-list :images="images" :gutter="10" direction="horizontal"></avatar-list>
      <p class="pt-4 pb-1">头像列表 指定数量 不显示多的头像</p>
      <avatar-list
        :images="images"
        :num="3"
        :gutter="10"
        direction="horizontal"
        :show-more="false"
      ></avatar-list>
      <p class="pt-4 pb-1">头像列表inline</p>
      <avatar-list :images="images" :gutter="10" direction="horizontal" inline></avatar-list>
      <avatar-list :images="images" :gutter="10" direction="horizontal" inline></avatar-list>
      <p class="pt-4 pb-1">头像列表-设置全部显示</p>
      <avatar-list :images="images" :gutter="10" :num="0" direction="horizontal"></avatar-list>
      <p class="pt-4 pb-1">头像列表- 设置 reverse - 改变图片的层级</p>
      <avatar-list
        :images="images"
        :gutter="10"
        :num="0"
        direction="horizontal"
        :reverse="false"
      ></avatar-list>
      <p class="pt-4 pb-1">头像列表- 边框大小 与 颜色 </p>
      <avatar-list
        :images="images"
        :gutter="10"
        :num="0"
        direction="horizontal"
        :border-color="'#f56'"
        :border-width="'5px'"
      ></avatar-list>
      <p class="pt-4 pb-1">头像列表-垂直显示</p>
      <avatar-list :images="images" :gutter="10" :num="3" direction="vertical"></avatar-list>
      <p class="pt-4 pb-1">头像列表-垂直inline显示</p>
      <avatar-list :images="images" :gutter="10" :num="3" direction="vertical" inline></avatar-list>
      <avatar-list :images="images" :gutter="10" :num="3" direction="vertical" inline></avatar-list>
      <avatar-list :images="images" :gutter="10" :num="3" direction="vertical" inline></avatar-list>
      <avatar-list :images="images" :gutter="10" :num="3" direction="vertical" inline></avatar-list>
    </t-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  const modules = import.meta.glob('@/assets/images/headers/**/*.jpeg', {
    eager: true,
    import: 'default'
  })

  export default defineComponent({
    setup() {
      const images = ref([] as string[])
      Object.keys(modules).forEach((key) => {
        const mod = modules[key] || ''
        images.value.push(mod as string)
      })

      return {
        images
      }
    }
  })
</script>

<style scoped></style>
