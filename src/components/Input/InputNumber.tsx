"use client"

import type { InputNumberProps } from "antd";

export default function InputNumber({ ...rest }: InputNumberProps) {
  return (
    <InputNumber
      {...rest}
      formatter={
        rest.formatter
          ? rest.formatter
          : (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
      parser={
        rest.parser
          ? rest.parser
          : (value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number
      }
    />
  );
}
