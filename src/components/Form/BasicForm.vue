<template>
  <el-form
    v-if="model"
    v-bind="$attrs"
    ref="form"
    :label-width="labelWidth"
    :validate-on-rule-change="false"
    :model="model"
    :rules="rules"
  >
    <el-form-item
      v-for="(item, index) in schemas"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :class="item.class"
    >
      <form-item v-model="model" :item="item"></form-item>
    </el-form-item>
    <template v-if="action">
      <slot name="action" :form="form" :model="model" :validate="form && form.validate">
        <div :class="actionClass">
          <el-button type="primary" @click="submitForm">{{ submitText }}</el-button>
          <el-button @click="resetForm">{{ cancelText }}</el-button>
        </div>
      </slot>
    </template>
  </el-form>
</template>

<script lang="ts">
  import type { FormInstance, FormRules } from 'element-plus'
  import { defineComponent, PropType } from 'vue'
  import { FormSchema } from './types/types'
  import { cloneDeep } from 'lodash-es'

  export default defineComponent({
    name: 'DForm',

    props: {
      schemas: {
        type: Array as PropType<FormSchema[]>,
        default: () => [],
        required: true
      },
      labelWidth: {
        type: String as PropType<string>,
        default: '80px'
      },
      action: {
        type: Boolean,
        default: true
      },
      actionClass: {
        type: String,
        default: ''
      },
      submitText: {
        type: String,
        default: '提交'
      },
      cancelText: {
        type: String,
        default: '重置'
      }
    },
    emits: ['change', 'submit', 'reset', 'error'],
    setup(props, { emit }) {
      const form = ref<FormInstance>()

      const rules = ref<FormRules>({
        ...cloneDeep(
          props.schemas.reduce((pre, cur) => {
            pre[cur.prop] = cur.rules
            return pre
          }, {})
        )
      })

      const model = ref<any>({
        ...cloneDeep(
          props.schemas.reduce((pre, cur) => {
            pre[cur.prop] = cur.value
            return pre
          }, {})
        )
      })

      watch(
        () => model,
        () => {
          emit('change', model.value)
        },
        { deep: true }
      )

      const submitForm = () => {
        if (!form.value) return
        // emit('submit', model.value)
        form.value.validate((valid) => {
          if (valid) {
            emit('submit', model.value)
          } else {
            emit('error', model.value)
            return false
          }
        })
      }

      const resetForm = () => {
        if (!form.value) return
        form.value.resetFields()
        emit('reset', model.value)
      }

      return {
        model,
        rules,
        form,
        submitForm,
        resetForm
      }
    }
  })
</script>
