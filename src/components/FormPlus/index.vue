<template>
  <div>
    <el-form ref="form" v-bind="$attrs" :model="dataSource" inline>
      <el-row :gutter="20">
        <el-col v-for="item in schemas" :key="item.key" :span="item.span || 8">
          <el-form-item
            :label="item.label"
            :prop="item.key"
            :label-width="item.labelWidth"
            v-bind="item.itemProps"
          >
            <slot v-if="item.component === 'slot'" :name="item.slotName"></slot>
            <div
              v-else-if="item.component === 'innerText'"
              class="wrapper"
              :class="item.innerClass"
              :style="item.style"
            >
              {{ item.innerText || dataSource[item.key] }}
            </div>
            <div v-else class="wrapper">
              <div v-if="item.before" class="mr-[10px]">
                {{ item.before }}
              </div>
              <component :is="item.component" v-model="dataSource[item.key]" v-bind="item.props">
                <template
                  v-if="item.component === 'el-radio-group' || (item.component as any).name === 'ElRadioGroup'"
                >
                  <el-radio
                    v-for="radio in item.data"
                    :key="radio.value"
                    :label="radio.value"
                    :disabled="radio.disabled"
                  >
                    {{ radio.label }}
                  </el-radio>
                </template>
                <template
                  v-if="item.component === 'el-checkbox-group' || (item.component as any).name === 'ElCheckboxGroup' "
                >
                  <el-checkbox
                    v-for="checkbox in item.data"
                    :key="checkbox.value"
                    :label="checkbox.value"
                  >
                    {{ checkbox.label }}
                  </el-checkbox>
                </template>
                <template
                  v-if="item.component === 'el-select' || (item.component as any).name === 'ElSelect'"
                >
                  <el-option
                    v-for="option in item.data"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </template>
              </component>
              <div v-if="item.after" class="ml-[10px]">
                {{ item.after }}
              </div>
            </div>
            <div v-if="item.tips" class="text-gray-400 text-xs mt-[10px]" v-html="item.tips"></div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
  import { FormSchema } from './types'

  export default defineComponent({
    model: {
      source: Object
    },
    props: {
      schemas: {
        type: Array as PropType<FormSchema[]>,
        default: () => [],
        required: true
      },
      source: {
        type: Object,
        default: () => ({}),
        required: true
      }
    },
    emits: ['update:source'],
    setup(props, { emit }) {
      const dataSource = computed(() => props.source)

      watch(
        dataSource,
        (val) => {
          emit('update:source', val)
        },
        { deep: true }
      )

      return {
        dataSource
      }
    }
  })
</script>
<style lang="scss">
  .el-col {
    .el-form-item {
      width: 100%;
    }
  }

  .el-form-item__content {
    > .wrapper {
      display: flex;
      width: 100%;
      min-height: 32px;

      .el-select,
      .el-input {
        flex: 1;
      }
    }
  }
</style>
