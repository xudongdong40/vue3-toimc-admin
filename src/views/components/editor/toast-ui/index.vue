<template>
  <div class="p-5">
    <el-container class="flex flex-wrap mb-5">
      <el-row>
        <basic-form :schemas="formSchema" inline label-width="80px">
          <template #action>
            <el-row>
              <el-button type="primary" @click="() => handleEditorReset()">重置</el-button>
            </el-row>
          </template>
        </basic-form>
      </el-row>

      <el-button class="mb-5" type="primary" @click="getHeight">获取高度</el-button>
      <!-- <el-button class="mb-5" type="primary" @click="getEditorElements">获取DOM节点</el-button>
      <el-button class="mb-5" type="primary" @click="getHTMLText">获取HTML</el-button>
      <el-button class="mb-5" type="primary" @click="getMarkdown">获取Markdown</el-button>
      <el-button class="mb-5" type="primary" @click="hideEditor">隐藏编辑器</el-button>
      <el-button class="mb-5" type="primary" @click="showEditor">显示编辑器</el-button>
      <el-button class="mb-5" type="primary" @click="isMarkdownMode">是否为Markdown模式</el-button>
      <el-button class="mb-5" type="primary" @click="isWysiwygMode">是否为Wysiwyg模式</el-button>
      <el-button class="mb-5" type="primary" @click="setHeight">设置高度</el-button> -->

      <!-- <el-button class="mb-5" type="primary" @click="reset">清空</el-button> -->
      <!-- <el-button class="mb-5" type="primary" @click="insertText">插入文本</el-button> -->
      <!-- <el-button class="mb-5" type="primary" @click="setHTML">设置HTML</el-button> -->
    </el-container>
    <toast-editor ref="editor" :initial-edit-type="form.mode"></toast-editor>
  </div>
</template>

<script lang="ts">
  import { FormSchema } from '@/components/Form/types/types'
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {
      const editor = ref()

      // 获编辑器取高度
      const getHeight = () => {
        console.log(editor.value.editorIns)
        editor.value.reset()
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
      // const hideEditor = () => {
      //   editor.value.hide()
      // }
      // // 获取Markdown格式内容
      // const showEditor = () => {
      //   editor.value.show()
      // }

      // 切换显示隐藏editor
      const toggleShow = (val) => {
        val === true ? editor.value.show() : editor.value.hide()
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

      const handleEditorReset = () => {
        editor.value.reset()
      }

      let form = reactive({
        show: true, // 显示editor
        mode: 'markdown'
      })

      const formSchema: FormSchema[] = reactive([
        {
          component: 'switch',
          value: form.show,
          label: '是否显示',
          prop: 'isShow',
          events: {
            change: toggleShow
          }
        },
        {
          component: 'radio-group',
          value: form.mode,
          label: '编辑器模式',
          prop: 'mode',
          children: [
            { label: 'markdown', value: 'markdown' },
            { label: 'wysiwyg', value: 'wysiwyg' }
          ]
        }
      ] as FormSchema[])

      return {
        editor,
        getHeight,
        getEditorElements,
        getHTMLText,
        getMarkdown,
        // hideEditor,
        // showEditor,
        isMarkdownMode,
        isWysiwygMode,
        setHeight,
        // setHTML
        // reset
        // insertText,
        form,
        formSchema,
        handleEditorReset
      }
    }
  })
</script>

<style lang="scss" scoped></style>
