<template>
  <el-form :label-width="labelWidth" :model="model" :rules="rules" v-bind="$attrs">
    <el-form-item
      v-for="(item, index) in schemas"
      :key="index"
      :prop="item.prop"
      :label="item.label"
    >
      <form-item v-model="model[item.prop]" :item="item.component" v-bind="item.attrs">
        <template v-if="item.children && item.children.length">
          <form-item
            v-for="(child, i) in item.children"
            :key="i"
            :item="child.component"
            :label="child.label"
            :value="child.value"
            v-bind="item.attrs"
          ></form-item>
        </template>
      </form-item>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { toLine } from '@/utils'
  import { FormRules } from 'element-plus'
  import { defineComponent, PropType } from 'vue'
  import { FormSchema } from './types/types'
  import { cloneDeep } from 'lodash'

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
      }
    },
    setup(props) {
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

      return {
        toLine,
        model,
        rules
      }
    }
  })
</script>
