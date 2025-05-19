"use client"

import { Radio } from 'antd'
import type { RadioButtonProps } from 'antd/es/radio/radioButton'

export default function RadioButton({ ...rest } : RadioButtonProps) {
  return <Radio.Button { ...rest } />
}
