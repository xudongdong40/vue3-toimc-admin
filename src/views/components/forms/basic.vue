<template>
  <div class="p-4">
    <el-card header="表单组件基础用法">
      <ul>
        <li>1.使用json配置表单所有内容</li>
        <li>2.表单验证</li>
        <li>3.动态表单</li>
        <li>4.集成第三方组件：富文本，markdown编辑器，扩展性好</li>
      </ul>
      <basic-form :schemas="formBasicSchema"></basic-form>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { FormSchema } from '@/components/Form/types/types'
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      const formBasicSchema: FormSchema[] = [
        {
          component: 'input',
          value: '',
          label: '用户名',
          prop: 'name',
          rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          attrs: {
            placeholder: '请输入用户名'
          }
        },
        {
          component: 'input',
          value: '',
          label: '密码',
          prop: 'password',
          rules: [
            {
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 16,
              message: '密码在6-16位',
              trigger: 'blur'
            }
          ],
          attrs: {
            placeholder: '请输入密码'
          }
        },
        {
          component: 'select',
          value: '',
          prop: 'role',
          label: '角色',
          rules: [
            {
              required: true,
              message: '请选择角色',
              trigger: 'change'
            }
          ],
          attrs: {
            placeholder: '请选择角色'
          },
          children: [
            {
              component: 'option',
              label: '管理员',
              value: 'admin'
            },
            {
              component: 'option',
              label: '用户',
              value: 'user'
            },
            {
              component: 'option',
              label: '测试',
              value: 'test'
            }
          ]
        }
      ]

      return {
        formBasicSchema
      }
    }
  })
</script>

<style scoped></style>
