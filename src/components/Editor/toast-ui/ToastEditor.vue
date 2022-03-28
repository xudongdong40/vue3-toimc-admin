<template>
  <div>
    <div ref="editor"></div>
  </div>
</template>

<script lang="ts">
  import type { ToolbarItem } from './types'
  import Prism from 'prismjs'
  import Editor from '@toast-ui/editor'
  import 'prismjs/themes/prism.css'
  import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
  import '@toast-ui/editor/dist/toastui-editor.css'
  import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
  import '@toast-ui/editor/dist/i18n/zh-cn'
  import '@toast-ui/editor/dist/i18n/zh-tw'
  import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
  import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue'

  interface DataProps {
    editorIns: any
    getHeight: () => string
    getEditorElements: any
    getHTML: () => string
    getMarkdown: () => string
    hide: () => void
    show: () => void
    isMarkdownMode: () => boolean
    isWysiwygMode: () => boolean
    setHeight: (ref?: string) => void
  }

  const defaultToolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock']
    // ['scrollSync']
  ]

  export default defineComponent({
    props: {
      height: {
        type: String,
        default: '500px'
      },
      initialValue: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      previewHighlight: {
        type: Boolean,
        default: false
      },
      initialEditType: {
        type: String as PropType<'markdown' | 'wysiwyg'>,
        default: 'markdown'
      },
      language: {
        type: String as PropType<'en-US' | 'zh-CN' | 'zh-TW'>,
        default: 'zh-CN'
      },
      toolbarItems: {
        type: Array as PropType<Array<ToolbarItem[]>>,
        default: () => defaultToolbarItems
      },
      theme: {
        type: String as PropType<'dark' | ''>,
        default: ''
      }
    },
    setup(props) {
      const {
        height,
        initialValue,
        placeholder,
        previewHighlight,
        initialEditType,
        language,
        toolbarItems,
        theme
      } = toRefs(props)

      const data: DataProps = reactive({
        editorIns: {},
        getHeight: () => {
          return data.editorIns.getHeight()
        },
        getEditorElements: () => {
          return data.editorIns.getEditorElements()
        },
        getHTML: () => {
          return data.editorIns.getHTML()
        },
        getMarkdown: () => {
          return data.editorIns.getMarkdown()
        },
        hide: () => {
          return data.editorIns.hide()
        },
        show: () => {
          return data.editorIns.show()
        },
        isMarkdownMode: () => {
          return data.editorIns.isMarkdownMode()
        },
        isWysiwygMode: () => {
          return data.editorIns.isWysiwygMode()
        },
        setHeight: (h) => {
          return data.editorIns.setHeight(h)
        }
      })

      const editor = ref<HTMLElement>()

      onMounted(() => {
        if (editor.value) {
          data.editorIns = new Editor({
            el: editor.value,
            height: height.value,
            initialValue: initialValue.value,
            placeholder: placeholder.value,
            previewStyle: 'vertical',
            previewHighlight: previewHighlight.value,
            initialEditType: initialEditType.value,
            language: language.value,
            toolbarItems: toolbarItems.value,
            theme: theme.value,
            plugins: [[codeSyntaxHighlight, { highlighter: Prism }]]
          })
        }
      })

      return {
        editor,
        ...toRefs(data)
      }
    }
  })
</script>

<style lang="scss" scoped>
  :deep(.toastui-editor-contents h1) {
    border-bottom: 1px solid #dbdbdb;
  }

  :deep(.toastui-editor-main .toastui-editor-md-splitter) {
    background-color: #d0d0d0;
  }

  :deep(.ProseMirror) {
    height: 100%;
  }
</style>
