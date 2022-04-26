<template>
  <div class="header">
    <el-row class="pt-3 pb-1" align="middle">
      <el-col :span="8" class="overflow-ellipsis">
        <span class="text-lg font-bold">{{ pageTitle }}</span>
      </el-col>
      <el-col :span="16" class="flex justify-end items-center">
        <el-button type="primary">主操作</el-button>
        <el-button>操作一</el-button>
        <el-button type="danger">操作二</el-button>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="详情" name="details" />
      <el-tab-pane label="规则" name="rules" />
      <el-tab-pane label="评价" name="appraise" />
    </el-tabs>
  </div>
  <el-divider />
  <t-card>
    <descriptions
      :items="infoSchema"
      :border="false"
      :collapse="false"
      :column="2"
    />
  </t-card>
</template>

<script lang="ts">
  import { ref } from 'vue'
  import { defineComponent } from 'vue'
  import { DescItem } from '@/components/Descriptions/types'
  import Mock from 'mockjs'

  export default defineComponent({
    setup() {
      const pageTitle = `单号：${Mock.mock({ lable: /\d{10}/ }).lable}`
      const activeName = ref('details')

      const infoSchema: DescItem[] = Mock.mock({
        list: [
          {
            label: '创建人：',
            field: /\d{10}/
          },
          {
            label: '订购产品：',
            'field|1': [ '手机', '电脑', '平板电脑', '蓝牙音箱' ]
          },
          {
            label: '创建时间：',
            field: '2022-01-22'
          },
          {
            label: '关联单据：',
            field: {
              link: 'javascript: void(0)',
              text: /\d{6}/
            }
          },
          {
            label: '生效日期：',
            field: '2022-01-23 ~ 2022-02-23'
          },
          {
            label: '备注：',
            field: '无'
          }
        ]
      }).list

      return {
        pageTitle,
        activeName,
        infoSchema
      }
    }
  })
</script>

<style scoped lang="scss">
  .header {
    width: 100%;
    padding: 10px 20px 0;
    background-color: #fff;
  }
  .el-card {
    &:last-child {
      margin-bottom: 40px;
    }
  }
</style>
