<template>
  <component
    :is="!group ? 'Transition' : 'TransitionGroup'"
    :name="name"
    :mode="mode"
    :on-before-enter="onBeforeEnter"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
  import { Transition, TransitionGroup } from 'vue'
  import { Mode } from './types'

  export default defineComponent({
    components: {
      Transition,
      TransitionGroup
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      group: {
        type: Boolean as PropType<boolean>,
        default: false
      },
      mode: {
        type: String as PropType<Mode>,
        default: 'in-out'
      },
      origin: {
        type: String as PropType<string>,
        default: 'top center 0'
      }
    },
    setup(props) {
      const onBeforeEnter = (el: HTMLElement) => {
        el.style.transformOrigin = props.origin
      }

      return {
        onBeforeEnter
      }
    }
  })
</script>
