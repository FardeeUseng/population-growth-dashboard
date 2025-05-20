"use client";

import { useSearchParams, useRouter } from "next/navigation";
// antd
import {
  TableOutlined,
  GlobalOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Select, DatePicker } from "antd";
// components
import DashboardTable from "./DashboardTable";
import { RadioButton, RadioGroup } from "@/components/Radio";
// other
import { indicators as indicatorOptions } from "@/constants/indicator";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import PopulationChart from "./DashboardChart";
import { PopulationGrowthItem } from "./population-growth.type";

type Props = {
  data: PopulationGrowthItem[];
};

export default function PopulationGrowthDashboard({ data }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const indicator = searchParams.get("ind") || "SP.POP.TOTL";
  const type = searchParams.get("type") || "table";
  const startDate = searchParams.get("start") || "2010";
  const endDate = searchParams.get("end") || "2022";

  const updateQuery = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleChangeDate: RangePickerProps["onChange"] = (value) => {
    if (!value) return;

    const startDate = dayjs(value[0], "YYYY").year();
    const endDate = dayjs(value[1], "YYYY").year();

    if (startDate <= endDate) {
      updateQuery({
        start: startDate.toString(),
        end: endDate.toString(),
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full ">
      <h1 className="text-xl font-semibold mb-4">
        Population Growth Dashboard
      </h1>
      <div className="flex justify-between">
        <RadioGroup
          value={type}
          onChange={(val) => updateQuery({ type: val.target.value })}
        >
          <RadioButton value="table">
            <TableOutlined className="mr-2" />
            Table
          </RadioButton>
          <RadioButton value="map">
            <GlobalOutlined className="mr-2" />
            Map
          </RadioButton>
          <RadioButton value="chart">
            <LineChartOutlined className="mr-2" />
            Chart
          </RadioButton>
        </RadioGroup>
        <div className="flex gap-x-4">
          <Select
            value={indicator}
            className="w-60"
            placeholder="Indicator"
            options={indicatorOptions}
            onChange={(val) => updateQuery({ ind: val })}
          />
          <DatePicker.RangePicker
            picker="year"
            value={[dayjs(startDate, "YYYY"), dayjs(endDate, "YYYY")]}
            onChange={handleChangeDate}
          />
        </div>
      </div>

      <div className="mt-4">
        {type === "table" ? (
          <DashboardTable data={data} />
        ) : type === "chart" ? (
          <PopulationChart data={data} />
        ) : null}
      </div>
    </div>
  );
}
