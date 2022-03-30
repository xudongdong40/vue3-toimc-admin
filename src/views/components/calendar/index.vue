<template>
  <div class="p-4">
    <el-card class="mb-2" shadow="false">
      <div class="flex items-center justify-between">
        <div class="inline-block">
          <span>外部控制：</span>
          <el-button-group>
            <el-button type="primary" icon="arrow-left" @click="setDate(1, 'day')"
              >减少一天</el-button
            >
            <el-button type="primary" @click="setDate(-1, 'day')"
              >增加一天<el-icon class="el-icon--right"><ArrowRight /></el-icon
            ></el-button>
          </el-button-group>
        </div>
        <div class="inline-block">
          <span>当前时间：</span>
          {{ value }}
        </div>
      </div>
    </el-card>
    <calendar v-model:value="value" :tool="[]" @cell-click="onCellClick"> </calendar>
  </div>
</template>

<script>
  import { ElMessage } from 'element-plus'
  import dayjs from 'dayjs'
  export default defineComponent({
    name: 'CalendarPage',
    setup() {
      // 监听单元格点击事件
      const onCellClick = (val) => ElMessage.success(`当前选中日期为：${val.date}`)
      const value = ref(new Date())

      const setDate = (val, type) => (value.value = dayjs(value.value).add(val, type).toDate())

      return {
        onCellClick,
        value,
        setDate
      }
    }
  })
</script>

<style lang="scss" scoped></style>
