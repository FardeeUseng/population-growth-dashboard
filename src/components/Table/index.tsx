"use client"

import { Table as AntdTable, type TableProps } from "antd";

export default function Table({ ...rest }: TableProps) {
  return <AntdTable {...rest} />;
}
