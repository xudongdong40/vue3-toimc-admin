<template>
  <router-view v-slot="{ Component, route }">
    <transition
      mode="out-in"
      :name="transitionName"
      :style="{
        '--transition-delay':
          typeof transitionDelay === 'string' ? transitionDelay : transitionDelay + 's'
      }"
    >
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script lang="ts">
  import { useSettingsStore } from '@/store/modules/settings'

  import { toLine } from '@/utils'

  export default defineComponent({
    setup() {
      const store = useSettingsStore()

      return {
        transitionName: computed(() => toLine(store.$state.transitionName + 'Transition')),
        transitionDelay: computed(() => store.$state.transitionDelay)
      }
    }
  })
</script>

<style scoped></style>
