<template>
  <div class="p-4">
    <div class="flex">
      <el-button type="primary" icon="Plus"> 新增菜单</el-button>
      <el-dropdown
        v-if="multipleSelection.length > 0"
        style="margin-left: 5px;"
        trigger="click"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <el-button plain icon=""
            >批量操作
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="del">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="info flex items-center content-center">
      <el-icon class="mr-1 block" color="#409EFF"><info-filled /></el-icon>
      <p class="border-gray-500">
        <span v-if="multipleSelection.length > 0"
          >已选中 {{ multipleSelection.length }} 条记录 |
          <span class="cursor-pointer" @click="toggleSelection()">清空</span></span
        >
        <span v-else>未选中任何数据</span>
      </p></div
    >
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      border
      stripe
      style="width: 100%;"
      lazy
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="55" />
      <el-table-column property="name" label="菜单名称" min-width="200"> </el-table-column>
      <el-table-column property="菜单类型" label="菜单类型" min-width="150" align="center">
        <template #default="scope">
          <span v-if="scope.row.menuType == 0">一级菜单</span>
          <span v-else-if="scope.row.menuType == 1">子菜单</span>
          <span v-else-if="scope.row.menuType == 2">按钮/权限</span>
        </template>
      </el-table-column>
      <el-table-column
        property="icon"
        label="图标"
        show-overflow-tooltip
        min-width="50"
        align="center"
      >
        <template #default="scope">
          {{ scope.row.icon }}
          <el-icon><box /></el-icon>
        </template>
      </el-table-column>
      <el-table-column property="component" label="组件" min-width="150" />
      <el-table-column property="url" label="路径" min-width="150" />
      <el-table-column property="sortNo" label="排序" min-width="50" align="center" />
      <el-table-column label="操作" min-width="150" align="center">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-dropdown @command="handleMoreCommand">
            <span class="el-dropdown-link ml-2">
              <el-button type="text"
                >更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">添加下级</el-dropdown-item>
                <el-dropdown-item command="b">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <el-button type="text"  @click="handleDel(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <menu-drawer></menu-drawer>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import MenuDrawer from './MenuDrawer.vue'
  import { getMenuList } from '@/api/sys/menu'
  import { MenuItem } from '@/api/sys/model/menuModel'
  export default defineComponent({
    name: 'MenusPage',
    components: {
      MenuDrawer
    },
    setup() {
      const multipleSelection = ref<Array<MenuItem>>([])
      const tableData = ref<Array<MenuItem>>([])

      const handleCommand = (command: string | number | object) => {
        ElMessage(`click on item ${command}`)
      }
      const handleMoreCommand = (command: string | number | object) => {
        ElMessage(`click on item ${command}`)
      }
      const handleSelectionChange = (val: Array<MenuItem>) => {
        multipleSelection.value = val
      }
      const handleEdit = (row: MenuItem) => {
        ElMessage(`编辑 ${row.name}`)
      }
      const handleDel = (row: MenuItem) => {
        console.log(`删除 ${row.name}`)
        // ElMessage.confirm('确定删除该菜单吗?', () => {
        //   ElMessage.success('删除成功')
        // })
      }
      const toggleSelection = () => {
        multipleSelection.value = []
      }
      //  const getMenuList2 =  () => {
      //    console.log("ddd")
      //   getMenuList().then(res => {
      //     console.log("res",res)
      //     // tableData.value = res.data
      //   }).catch(err => {
      //     console.log("err",err)
      //     ElMessage.error(err)
      //   })

      // }

      onMounted(() => {
        console.log('onMounted')
        // console.log("onMounted",http)
        getMenuList()
          .then((res: any) => {
            tableData.value = res.result || []
          })
          .catch((err) => {
            console.log('err', err)
            ElMessage.error(err)
          })
      })
      onUnmounted(() => {
        console.log('unmount')
      })
      return {
        multipleSelection,
        tableData,
        handleSelectionChange,
        handleCommand,
        handleMoreCommand,
        handleEdit,
        handleDel,
        toggleSelection
      }
    }
  })
</script>
<style lang="scss">
  .info {
    padding: 5px;
    margin: 10px auto;
    color: #333;
    background: #f1f1f1;
  }
</style>
