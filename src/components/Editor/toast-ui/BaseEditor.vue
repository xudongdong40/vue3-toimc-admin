<template>
  <div>
    <div id="editor" ref="editor"></div>
  </div>
</template>

<script lang="ts">
  import type { ToolbarItem } from './types'
  import Editor from '@toast-ui/editor'
  import '@toast-ui/editor/dist/toastui-editor.css'
  import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
  import '@toast-ui/editor/dist/i18n/zh-cn'
  import '@toast-ui/editor/dist/i18n/zh-tw'
  import { defineComponent, onMounted } from 'vue'

  const defaultToolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock']
    // ['scrollSync']
  ]

  const codeSyntaxHighlight = require('@toast-ui/editor-plugin-code-syntax-highlight')

  // const { Editor } = toastui;
  // const { codeSyntaxHighlight } = Editor.plugin;

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
      const editor = ref<HTMLElement>()

      onMounted(() => {
        if (editor.value) {
          new Editor({
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
            plugins: [codeSyntaxHighlight]
          })
        }
      })

      return {
        editor
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
