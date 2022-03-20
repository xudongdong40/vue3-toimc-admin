export type ComponentType =
  | 'cascader'
  | 'checkbox'
  | 'checkbox-group'
  | 'checkbox-button'
  | 'color-picker'
  | 'date-picker'
  | 'input'
  | 'input-number'
  | 'radio'
  | 'radio-group'
  | 'radio-button'
  | 'rate'
  | 'select'
  | 'option'
  | 'slider'
  | 'switch'
  | 'time-picker'
  | 'time-select'
  | 'transfer'
  | 'upload'
  | 'editor'

export type FormSchema = {
  component: ComponentType
  value?: any
  label?: string
  prop: string
  rules?: RuleItem[]
  attrs?: any
  children?: Partial<FormSchema>[]
}
