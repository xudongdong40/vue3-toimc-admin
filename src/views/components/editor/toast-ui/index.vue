<template>
  <div class="p-5">
    <el-container class="flex flex-wrap">
      <el-button class="mb-5" type="primary" @click="getHeight">获取高度</el-button>
      <el-button class="mb-5" type="primary" @click="getEditorElements">获取DOM节点</el-button>
      <el-button class="mb-5" type="primary" @click="getHTMLText">获取HTML</el-button>
      <el-button class="mb-5" type="primary" @click="getMarkdown">获取Markdown</el-button>
      <el-button class="mb-5" type="primary" @click="hideEditor">隐藏编辑器</el-button>
      <el-button class="mb-5" type="primary" @click="showEditor">显示编辑器</el-button>
      <el-button class="mb-5" type="primary" @click="isMarkdownMode">是否为Markdown模式</el-button>
      <el-button class="mb-5" type="primary" @click="isWysiwygMode">是否为Wysiwyg模式</el-button>
      <el-button class="mb-5" type="primary" @click="setHeight">设置高度</el-button>
      <!-- <el-button class="mb-5" type="primary" @click="reset">清空</el-button> -->
      <!-- <el-button class="mb-5" type="primary" @click="insertText">插入文本</el-button> -->
      <!-- <el-button class="mb-5" type="primary" @click="setHTML">设置HTML</el-button> -->
    </el-container>
    <toast-editor ref="editor" placeholder="Please input..."></toast-editor>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {
      const editor = ref()
      // 获编辑器取高度
      const getHeight = () => {
        console.log(editor.value.editorIns)
        console.log(editor.value.editorIns.mdEditor.setMarkdown('123123321'))
        console.log(editor.value.getHeight())
      }
      // 获取markdown editor, preview, wysiwyg editor DOM elements
      const getEditorElements = () => {
        console.log(editor.value.getEditorElements())
      }
      // 所见所得 - HTML内容
      const getHTMLText = () => {
        if (editor.value.isWysiwygMode()) {
          console.log(editor.value.getHTML())
        } else {
          console.warn('只能在WysiwygMode模式获取')
        }
      }
      // 获取Markdown格式内容
      const getMarkdown = () => {
        console.log(editor.value.getMarkdown())
      }
      // 获取Markdown格式内容
      const hideEditor = () => {
        editor.value.hide()
      }
      // 获取Markdown格式内容
      const showEditor = () => {
        editor.value.show()
      }
      // 是否是Markdown模式
      const isMarkdownMode = () => {
        console.log(editor.value.isMarkdownMode())
      }
      // 是否是所见即所得模式
      const isWysiwygMode = () => {
        console.log(editor.value.isWysiwygMode())
      }
      // 设置高度
      const setHeight = () => {
        editor.value.setHeight('800px')
      }
      // const setHTML = ()=>{
      //   editor.value.editorIns.mdEditor.setMarkdown('<div>123321</div>')
      // }
      // const reset = ()=>{
      //   console.log(editor.value.editorIns.reset())
      // }
      // 插入文本
      // const insertText = ()=>{
      //   console.log(editor.value.insertText('测试文本'))
      // }

      return {
        editor,
        getHeight,
        getEditorElements,
        getHTMLText,
        getMarkdown,
        hideEditor,
        showEditor,
        isMarkdownMode,
        isWysiwygMode,
        setHeight
        // setHTML
        // reset
        // insertText,
      }
    }
  })
</script>

<style lang="scss" scoped></style>
