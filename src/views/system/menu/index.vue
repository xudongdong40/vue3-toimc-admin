<template>
  <div class="p-4">
    <div class="flex">
      <el-button type="primary" icon="Plus" @click="addMenu"> 新增菜单</el-button>
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
          <el-icon v-if="scope.row.icon" :name="scope.row.icon"><box /></el-icon>
          <span v-else class="iconify m-auto" data-icon="null"></span>
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
                <el-dropdown-item :command="{ index: 0, row: scope.row }"
                  >添加下级</el-dropdown-item
                >
                <el-dropdown-item :command="{ index: 1, row: scope.row }">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <menu-drawer
      :show-drawer="data.showDrawer"
      :obj="data.obj"
      :menus="data.menuALL"
      :is-update="data.isUpdate"
      @on-confirm="onConfirm"
      @close="data.showDrawer = false"
    ></menu-drawer>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import MenuDrawer from './MenuDrawer.vue'
  import { getMenuList, saveOrUpdateMenu, deleteMenu } from '@/api/sys/menu'
  import { MenuItem } from '@/api/sys/model/menuModel'
  export default defineComponent({
    name: 'MenusPage',
    components: {
      MenuDrawer
    },
    setup() {
      let data = reactive({
        isUpdate: false,
        showDrawer: false,
        obj: {},
        menuALL: [] as MenuItem[]
      })
      const multipleSelection = ref<Array<MenuItem>>([])
      const tableData = ref<Array<MenuItem>>([])

      const handleCommand = (command: string | number | object) => {
        ElMessage(`click on item ${command}`)
      }

      interface MenuCommand {
        index: 0
        row: MenuItem
      }
      const handleMoreCommand = (command: MenuCommand) => {
        if (command.index == 0) {
          console.log('click add item ', command)
          //添加下级
          ;(data.isUpdate = false), (data.showDrawer = true) // 显示抽屉
          data.obj = {
            parentId: command.row.id,
            parentName: command.row.name,
            menuType: 1,
            route: true,
            permsType: '1',
            status: '1'
          }
        } else {
          //删除
          console.log('click on del item ', command)

          deleteMenu({ id: command.row.id }).then((res) => {
            const { message } = res as HttpResponse
            ElMessage({
              message: `${message}` || '删除成功',
              type: 'error'
            })
          })
        }
      }
      const handleSelectionChange = (val: Array<MenuItem>) => {
        // todo 菜单联动效果
        // console.log('🚀 ~ file: index.vue ~ line 155 ~ handleSelectionChange ~ val', val)
        multipleSelection.value = val
      }
      const addMenu = () => {
        ;(data.isUpdate = false), (data.showDrawer = true) // 显示抽屉
        data.obj = { menuType: 0, route: true, permsType: '1', status: '1' }
      }
      const onConfirm = (obj: any) => {
        console.log('onConfirm obj is:', obj)
        data.showDrawer = false
        saveOrUpdateMenu(obj, data.isUpdate).then((res) => {
          const { message } = res as HttpResponse
          ElMessage({
            message: `${message}` || '保存成功',
            type: 'error'
          })
        })
      }
      const handleEdit = (row: MenuItem) => {
        // ElMessage(`编辑 ${row.name}`)
        data.isUpdate = true
        data.showDrawer = true
        data.obj = row
      }
      // 取消全选
      const toggleSelection = () => {
        multipleSelection.value = []
      }

      onMounted(() => {
        console.log('onMounted')
        // console.log("onMounted",http)
        getMenuList()
          .then((res: any) => {
            tableData.value = res.data || []
            data.menuALL = res.data || []
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
        data,
        addMenu,
        onConfirm,
        handleSelectionChange,
        handleCommand,
        handleMoreCommand,
        handleEdit,
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

  span.iconify {
    display: block;
    width: 1em;
    height: 1em;
    background-color: #5551;
    border-radius: 100%;
  }
</style>
