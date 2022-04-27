<template>
  <el-drawer :model-value="show" direction="rtl" size="800px" @close="onClose">
    <template #title>
      <h4 class="divide-y divide-gray-500/50">角色用户 {{ roleId }}</h4>
    </template>
    <template #default>
      <div class="p-4 overflow-auto" style="max-height: 700px; width: 100%">
        <!-- 条件查询 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户账号">
            <el-input v-model="formInline.username" placeholder="请输入用户账号" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="onSubmit">查询</el-button>
            <el-button :icon="Refresh" @click="onRestForm">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="flex mb-2">
          <el-button type="primary" @click="onAddOrEditUser(null)">新增用户</el-button>
          <el-button v-if="multipleSelection.length > 0" @click="onDelUser">取消关联</el-button>
        </div>
        <!-- 用户列表表格数据 -->
        <el-table
          ref="multipleTableRef"
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          border
          align="center"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column property="username" label="用户账号" align="center" />
          <el-table-column property="realname" label="用户姓名" align="center" />
          <el-table-column property="departIds_dictText" label="部门" align="center" />
          <el-table-column property="status_dictText" label="状态" width="80" align="center" />
          <el-table-column label="操作" width="120" align="center">
            <template #default="scope">
              <el-button type="text" size="small" @click="onAddOrEditUser(scope.row)"
                >编辑</el-button
              >
              <el-popconfirm
                title="是否确认取消关联?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="confirmDelEvent(scope.row)"
              >
                <template #reference>
                  <el-button type="text" size="small">取消关联</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <div class="mt-4 flex justify-end">
          <el-pagination
            v-model:currentPage="formData.pageNo"
            background
            :page-size="formData.pageSize"
            layout="prev, pager, next"
            :total="1000"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </template>
  </el-drawer>
  <!-- 添加编辑用户 -->
  <!-- 编辑 新增用户 -->
  <add-or-edit-user
    ref="addOrEditUserRef"
    :show="showAddEditRoleUser"
    :user="userInfo"
    :role-id="roleId"
    @close="showAddEditRoleUser = false"
  >
  </add-or-edit-user>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import { queryRoleUserList, deleteBatchUser } from '@/api/sys/user'
  import { HttpResponse } from '@/api/sys/model/http'
  import { UserItem } from '@/api/sys/model/userModel'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import AddOrEditUser from '../../user/components/AddOrEditUser.vue'

  import { Search, Refresh } from '@element-plus/icons-vue'
  export default defineComponent({
    components: {
      AddOrEditUser
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      //角色ID
      roleId: {
        type: String,
        default: ''
      }
    },
    emits: ['close'],
    setup(props, ctx) {
      const formInline = reactive({
        username: ''
      })
      const userInfo = ref<UserItem>({})
      const loading = ref(false)
      const showAddEditRoleUser = ref(false)
      const multipleSelection = ref<UserItem[]>([])
      const tableData = ref<UserItem[]>([])
      const formData = reactive({
        pageNo: 1,
        pageSize: 10,
        roleId: props.roleId,
        user: formInline.username
      })
      //取消关联用户
      const onDelUser = () => {
        ElMessageBox.confirm('是否取消关联选中数据?', '确认取消关联', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let userCheckIds = multipleSelection.value.map((item) => item.id)
          const data = {
            roleId: props.roleId,
            userIds: userCheckIds.join(',')
          }
          deleteUser(data)
          // ElMessage({
          //   type: 'success',
          //   message: 'Delete completed'
          // })
        })
      }
      // 表格操作区取消关联用户
      const confirmDelEvent = (row) => {
        console.log('scope', row)
        console.log('confirm!')
        const data = {
          roleId: props.roleId,
          userIds: row.id
        }
        deleteUser(data)
      }
      //请求取消关联用户
      const deleteUser = (data) => {
        deleteBatchUser(data).then((res: HttpResponse) => {
          if (res.code === 0) {
            ElMessage({
              type: 'success',
              message: '取消成功'
            })
            //重新查询用户列表
            onSubmit()
          } else {
            ElMessage({
              type: 'error',
              message: res.message
            })
          }
        })
      }

      //条件查询用户
      const onSubmit = () => {
        formData.pageNo = 1
        formData.pageSize = 10
        formData.user = formInline.username
        getTableDatas()
      }
      //查询用户列表
      const getTableDatas = () => {
        formData.roleId = props.roleId
        loading.value = true
        queryRoleUserList(formData).then((res: HttpResponse) => {
          console.log('res', res)
          tableData.value = res.data.records as UserItem[]
          loading.value = false
        })
      }
      // 分页变化
      const handleCurrentChange = (val: number) => {
        formData.pageNo = val
        getTableDatas()
      }
      //重置
      const onRestForm = () => {
        formInline.username = ''
      }

      const handleSelectionChange = (val: UserItem[]) => {
        multipleSelection.value = val
      }

      const onAddOrEditUser = (row) => {
        console.log('editUser')
        if (row) {
          //编辑用户
          userInfo.value = row
        } else {
          userInfo.value = {}
        }
        showAddEditRoleUser.value = true
      }

      // 弹窗关闭
      const onClose = () => {
        ctx.emit('close')
      }

      watch(
        () => props.roleId,
        () => {
          onSubmit()
        },
        {
          immediate: true
        }
      )
      return {
        Search,
        Refresh,
        userInfo,
        loading,
        formInline,
        tableData,
        formData,
        multipleSelection,
        showAddEditRoleUser,
        onAddOrEditUser,
        handleSelectionChange,
        handleCurrentChange,
        confirmDelEvent,
        onSubmit,
        onDelUser,
        onRestForm,
        onClose
      }
    }
  })
</script>
<style scoped lang="scss">
  v-deep .el-drawer__header {
    margin-bottom: 0;
  }
</style>
