<template>
  <t-card>
    <descriptions
      title="退款申请"
      :items="infoSchema"
      :border="false"
      :collapse="false"
    />
  </t-card>
  <el-divider />
  <t-card>
    <descriptions
      title="用户信息"
      :items="userSchema"
      :border="false"
      :collapse="false"
    />
  </t-card>
  <el-divider />
  <el-card header="退货商品">
    <el-table :data="tableData" stripe style="width: 100%;" table-layout="auto">
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop ? item.prop : ''"
        :align="item.align ? item.align : 'left'"
        :label="item.lable ? item.lable : ''"
        :width="item.width ? item.width : ''"
      >
        <template v-if="item.type === 'link'" #default="scope">
          <el-link type="primary" :underline="false">{{ scope.row.code }}</el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-divider />
  <el-card header="退货进度">
    <el-table :data="tableData2" stripe style="width: 100%;" table-layout="auto">
      <el-table-column
        v-for="(item, index) in columns2"
        :key="index"
        :prop="item.prop ? item.prop : ''"
        :align="item.align ? item.align : 'left'"
        :label="item.lable ? item.lable : ''"
      >
        <template v-if="item.type === 'status'" #default="scope">
          <span><icon style="vertical-align: middle;" type="SuccessFilled" color="green" /> {{ scope.row.status }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { DescItem } from '@/components/Descriptions/types'

  export default defineComponent({
    setup() {
      const infoSchema: DescItem[] = [
        {
          label: '取货单号：',
          field: '1000000000'
        },
        {
          label: '状态：',
          field: '已取货'
        },
        {
          label: '销售单号：',
          field: '1234123421'
        },
        {
          label: '子订单：',
          field: '3214321432'
        }
      ]

      const userSchema: DescItem[] = [
        {
          label: '用户姓名',
          field: 'toimc'
        },
        {
          label: '联系电话',
          field: '18188888888'
        },
        {
          label: '常用快递',
          field: '菜鸟仓储'
        },
        {
          label: '取货地址',
          field: '北京市朝阳区XX路18号'
        },
        {
          label: '备注',
          field: '无'
        }
      ]

      const tableData = [
        {
          code: '123456001',
          name: '矿泉水550ml',
          barcode: '12421432143214321',
          price: '2.00',
          quantity: '1',
          amount: '2'
        },
        {
          code: '123456002',
          name: '矿泉水550ml',
          barcode: '12421432143214322',
          price: '2.00',
          quantity: '3',
          amount: '6'
        },
        {
          code: '123456003',
          name: '矿泉水550ml',
          barcode: '12421432143214323',
          price: '2.00',
          quantity: '2',
          amount: '4'
        },
        {
          code: '总计',
          name: '',
          barcode: '',
          price: '',
          quantity: '6',
          amount: '12'
        }
      ]

      const columns = [
        {
          lable: '商品编号',
          align: 'center',
          type: 'link'
        },
        {
          prop: 'name',
          lable: '商品名称',
          align: 'center'
        },
        {
          prop: 'barcode',
          lable: '商品条码',
          align: 'center'
        },
        {
          prop: 'price',
          lable: '单价',
          align: 'center'
        },
        {
          prop: 'quantity',
          lable: '数量（件）',
          align: 'center',
          width: '150'
        },
        {
          prop: 'amount',
          lable: '金额',
          align: 'center'
        }
      ]

      const tableData2 = [
        {
          time: '2022-10-12 16:15',
          progress: '联系客户',
          status: '进行中',
          userId: '取货员 ID1234',
          useTime: '5mins'
        },
        {
          time: '2022-10-12 16:15',
          progress: '取货员出发',
          status: '成功',
          userId: '取货员 ID1234',
          useTime: '5mins'
        },
        {
          time: '2022-10-12 16:15',
          progress: '取货员接单',
          status: '成功',
          userId: '系统',
          useTime: '5mins'
        },
        {
          time: '2022-10-12 16:15',
          progress: '申请审批通过',
          status: '成功',
          userId: '用户',
          useTime: '1h'
        }
      ]
      
      const columns2 = [
        {
          prop: 'time',
          lable: '时间',
          align: 'center'
        },
        {
          prop: 'progress',
          lable: '当前进度',
          align: 'center'
        },
        {
          lable: '状态',
          align: 'center',
          type: 'status'
        },
        {
          prop: 'userId',
          lable: '操作员ID',
          align: 'center'
        },
        {
          prop: 'useTime',
          lable: '耗时',
          align: 'center'
        }
      ]

      return {
        infoSchema,
        userSchema,
        tableData,
        columns,
        tableData2,
        columns2
      }
    }
  })
</script>

<style scoped lang="scss">
  .el-card {
    &:last-child {
      margin-bottom: 40px;
    }
  }
</style>
