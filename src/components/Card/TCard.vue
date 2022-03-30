<template>
  <div
    :class="[{ 'no-header': !!headerClass && layout !== 'default' }, { ['card-' + size]: size }]"
  >
    <el-card :shadow="shadow" :body-style="!bodyClass ? bodyStyle : { padding: 'unset' }">
      <template v-if="showSlots('header') || header" #header>
        <div :class="[headerClass, 'header']">
          <template v-if="header">
            <span class="flex items-center">
              <span class="mr-2">{{ header }}</span>
              <template v-if="tips">
                <slot name="tips">
                  <template v-if="typeof tips === 'string'">
                    <el-tooltip :content="tips">
                      <icon :icon="tipsIcon" class="text-gray-400"></icon>
                    </el-tooltip>
                  </template>
                  <template v-else-if="tips.content !== ''">
                    <el-tooltip v-bind="tips">
                      <icon :icon="tipsIcon" class="text-gray-400"></icon>
                    </el-tooltip>
                  </template>
                </slot>
              </template>
            </span>
          </template>
          <slot v-else name="header"></slot>
          <div v-if="collapse" @click="toggle">
            <slot name="collapse" :show="isCollapse">
              <icon icon="ep:arrow-up" :class="['rotate-icon', isCollapse && 'active']"></icon>
            </slot>
          </div>
        </div>
      </template>
      <transition-list name="Expand">
        <div v-show="isCollapse" ref="bodyContent" :class="bodyClass">
          <slot></slot>
        </div>
      </transition-list>
      <div v-if="showSlots('footer')" :class="[footerClass, layout === 'default' ? 'footer' : '']">
        <slot name="footer"></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import TuiEditor from '@toast-ui/editor'
  import { CSSProperties, defineComponent } from 'vue'

  type CardLayoutType = 'default' | 'shadow'
  type ToolTipsType = {
    effect?: string
    content: string
    rawContent?: boolean
    placement?:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end'
  }
  type CardType = 'default' | 'markdown' | 'wysiwyg'

  export default defineComponent({
    props: {
      type: {
        type: String as PropType<CardType>,
        default: 'default'
      },
      header: {
        type: String,
        default: ''
      },
      bodyStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
      },
      headerClass: {
        type: String,
        default: ''
      },
      bodyClass: {
        type: String,
        default: ''
      },
      footerClass: {
        type: String,
        default: ''
      },
      collapse: {
        type: Boolean,
        default: false
      },
      shadow: {
        type: String as PropType<'always' | 'hover' | 'never'>,
        default: 'always'
      },
      size: {
        type: String as PropType<'small' | 'default' | 'large'>,
        default: 'default'
      },
      tips: {
        type: [String, Object] as PropType<string | ToolTipsType>,
        default: ''
      },
      layout: {
        type: String as PropType<CardLayoutType>,
        default: 'default'
      },
      tipsIcon: {
        type: String,
        default: 'ep:info-filled'
      }
    },
    setup(_props, { slots }) {
      const showSlots = (name: string): boolean => {
        const slot = slots[name]
        return !!(slot && slot())
      }

      const [isCollapse, toggle] = useToggle(true)

      const bodyContent = ref()
      var content = [
        '![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)',
        '',
        '# Awesome Editor!',
        '',
        'It has been _released as opensource in 2018_ and has ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.',
        '',
        '## Create Instance',
        '',
        'You can create an instance with the following code and use `getHtml()` and `getMarkdown()` of the [Editor](https://github.com/nhn/tui.editor).',
        '',
        '```js',
        'const editor = new Editor(options);',
        '```',
        '',
        '> See the table below for default options',
        '> > More API information can be found in the document',
        '',
        '| name | type | description |',
        '| --- | --- | --- |',
        '| el | `HTMLElement` | container element |',
        '',
        '## Features',
        '',
        '* CommonMark + GFM Specifications',
        '   * Live Preview',
        '   * Scroll Sync',
        '   * Auto Indent',
        '   * Syntax Highlight',
        '        1. Markdown',
        '        2. Preview',
        '',
        '## Support Wrappers',
        '',
        '> * Wrappers',
        '>    1. [x] React',
        '>    2. [x] Vue',
        '>    3. [ ] Ember'
      ].join('\n')

      onMounted(() => {
        console.log(bodyContent.value.textContent.split('\n'))

        TuiEditor.factory({
          el: bodyContent.value,
          viewer: true,
          initialValue: content //bodyContent.value.innerHTML
        })
      })

      return {
        bodyContent,
        showSlots,
        isCollapse,
        toggle
      }
    }
  })
</script>
<style lang="scss" scoped>
  .no-header {
    :deep(.el-card__header) {
      padding: 0;
    }
  }

  .inline {
    @apply inline-flex;
  }

  .header {
    @apply flex justify-between items-center;
  }

  .footer {
    @apply p-4;

    border-top: 1px solid var(--el-card-border-color);
  }

  .card-small {
    // @apply text-sm;
    :deep(.el-card__header) {
      @apply p-2;
    }

    :deep(.el-card__body) {
      @apply p-2;
    }
  }

  .card-large {
    // @apply text-sm;
    :deep(.el-card__header) {
      @apply p-6;
    }

    :deep(.el-card__body) {
      @apply p-6;
    }
  }
</style>
