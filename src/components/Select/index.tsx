"use client"

import { Select as AntdSelect, SelectProps } from 'antd'

export default function Select({ ...rest } : SelectProps) {
  return <AntdSelect { ...rest } />
}
