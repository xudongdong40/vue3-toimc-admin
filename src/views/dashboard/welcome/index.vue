<template>
  <div class="p-4">
    <t-card header="">
      <el-row>
        <el-col :span="2">
          <el-avatar :src="header" :size="64"></el-avatar>
        </el-col>
        <el-col :span="18">
          <el-row class="font-bold text-xl text-gray-600"
            >{{ hiMorning }}{{ store.userInfo.username }}，{{ randomCtsen }}
          </el-row>
          <el-row class="text-gray-400 text-sm pt-1 flex-col">
            <p>最近更新：1.0正式版本发布~</p>
            <p
              >欢迎使用！<el-link
                type="primary"
                :underline="false"
                href="https://github.com/toimc-team/vue-toimc-admin"
                >仓库地址
              </el-link>
            </p>
          </el-row>
        </el-col>
        <el-row :span="4" class="flex-col items-center">
          <avatar-list :images="images" :gutter="10" direction="horizontal"></avatar-list>
          <p class="text-sm text-gray-300 pt-2">项目核心贡献者们</p>
        </el-row>
      </el-row>
    </t-card>
    <div class="w-full grid grid-cols-2 gap-2 pt-3">
      <t-card header="开源项目信息" :tips="{ content: '版本统计', placement: 'top' }">
        <template #suffix>
          <el-tag type="">最后构建时间：{{ lastBuildTime }}</el-tag>
        </template>
        <descriptions :column="2" title="" :items="infoSchema" :collapse="false"></descriptions>
      </t-card>
      <div class="grid grid-cols-2">
        <t-card
          header="下载量"
          reverse
          :tips="true"
          footer-class="!px-0 pt-1 text-sm text-gray-500"
        >
          <template #tips>
            <icon icon="ant-design:bar-chart-outlined" class="mr-1" :size="'22px'"></icon>
          </template>
          <template #suffix>
            <el-tag type="success">日</el-tag>
          </template>
          <v-charts
            ref="rends"
            type="LineChart"
            :options="lineOptions"
            :style="{ height: '150px' }"
            class="pb-2"
          >
          </v-charts>
          <template #footer>
            <div class="flex justify-between">
              <span>总量：{{ totalTrends }}</span>
              <span>日均：{{ Math.floor(totalTrends / 5) }}</span>
            </div>
          </template>
        </t-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import header from '@/assets/images/brian.jpg'
  import dayjs from 'dayjs'
  import { useUserStore } from '@/store/modules/user'
  import { random } from 'lodash-es'
  import { DescItem } from '@/components/Descriptions/types'
  import * as echarts from 'echarts'

  const modules = import.meta.globEager('@/assets/images/headers/**/*.jpeg')

  export default defineComponent({
    setup() {
      const images = ref([] as string[])
      const arr = [
        '又是元气满满的一天哦~',
        '今天也要加油哦~',
        '加油！',
        '开心每一天~',
        '快乐每一天~'
      ]

      const store = useUserStore()
      const rends = ref()
      const timer = ref()

      const { pkg, lastBuildTime } = __APP_INFO__

      Object.keys(modules).forEach((key) => {
        const mod = modules[key].default || ''
        images.value.push(mod)
      })

      const hiMorning = computed(() => (dayjs().format('A') === 'AM' ? '早上好' : '下午好'))

      // 下载量
      const lineOptions = ref<any>({
        tooltip: {
          trigger: 'axis',
          extraCssText: 'z-index:1'
        },
        grid: {
          top: '5%',
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '访问量',
            type: 'line',
            data: [],
            smooth: true,
            areaStyle: {},
            itemStyle: {
              borderRadius: [0, 5, 5, 0],
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                ['#3DD572', '#3A9efd'].map((color, offset) => ({
                  color,
                  offset
                }))
              )
            }
          }
        ]
      })

      onMounted(() => {
        const base = +new Date(2022, 1, 1)
        const oneDay = 24 * 3600 * 1000
        const date = [] as string[]

        const data = [Math.random() * 1500]
        let now = new Date(base)

        const addData = (shift?: boolean) => {
          const nowStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
          date.push(nowStr)
          data.push(random(20000, 60000))

          if (shift) {
            date.shift()
            data.shift()
          }
          now = new Date(+new Date(now) + oneDay)
          lineOptions.value.xAxis[0].data = []
          lineOptions.value.series[0].data = []
          lineOptions.value.xAxis[0].data = date
          lineOptions.value.series[0].data = data
        }

        for (let i = 1; i < 6; i++) {
          addData()
        }

        rends.value.setOption(lineOptions.value)
        console.log(
          '🚀 ~ file: index.vue ~ line 173 ~ timer.value=setInterval ~ rends.value',
          rends.value
        )

        timer.value = setInterval(() => {
          addData(true)
          rends.value?.setOption(lineOptions.value)
        }, 5000)
      })

      onUnmounted(() => {
        clearInterval(timer.value)
        timer.value = null
      })
      // 下载量 end

      const { dependencies, devDependencies, version } = pkg
      const infoSchema: DescItem[] = [
        {
          label: 'Vue',
          field: dependencies['vue']
        },
        {
          label: 'Vite',
          field: devDependencies['vite']
        },
        {
          label: 'TypeScript',
          field: devDependencies['typescript']
        },
        {
          label: 'Pinia',
          field: dependencies['pinia']
        },
        {
          label: 'Vue Router',
          field: dependencies['vue-router']
        },
        {
          label: 'element-plus',
          field: dependencies['element-plus']
        },
        {
          label: 'windicss',
          field: devDependencies['windicss']
        },
        {
          label: 'vitest',
          field: devDependencies['vitest']
        },
        {
          label: '最新版本',
          field: version
        }
      ]

      return {
        rends,
        header,
        images,
        hiMorning,
        store,
        randomCtsen: arr[Math.floor(Math.random() * arr.length)],
        lineOptions,
        totalTrends: computed(() =>
          Math.floor(lineOptions.value.series[0].data.reduce((prev, cur) => prev + cur, 0))
        ),
        // 构建时间
        lastBuildTime,
        infoSchema
      }
    }
  })
</script>

<style scoped lang="scss"></style>
