"use client";

import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Brush,
} from "recharts"; // หรือ interface ที่คุณใช้
import { formatNumber } from "@/utils/formatNumber";
import { useEffect, useState } from "react";
import { PopulationGrowthItem } from "./population-growth.type";

interface Props {
  data: PopulationGrowthItem[];
}

const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;

export default function PopulationChart({ data }: Props) {
  const groupedByCountry: Record<string, { date: string; value: number }[]> =
    {};

  data.forEach((item) => {
    const code = item.country?.id || "unknown";
    if (!groupedByCountry[code]) groupedByCountry[code] = [];

    groupedByCountry[code].push({
      date: item.date,
      value: item.value ?? 0,
    });
  });

  const countryMap: Record<string, string> = {};

  data.forEach((item) => {
    const code = item.country?.id;
    const name = item.country?.value;
    if (code && name) {
      countryMap[code] = name;
    }
  });

  // ✅ รวมข้อมูลให้เป็น array แยกตามปี (สำหรับ multi-line chart)
  const years = [...new Set(data.map((item) => item.date))].sort();
  const chartData = years.map((year) => {
    const entry: Record<string, any> = { date: year };
    Object.entries(groupedByCountry).forEach(([countryCode, items]) => {
      const yearData = items.find((i) => i.date === year);
      if (yearData) entry[countryCode] = yearData.value;
    });
    return entry;
  });

  const colorMap: Record<string, string> = {};

  Object.keys(groupedByCountry).forEach((countryCode) => {
    colorMap[countryCode] = getRandomColor();
  });

  return (
    <div className="min-h-[700px]">
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis width={100} tickFormatter={(v) => formatNumber(v)} />
          <Tooltip formatter={(value: any) => formatNumber(value)} />

          {Object.keys(groupedByCountry).map((countryCode) => (
            <Line
              key={countryCode}
              type="monotone"
              dataKey={countryCode}
              name={`${countryCode} - ${countryMap[countryCode] || "Unknown"}`}
              stroke={colorMap[countryCode]}
              dot={false}
              strokeWidth={2}
            />
          ))}
          <Brush dataKey="date" height={10} stroke="#213555" />
        </LineChart>
      </ResponsiveContainer>
      <CustomLegend countryMap={countryMap} colorMap={colorMap} />
    </div>
  );
}

function CustomLegend({
  countryMap,
  colorMap,
}: {
  countryMap: Record<string, string>;
  colorMap: Record<string, string>;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {Object.entries(countryMap).map(([code, name]) => {
        return (
          <div key={code} className="flex items-center gap-1 text-sm">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colorMap[code] }}
            />
            {code} - {name}
          </div>
        );
      })}
    </div>
  );
}
