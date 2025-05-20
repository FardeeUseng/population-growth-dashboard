"use client"

import { Radio as AntdRadio, type RadioProps } from "antd";

export default function RadioGroup({ ...rest }: RadioProps) {
  return <AntdRadio {...rest} />;
}
