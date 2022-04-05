<template>
  <el-drawer v-model="showDrawer" :title="getTitle" :direction="direction">
    <!-- <template #title>
      <h4>set title by slot</h4>
    </template> -->
    <template #default>
      <div> 表单项 </div>
    </template>
    <template #footer>
      <div style="flex: auto;">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @ok="handleSubmit">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import { ElMessageBox } from 'element-plus'
  export default defineComponent({
    setup() {
      //获取弹窗标题
      const getTitle = '新增菜单'
      const showDrawer = ref(true)
      const direction = ref('rtl')
      function cancelClick() {
        showDrawer.value = false
      }
      function handleSubmit() {
        ElMessageBox.confirm('Are you confirm  ?')
          .then(() => {
            showDrawer.value = false
          })
          .catch(() => {
            // catch error
          })
      }

      return { showDrawer, getTitle, direction, cancelClick, handleSubmit }
    }
  })
</script>
<style scoped></style>
