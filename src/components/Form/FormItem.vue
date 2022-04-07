<template>
  <!-- https://element-plus.gitee.io/zh-CN/component/radio.html#%E5%8D%95%E9%80%89%E6%A1%86%E7%BB%84 -->
  <!-- radio, checkbox -->
  <!-- radio-group的label即是value -->
  <component
    :is="'el-' + item.component"
    v-if="['radio-group', 'checkbox-group'].includes(item.component)"
    v-model="model[item.prop]"
    v-bind="item.attrs"
    v-on="item.events || {}"
  >
    <component
      :is="'el-' + radio.component"
      v-for="(radio, idx) in item.children"
      :key="idx"
      :label="radio.value"
      >{{ radio.label }}</component
    >
  </component>
  <t-input
    v-else-if="item.component === 'input'"
    v-model="model[item.prop]"
    v-bind="item.attrs"
    v-on="item.events || {}"
  >
    <template v-if="item?.itemSlot" #[getSlotName(item)]>
      <slot v-if="item.slot" :name="item.slot"></slot>
    </template>
  </t-input>

  <el-upload v-else-if="item.component === 'upload'" v-bind="item?.upload">
    <slot :name="item.slot ? item.slot + 'trigger' : 'trigger'"></slot>
    <slot :name="item.slot ? item.slot + 'tip' : 'tip'"></slot>
    <slot :name="item.slot ? item.slot + 'file' : 'file'"></slot>
    <template v-if="item.upload && item.upload.type" #trigger>
      <!-- 按钮 -->
      <el-button
        v-if="item.upload?.type === 'button'"
        :type="item.upload.btnType || 'primary'"
        :class="item.upload.class"
      >
        <slot :name="item.slot ? item.slot + 'prefix' : 'prefix'"></slot>
        <slot>{{ item.upload.text }}</slot>
        <slot :name="item.slot ? item.slot + 'suffix' : 'suffix'"></slot>
      </el-button>
      <!-- 图标 -->
      <icon v-else :icon="item.upload?.icon || 'ep:upload'" :class="item.upload?.class" />
    </template>
  </el-upload>
  <el-cascader
    v-else-if="item.component === 'cascader'"
    v-bind="item.attrs"
    v-model="model[item.prop]"
    :label="item.label"
  >
    <template v-if="item.slot" #default="{ data }">
      <slot v-if="showSlot(item.slot)" :name="item.slot && item?.slot[0]" v-bind="data"></slot>
      <slot v-else :name="item.slot" v-bind="data"></slot>
    </template>
  </el-cascader>
  <component
    :is="'el-' + item.component"
    v-else
    v-model="model[item.prop]"
    v-bind="item.attrs"
    v-on="item.events || {}"
  >
    <template v-if="item.children && item.children.length" #default>
      <component
        :is="'el-' + child.component"
        v-for="(child, i) in item.children"
        :key="i"
        :label="child.label"
        :value="child.value"
        v-bind="item.attrs"
      ></component>
    </template>
    <template v-else-if="showSlot(item.slot)" #default>
      <slot v-for="(s, sIdx) in item.slot" :key="sIdx" :name="s" :scope="$scope"></slot>
    </template>
    <!-- <template v-else-if="scoped" #default="scoped">
          <slot :name="item.slot" :scope="scoped"></slot>
        </template>-->
    <template v-else-if="item.itemSlot" #[getSlotName(item)]>
      <slot v-if="item.slot" :name="item.slot"></slot>
    </template>
    <template v-else #default>
      <slot v-if="item.slot" :name="item.slot"></slot>
    </template>
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import {
    ElInput,
    ElCascader,
    ElCheckbox,
    ElCheckboxGroup,
    ElCheckboxButton,
    ElColorPicker,
    ElDatePicker,
    ElInputNumber,
    ElRadio,
    ElRadioGroup,
    ElRadioButton,
    ElRate,
    ElSelect,
    ElOption,
    ElSlider,
    ElSwitch,
    ElTimePicker,
    ElTimeSelect,
    ElTransfer,
    ElUpload
  } from 'element-plus'
  import { FormSchema } from './types/types'

  export default defineComponent({
    components: {
      ElInput,
      ElCascader,
      ElCheckbox,
      ElCheckboxGroup,
      ElCheckboxButton,
      ElColorPicker,
      ElDatePicker,
      ElInputNumber,
      ElRadio,
      ElRadioButton,
      ElRate,
      ElRadioGroup,
      ElSelect,
      ElOption,
      ElSlider,
      ElSwitch,
      ElTimePicker,
      ElTimeSelect,
      ElTransfer,
      ElUpload
    },
    props: {
      item: {
        type: Object as PropType<FormSchema>,
        default: () => {},
        required: true
      },
      modelValue: {
        type: Object as PropType<{ [key: string]: string }>,
        default: () => {},
        required: true
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const showSlot = (item: string | string[] | undefined): boolean => {
        return !!item && typeof item !== 'string' && !!item.length && item.length > 0
      }
      const getSlotName = (item: FormSchema): string => {
        return item?.itemSlot || 'defalut'
      }

      const model = ref<any>(props.modelValue)

      watch(
        () => model,
        () => {
          emit('update:modelValue', model.value)
        },
        { deep: true, immediate: true }
      )

      return {
        getSlotName,
        showSlot,
        model
      }
    }
  })
</script>

<style scoped></style>
