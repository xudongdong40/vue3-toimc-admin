<template>
  <div class="p-4">
    <div class="flex mb-2">
      <el-button type="primary" icon="Plus" @click="addRole"> 新增角色</el-button>
    </div>
    <!-- 角色列表 -->
    <basic-table
      ref="tableRef"
      :border="false"
      :data="tableData"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      :default-sort="{ prop: 'date' }"
      height="680px"
    >
      <template #action="{ row }">
        <el-button type="text" @click="findUser(row)">用户</el-button>
        <el-dropdown @command="handleMoreCommand">
          <span class="el-dropdown-link ml-2">
            <el-button type="text"
              >更多<el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </el-button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="{ index: 0, row: row }">授权</el-dropdown-item>
              <el-dropdown-item :command="{ index: 1, row: row }">编辑</el-dropdown-item>
              <el-dropdown-item :command="{ index: 2, row: row }">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </basic-table>
    <!-- 拥有权限 -->
    <has-role :show-drawer="showDrawer" :role-id="roleId" @close="showDrawer = false"></has-role>
    <!-- 添加编辑角色 -->
    <add-role
      :show-dialog="showDialog"
      :is-edit="isEdit"
      :role="editRoleInfo"
      @close="showDialog = false"
      @success="addOrUpdateRoleSuccess"
    ></add-role>
    <!-- 角色用户 -->
    <role-user :show="showRoleUser" :role-id="roleId" @close="showRoleUser = false"></role-user>
  </div>
</template>

<script lang="ts">
  import { HttpResponse } from '@/api/sys/model/http'
  import { ColumnOptions, PaginationProps } from '@/components/Table/types'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { queryRoleList, deleteRole } from '@/api/sys/role'
  import { RoleItem } from '@/api/sys/model/roleModel'
  import { defineComponent } from 'vue'
  import HasRole from './components/HasRole.vue'
  import AddRole from './components/AddRole.vue'
  import RoleUser from './components/RoleUser.vue'

  export default defineComponent({
    components: {
      HasRole,
      AddRole,
      RoleUser
    },
    setup() {
      const tableRef = ref()
      const tableData = ref<RoleItem[]>([])
      const roleId = ref<string>('')

      // table 数据正在加载
      const loading = ref(true)
      // 是否显示侧边授权列表
      const showDrawer = ref(false)
      // 是否显示新增角色弹窗
      const showDialog = ref(false)
      // 是否显示角色用户
      const showRoleUser = ref(false)
      // 是否编辑
      const isEdit = ref(false)
      // 编辑角色信息
      const editRoleInfo = ref<RoleItem>({})

      const columns = [
        {
          type: 'selection',
          align: 'center'
        },
        {
          label: '角色编码',
          prop: 'roleCode',
          align: 'center'
        },
        {
          label: '角色名称',
          prop: 'roleName',
          align: 'center'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          align: 'center',
          attrs: {
            sortable: true
          }
        },
        {
          label: '操作',
          slot: 'action',
          align: 'center'
        }
      ] as ColumnOptions[]

      const pagination: PaginationProps = {
        total: 100
      }
      // 查询角色列表
      const getTableList = () => {
        loading.value = true
        queryRoleList().then((res: HttpResponse) => {
          loading.value = false
          if (res.code === 0) {
            tableData.value = res.data.records as RoleItem[]
          } else {
            ElMessage.error(res.message)
          }
        })
      }
      getTableList()
      //新增角色
      const addRole = () => {
        editRoleInfo.value = {}
        isEdit.value = false
        showDialog.value = true
      }
      // 添加修改角色成功
      const addOrUpdateRoleSuccess = () => {
        getTableList()
      }
      //查询用户
      const findUser = (role) => {
        roleId.value = role.id
        showRoleUser.value = true
        console.log('findUser', role)
      }

      interface MenuCommand {
        index: number
        row: RoleItem
      }
      //更多操作
      const handleMoreCommand = (command: MenuCommand) => {
        switch (command.index) {
          case 0:
            //授权
            console.log('授权', command.row)
            showDrawer.value = true
            break
          case 1:
            //编辑
            editRoleInfo.value = command.row
            isEdit.value = true
            showDialog.value = true
            console.log('编辑', command.row)
            break
          case 2:
            //删除
            console.log('删除', command.row)
            ElMessageBox.confirm('确定删除吗？', '温馨提示')
              .then(() => {
                deleteRole({ id: command.row.id }).then((res: HttpResponse) => {
                  ElMessage({
                    message: `${res.message}`,
                    type: 'error'
                  })
                })
              })
              .catch(() => {
                // 取消
              })
            break
          default:
            break
        }
      }

      return {
        loading,
        tableRef,
        columns,
        tableData,
        pagination,
        roleId,
        showDrawer,
        showRoleUser,
        showDialog,
        isEdit,
        editRoleInfo,
        addRole,
        addOrUpdateRoleSuccess,
        getTableList,
        findUser,
        handleMoreCommand
      }
    }
  })
</script>

<style scoped></style>
