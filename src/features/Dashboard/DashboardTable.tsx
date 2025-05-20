"use client"

import { useMemo } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { enrichPopulationData } from "@/utils/enrichPopulation";
import { formatNumber } from "@/utils/formatNumber";
import { PopulationGrowthItem } from "./population-growth.type";

type Props = {
  data: PopulationGrowthItem[];
};

const columns: TableProps<PopulationGrowthItem>["columns"] = [
  {
    title: "No",
    width: 100,
    align: "center",
    render: (_value, _record, index) => index + 1,
  },
  {
    title: "Year",
    dataIndex: "date",
    width: 100,
    align: "center",
  },
  {
    title: "Country",
    dataIndex: ["country", "value"],
  },
  {
    title: "Population",
    dataIndex: "value",
    width: 200,
    align: "center",
    render: (value) => formatNumber(value),
  },
  {
    title: "Growth rate",
    dataIndex: "growth_rate",
    width: 200,
    align: "center",
    render: (text: string) => {
      const num = parseFloat(text);
      const color = isNaN(num)
        ? "default"
        : num > 0
        ? "green"
        : num < 0
        ? "red"
        : "gray";
      return <span style={{ color }}>{text}</span>;
    },
  },
  {
    title: "Trend",
    dataIndex: "trend",
    width: 100,
    align: "center",
    render: (trend: string) => {
      const color = trend === "↑" ? "green" : trend === "↓" ? "red" : "gray";
      return <span style={{ color, fontWeight: "bold" }}>{trend}</span>;
    },
  },
  {
    title: "Rank",
    dataIndex: "rank",
    width: 100,
    align: "center",
    render: (rank: number) => {
      const color =
        rank === 1
          ? "gold"
          : rank === 2
          ? "silver"
          : rank === 3
          ? "#cd7f32" // bronze
          : "gray";
      return <span style={{ color }}>{rank}</span>;
    },
  },
];

export default function DashboardTable({ data }: Props) {
  const enrichedData = useMemo(() => enrichPopulationData(data), [data]);

  return (
    <Table<PopulationGrowthItem>
      rowKey={(record) => `${record.country.id}_${record.date}`}
      columns={columns}
      dataSource={enrichedData}
      pagination={false}
      scroll={{ y: 600 }}
    />
  );
}
