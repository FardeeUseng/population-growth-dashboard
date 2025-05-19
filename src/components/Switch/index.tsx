"use client"

import { Switch as AntdSwitch, SwitchProps } from 'antd';

export default function Switch({ ...rest } : SwitchProps) {
  return <AntdSwitch {...rest} />
}
