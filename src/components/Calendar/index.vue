<template>
  <el-calendar ref="calendar" v-model="localValue">
    <template #header="slotScope">
      <div v-if="!hasHeader" class="w-full flex justify-between items-center">
        <div>
          {{ slotScope.date }}
        </div>
        <el-button-group v-if="showTool">
          <el-button
            v-for="(item, index) in toolList"
            :key="'tool' + index"
            @click="selectDate(item)"
          >
            {{ defaultTools[item] }}
          </el-button>
        </el-button-group>
      </div>
      <slot name="header" :date="slotScope.date"></slot>
    </template>
    <template #dateCell="{ data }">
      <div class="h-full" @click="handleCellClick(data)">
        <h3>{{( solar2lunar(data.day)as any).cDay }}</h3>
        <h5>
          {{ ( solar2lunar(data.day)as any).IDayCn }}
          <span>
            {{ ( solar2lunar(data.day)as any).gzDay }}
            {{ ( solar2lunar(data.day)as any).astro }}
          </span>
        </h5>
      </div>
    </template>
  </el-calendar>
</template>

<script lang="ts">
  import dayjs from 'dayjs'
  import { solar2lunar } from '@/utils/calendar'

  const defaultTools = {
    'prev-year': '上一年',
    'prev-month': '上一月',
    today: '今天',
    'next-month': '下一月',
    'next-year': '下一年'
  }

  type IToolType = keyof typeof defaultTools

  export default defineComponent({
    name: 'Calendar',
    props: {
      showTool: {
        type: Boolean,
        default: true
      },
      toolList: {
        type: Array as PropType<IToolType[]>,
        default: () => ['prev-year', 'prev-month', 'today', 'next-month', 'next-year']
      },
      value: {
        type: Date,
        default: new Date()
      }
    },
    emits: ['cell-click', 'update:value'],
    setup(props, ctx) {
      const calendar = ref<any>(null)
      // 设置日历的值
      const selectDate = (val: IToolType) => calendar.value.selectDate(val)
      // 判断是否有头部
      const hasHeader = computed(() => (ctx.slots.header ? true : false))
      // 点击单元格的回调
      const handleCellClick = (data) => ctx.emit('cell-click', data)

      const localValue = computed({
        get() {
          return props.value
        },
        set(value) {
          ctx.emit('update:value', value)
        }
      })

      return {
        defaultTools,
        calendar,
        dayjs,
        selectDate,
        solar2lunar,
        hasHeader,
        handleCellClick,
        localValue
      }
    }
  })
</script>

<style lang="scss" scoped>
  .el-calendar {
    &-day {
      h5 {
        span {
          float: right;
          font-size: 12px;
          font-weight: normal;
        }
      }
    }
  }
</style>
