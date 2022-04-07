import { Component } from 'vue'

interface Data {
  label: string
  value: string | number
  disabled?: boolean
}

export interface FormSchema {
  component: 'slot' | 'innerText' | string | Component
  key: string
  label: string
  span: number
  labelWidth?: number
  props?: Object
  itemProps?: object
  slotName?: string
  innerClass?: object
  style?: object | string[]
  innerText?: string | number
  data?: Data[]
  tips?: string
  after?: string
  before?: string
}
