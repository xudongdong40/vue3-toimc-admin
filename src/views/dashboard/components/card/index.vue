<template>
  <t-card
    :class="{
      'dashboard-card': true,
      'no-border': haveBorder,
      'hover-shadow': hoverShadow,
    }"
    :body-style="{ ...bodyStyle, height: '100%' }"
    shadow="never"
  >
    <span class="dashboard-title">{{title}}</span>
    <div class="dashboard-content">
      <count-to
        ref="ctrl1"
        :end-val="data.end"
        :start-val="data.begin"
        :decimals="data.dot"
        :duration="data.duration"
        :autoplay="data.auto"
        :prefix="data.prefix"
        :suffix="data.suffix"
      />
      <div class="icon-back">
        <i><svg viewBox="0 0 1024 1024" width="40" height="40"><path d="M512 96c229.76 0 416 186.24 416 416S741.76 928 512 928 96 741.76 96 512 282.24 96 512 96z m0 64C317.589333 160 160 317.589333 160 512S317.589333 864 512 864 864 706.410667 864 512 706.410667 160 512 160z m105.386667 117.034667l45.226666 45.248-136.661333 136.682666H682.666667v64h-138.666667v81.941334H682.666667v64h-138.666667v100.8h-64v-100.8H341.333333v-64h138.666667v-81.941334H341.333333v-64h156.714667l-136.682667-136.682666 45.269334-45.226667L512 382.4l105.386667-105.386667z" fill="#1890ff"></path></svg></i>
      </div>
    </div>
    <div class="dashboard-footer">
      <span>
        自上周以来
      </span>
      <i style="margin: 0 5px"><svg viewBox="0 0 1024 1024" version="1.1" width="18" height="18"><path d="M511.976976 945.959599c-239.47514 0-433.597349-194.300264-433.597349-433.964716 0-239.677754 194.122209-433.955506 433.597349-433.955506s433.642374 194.277752 433.642374 433.955506C945.61935 751.659335 751.453139 945.959599 511.976976 945.959599zM666.05312 408.869155l-131.822304-132.292002c-2.899026-4.303003-7.091512-7.870248-12.509918-9.766434-2.876514-1.137916-5.952572-1.64957-9.119705-1.582031-0.222057 0-0.401136-0.112564-0.623193-0.112564-0.289596 0-0.535189 0.13303-0.847298 0.156566-3.03308-0.044002-6.021134 0.423649-8.830109 1.515516-5.507434 1.918699-9.787924 5.528923-12.664438 9.945513L357.945857 408.869155c-9.275247 9.29776-8.562003 25.061792 1.560542 35.184337 10.168594 10.146081 25.463951 10.413164 34.739199 1.11438 0.73678-0.735757 1.471514-1.248434 2.073218-2.073218l89.747024-89.456405 0.245593 399.136489c-0.155543 0.936325 0 1.783623 0 2.76395 0 12.352329 10.992355 22.342868 25.352411 22.342868 14.314007 0 25.976628-9.990538 25.976628-22.342868l0.289596-401.923976 89.771583 89.478917c0.599657 0.825808 1.335415 1.337461 2.049682 2.073218 9.29776 9.29776 24.595164 9.030677 34.740222-1.11438C674.615123 433.930947 675.351903 418.166915 666.05312 408.869155z" fill="#ffffff"></path></svg></i>
      <span>12%</span>
    </div>
  </t-card>
</template>

<script lang="ts">
  import { CSSProperties, defineComponent } from 'vue'
  import Mock from 'mockjs'

  export default defineComponent({
    name: 'DashboardCard',
    props: {
      title: {
        type: String,
        default: ''
      },
      haveBorder: {
        type: Boolean,
        default: true
      },
      hoverShadow: {
        type: Boolean,
        default: true
      },
      bodyStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
      }
    }, 
    setup() {
      const data = reactive(Mock.mock({
        begin: 0,
        end: '@float(100, 50000, 2, 2)',
        duration: 5000,
        dot: 2,
        auto: true,
        breakAll: true,
        prefix: '￥',
        suffix: ''
      }))
      return {
        data
      }
    }
  })
</script>

<style scoped lang="scss">
.dashboard-card {
  width: 25%;
  margin: 0 10px;
  background-color: transparent;
  box-sizing: border-box;
  ::v-deep .el-card {
    height: 100%;
  }
}
.no-border {
  ::v-deep .el-card {
    border: none ;
  }
}
.hover-shadow {
  &:hover {
    transition: all .3s;
    box-shadow: 0 0 15px rgb(202, 202, 202);;
  }
}
.dashboard-title {
  font-size: 0.9rem;
}
.dashboard-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  .icon-back {
    width: 4rem;
    height: 4rem;
    background-color: #e8f4ff;
    border-radius: 50%;
    color: #1890ff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }
}
.dashboard-footer {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}
</style>
