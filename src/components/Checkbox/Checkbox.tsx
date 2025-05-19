"use client"

import { Checkbox as AntdCheckbox } from 'antd';
import type { CheckboxProps } from 'antd';

export default function Checkbox({ ...rest }: CheckboxProps) {
  return <AntdCheckbox {...rest} />
}
