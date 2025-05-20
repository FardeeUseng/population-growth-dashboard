"use client";

import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

export default function CheckboxGroup({ ...rest }: CheckboxGroupProps) {
  return <Checkbox.Group {...rest} />
}
