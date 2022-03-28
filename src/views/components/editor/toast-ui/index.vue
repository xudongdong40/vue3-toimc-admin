<template>
  <div class="p-5">
    <el-container class="flex flex-wrap">
      <el-button class="mb-5" type="primary" @click="getHeight">获取高度</el-button>
      <el-button class="mb-5" type="primary">设置为繁体</el-button>
      <el-button class="mb-5" type="primary">设置为英文</el-button>
      <el-button class="mb-5" type="primary">4444</el-button>
      <el-button class="mb-5" type="primary">5555</el-button>
      <el-button class="mb-5" type="primary">66666</el-button>
      <el-button class="mb-5" type="primary">77777</el-button>
      <el-button class="mb-5" type="primary">8888</el-button>
      <el-button class="mb-5" type="primary">9999</el-button>
      <el-button class="mb-5" type="primary">66666</el-button>
      <el-button class="mb-5" type="primary">77777</el-button>
      <el-button class="mb-5" type="primary">8888</el-button>
      <el-button class="mb-5" type="primary">9999</el-button>
      <el-button class="mb-5" type="primary">66666</el-button>
      <el-button class="mb-5" type="primary">77777</el-button>
      <el-button class="mb-5" type="primary">8888</el-button>
      <el-button class="mb-5" type="primary">9999</el-button>
    </el-container>
    <base-editor ref="editor" placeholder="Please input..."></base-editor>
  </div>
</template>

<script lang="ts">
  // import Editor from '@toast-ui/editor'
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {
      const editor = ref()

      const getHeight = () => {
        console.log(editor.value.editorIns.getHeight())
      }

      return {
        editor,
        getHeight
      }

      // const toolbarItems = [
      //   ['heading', 'bold', 'italic', 'strike'],
      //   ['table', 'image', 'link'],
      //   ['scrollSync']
      // ]
      // return {
      //   toolbarItems
      // }
    }
  })
</script>

<style lang="scss" scoped></style>
