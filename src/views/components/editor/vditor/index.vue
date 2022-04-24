<template>
  <div class="p-4">
    <t-card class="mb-4">
      <el-row>
        <basic-form :schemas="formSchema" inline label-width="80px" @change="handleChange">
          <template #action>
            <el-row>
              <!-- <el-button type="primary" @click="() => handleGetHeight()">获取高度</el-button>
              <el-button type="primary" @click="() => handleGetHTMLText()">获取HTML</el-button>
              <el-button type="primary" @click="() => handleGetMarkdown()">获取Markdown</el-button>
              <el-button type="success" @click="() => handleSetHTMLText()">设置HTML</el-button>
              <el-button type="success" @click="() => handleSetMarkdown()">设置Markdown</el-button>
              <el-button type="success" @click="() => handleInsertText()">插入文本</el-button>
              <el-button type="danger" @click="() => handleEditorReset()">清空内容</el-button> -->
            </el-row>
          </template>
        </basic-form>
      </el-row>
    </t-card>
    <vditor
      ref="editor"
      :mode="form.mode"
      :value="form.value"
      :lang="form.lang"
      :min-height="form.minHeight"
      :width="form.width"
      :placeholder="form.placeholder"
      :debugger="form.debugger"
      :theme="form.theme"
      :icon="form.icon"
    ></vditor>
  </div>
</template>

<script lang="ts">
  import { FormSchema } from '@/components/Form/types/types'
  import { LangType, ModeType, ThemeType, IconType } from '@/components/Editor/vditor/types'
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {
      const editor = ref()

      let form = reactive({
        mode: 'ir' as ModeType,
        value: 'hello',
        lang: 'zh_CN' as LangType,
        minHeight: 100,
        width: 'auto',
        placeholder: 'Please input here...',
        debugger: false,
        theme: 'classic' as ThemeType,
        icon: 'ant' as IconType
      })

      const formSchema: FormSchema[] = reactive([
        {
          component: 'radio-group',
          value: form.mode,
          label: '编辑模式',
          prop: 'mode',
          children: [
            { component: 'radio-button', label: 'sv', value: 'sv' },
            { component: 'radio-button', label: 'ir', value: 'ir' },
            { component: 'radio-button', label: 'wysiwyg', value: 'wysiwyg' }
          ]
        },
        {
          component: 'radio-group',
          value: form.lang,
          label: '设置语言',
          prop: 'lang',
          children: [
            { component: 'radio-button', label: '中', value: 'zh_CN' },
            { component: 'radio-button', label: '英', value: 'en_US' },
            { component: 'radio-button', label: '繁', value: 'zh_TW' }
          ]
        },
        {
          component: 'input-number',
          value: form.minHeight,
          label: '高度(px)',
          prop: 'minHeight',
          attrs: {
            min: 400,
            step: 50,
            'step-strictly': true
          }
        },
        {
          component: 'radio-group',
          value: form.width,
          label: '宽度',
          prop: 'width',
          children: [
            { component: 'radio-button', label: '400px', value: '400px' },
            { component: 'radio-button', label: '50%', value: '50%' },
            { component: 'radio-button', label: 'auto', value: 'auto' }
          ]
        },
        {
          component: 'radio-group',
          value: form.theme,
          label: '主题',
          prop: 'theme',
          children: [
            { component: 'radio-button', label: 'classic', value: 'classic' },
            { component: 'radio-button', label: 'dark', value: 'dark' }
          ]
        },
        {
          component: 'radio-group',
          value: form.icon,
          label: '图标',
          prop: 'icon',
          children: [
            { component: 'radio-button', label: 'ant', value: 'ant' },
            { component: 'radio-button', label: 'material', value: 'material' }
          ]
        },
        {
          component: 'switch',
          value: form.debugger,
          label: 'debugger',
          prop: 'debugger'
        }
      ])

      const handleChange = (value) => {
        console.log(value)
        form.mode = value.mode
        form.lang = value.lang
        form.minHeight = value.minHeight
        form.width = value.width
        form.debugger = value.debugger
        form.theme = value.theme
        form.icon = value.icon
      }

      return {
        editor,
        form,
        formSchema,
        handleChange
      }
    }
  })
</script>
