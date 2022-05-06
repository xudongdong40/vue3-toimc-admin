<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    width="800px"
    :close-on-click-modal="false"
    @close="onClose"
  >
    <div class="flex">
      <div style="width: 130px; height: 130px">
        <content />
      </div>
      <div style="width: 130px; height: 130px">
        <content2 />
      </div>
      <div style="width: 130px; height: 130px">
        <content3 />
      </div>
      <div style="width: 130px; height: 130px">
        <content4 />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import content from './content.vue'
  import content2 from './content2.vue'
  import content3 from './content3.vue'

  export default defineComponent({
    props: {
      title: {
        type: String,
        default: '组件设置'
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Content: content,
      Content2: content2,
      content3: content3
    },
    emits: ['update:visible', 'done'],
    setup(_, { emit }) {
      const isShow = ref(false)

      function onUpdateVisible(status: boolean) {
        emit('update:visible', status)
      }

      function onClose() {
        onUpdateVisible(false)
      }

      function reset() {}

      function confirm() {
        onUpdateVisible(false)
        emit('done')
      }

      return {
        isShow,
        onClose,
        reset,
        confirm
      }
    }
  })
</script>

<style scoped></style>
