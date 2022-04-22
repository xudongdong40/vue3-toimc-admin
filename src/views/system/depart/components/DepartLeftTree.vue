<template>


  <el-card class="box-card border-none" style="height: 100%;">
    <div class="flex" style="margin-bottom: 8px;">
      <el-button type="primary" @click="onAddDepart">新增</el-button>
      <el-button type="primary" style="margin-right: 8px;" @click="onAddChildDepart(modelParentId)">添加下级</el-button>
      <el-dropdown v-if="checkedKeys.length > 0">
        <el-button>批量操作</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item key="1" @click="onDeleteBatch">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 选中提示信息 -->
    <el-alert show-icon type="info" :closable="false" style="margin-bottom: 8px;">
      <template #default>
        <template v-if="checkedKeys.length > 0">
          <span>已选中 {{ checkedKeys.length }} 条记录</span>
          <a-divider type="vertical" />
          <a @click="checkedKeys = []">清空</a>
        </template>
        <template v-else>
          <span>未选中任何数据</span>
        </template>
      </template>
    </el-alert>
    <!-- 部门树节点 -->
    <div v-loading="loading">
      <el-input v-model="filterText" placeholder="按部门名称搜索…" style="margin-bottom: 10px" />
      <!--组织机构树-->
      <!-- default-expand-all :filter-node-method="filterNode"  -->
      <el-tree v-if="!treeReloading" ref="treeRef" class="filter-tree" :data="treeData" :props="defaultProps"
        show-checkbox node-key="id" default-expand-all :filter-node-method="filterNode" @checkChange="onCheckChange"
        @check="check" @nodeClick="nodeClick">

        <!-- @node-contextmenu="onNodeContextmenu" -->

        <template #default="{ node, data }">
          <el-dropdown ref="dropDownRef" trigger="contextmenu" placement="bottom-end">
            <div>
              {{ node.label }}
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="onAddChildDepart(data.id)">添加子级</el-dropdown-item>
                <el-dropdown-item @click="onDelDepart(data)">
                  <span style="color: red;">删除</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>


      </el-tree>
    </div>
    <depart-form-modal :parent-id="modelParentId" :tree-data="treeData" :dialog-form-visible="dialogFormVisible"
      @success="onSuccess" @cancel="onCancel" />
  </el-card>



</template>

<script lang="ts" setup>
// import {reactive, nextTick , ref, unref, watch, defineExpose } from 'vue'
import { ref, unref, watch, defineProps } from 'vue'
import { deleteDepart, deleteBatchDepart } from '@/api/sys/depart'
import DepartFormModal from './DepartFormModal.vue'

const props = defineProps({
  // 部门树列表数据
  treeData: {
    type: Array, default: () => []
  },
  loading: {
    type: Boolean, default: false
  }
})
const emit = defineEmits(['on-add-depart', 'on-add-child-depart', 'on-delete-batch', 'on-node-contextmenu', 'on-node-click'])

const defaultProps = {
  children: 'children',
  label: 'departName',
  value: 'id'
}
const formLabelWidth = '120px'
const dialogFormVisible = ref(false)
const treeReloading = ref<boolean>(false)
const form = ref({})
const checkedKeys = ref([])
const treeKey = ref('')
const visibleTreeKey = ref('')
const treeRef = ref()
const filterText = ref('')



// // 搜索关键字
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const onSuccess = () => {
  dialogFormVisible.value = false
}
const onCancel = () => {
  dialogFormVisible.value = false
}


//树节点点击事件 三个参数：对应于节点点击的节点对象， TreeNode 节点  属性，事件 对象
const nodeClick = (node: any, attr: any, event: any) => {
  console.log('树节点点击事件', node, attr, event)
  modelParentId.value = node.id
  emit('on-node-click', node)
}
// 树节点选中变化事件
const onCheckChange = (checkedKeys: any, { node }: any) => {
  console.log('树节点选中变化事件', checkedKeys, node)
}
// 树节点右点击事件
const onNodeContextmenu = (event: any, node: any) => {
  console.log('树节点右点击事件', event, node)
}

//check 事件 传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象
const check = (data: any, checked: any) => {
  console.log('check ', data, checked)
  checkedKeys.value = checked.checkedKeys

}

const onDelDepart = (node) => {
  console.log('删除部门', node)
  ElMessageBox.confirm(
    '确定要删除吗？',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      let data = {
        lds: node.id
      }
      deleteBatchDepart(data).then(res => {
        console.log(res)
        ElMessage({
          type: 'success',
          message: res.message
        })
      })


    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
// 批量删除所选节点
const onDeleteBatch = () => {
  deleteBatchDepart({ ids: checkedKeys.value.join(',') }).then((res) => {
    // loadRootTreeData()
    ElMessage({
      type: 'success',
      message: res.message
    })
  })
}
// 添加部门
const onAddDepart = () => {
  modelParentId.value = ''
  dialogFormVisible.value = true
}
// 添加子级部门
const modelParentId = ref('')
const onAddChildDepart = (parentId: any) => {
  console.log('==添加子级部门===', parentId)
  modelParentId.value = parentId || ''
  dialogFormVisible.value = true
}
const onEditDepart = (dataRef: any) => {
  dialogFormVisible.value = true
}
const onVisibleChange = (visible: boolean) => {
  console.log('onVisibleChange visible', visible)
  visibleTreeKey.value = ''
}
const filterNode = (value: string, data: any) => {
  if (!value) return true
  console.log('data', data.departName)
  console.log('value', value)
  return data.departName.includes(value)
}    
</script>
