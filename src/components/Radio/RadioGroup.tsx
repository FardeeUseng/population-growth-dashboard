"use client"

import { Radio, type RadioGroupProps } from "antd";

export default function RadioGroup({ ...rest }: RadioGroupProps) {
  return <Radio.Group {...rest} />;
}
