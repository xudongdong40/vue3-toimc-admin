<script lang="ts" setup>
  import FormPlus from '@/components/FormPlus/index.vue'
  import { FormSchema } from '@/components/FormPlus/types'
  import {
    ElInput,
    ElSelect,
    ElDatePicker,
    ElSwitch,
    ElCheckboxGroup,
    ElRadioGroup,
    ElRate
  } from 'element-plus'

  const source = reactive({
    name: '123',
    gender: 0,
    time: 1647532800000,
    datarange: [],
    switch: '',
    checkboxGroup: [],
    radioGroup: 1,
    textarea: '',
    rate: '',
    transfer: []
  })
  const schemas = computed<FormSchema[]>(() => {
    return [
      {
        key: 'name',
        label: '输入框:',
        component: ElInput,
        span: 16,
        after: 'after',
        before: 'before',
        itemProps: {
          class: 'is-required',
          rules: [{ required: true, message: '请输入', trigger: 'blur' }]
        }
      },
      {
        key: 'name',
        label: '绑定输入框文本:',
        component: 'innerText',
        labelWidth: 120,
        span: 8
      },
      {
        key: 'gender',
        label: '性别:',
        component: ElSelect,
        span: 12,
        data: [
          { label: '男', value: 1 },
          { label: '女', value: 0 }
        ],
        tips: '这里放置提示文本'
      },
      {
        key: 'gender',
        label: '性别:',
        component: 'innerText',
        innerText: '测试文本',
        span: 6,
        style: {
          color: 'red'
        },
        tips: '这个组件的长度为四分之一'
      },
      {
        key: 'gender',
        label: '性别:',
        component: 'innerText',
        span: 6,
        tips: '这个文本绑定性别的值'
      },
      {
        key: 'time',
        label: '日期选择器:',
        component: ElDatePicker,
        labelWidth: 120,
        span: 16,
        props: {
          valueFormat: 'x'
        }
      },
      {
        key: 'time',
        label: '日期选择器的值',
        component: 'innerText',
        labelWidth: 120,
        span: 16,
        tips: '返回毫秒时间戳'
      },
      {
        key: 'datarange',
        label: '时间段:',
        component: ElDatePicker,
        span: 12,
        props: {
          type: 'daterange',
          valueFormat: 'x'
        }
      },
      {
        key: 'datarange',
        label: '时间段:',
        component: 'innerText',
        span: 12,
        tips: '借助computed'
      },
      {
        key: 'switch',
        label: '开关',
        component: ElSwitch,
        span: 24,
        props: {
          'active-text': '开',
          'inactive-text': '关',
          'active-color': 'red',
          'inactive-color': 'yellow'
        }
      },
      {
        key: 'checkboxGroup',
        label: '多选框组:',
        component: ElCheckboxGroup,
        span: 16,
        data: [
          { label: '第1个选项', value: 0 },
          { label: '第2个选项', value: 1 },
          { label: '第3个选项', value: 2 },
          { label: '第4个选项', value: 3 }
        ]
      },
      {
        key: 'checkboxGroup',
        label: '多选值',
        component: 'innerText',
        span: 8
      },
      {
        key: 'radioGroup',
        label: '单选框',
        component: ElRadioGroup,
        span: 16,
        data: [
          { label: '男', value: 0 },
          { label: '女', value: 1 },
          { label: '中间态', value: 2, disabled: true }
        ]
      },
      {
        key: 'textarea',
        label: 'Textarea:',
        component: ElInput,
        span: 24,
        props: {
          type: 'textarea'
        }
      },
      {
        key: 'rate',
        label: '评分:',
        component: ElRate,
        span: 8,
        props: {
          texts: ['oops', 'disappointed', 'normal', 'good', 'great'],
          showText: true
        }
      }
    ]
  })
</script>
<template>
  <div class="m-[24px] p-[16px] bg-white">
    <form-plus :schemas="schemas" :source="source" :label-width="80"></form-plus>
  </div>
</template>
