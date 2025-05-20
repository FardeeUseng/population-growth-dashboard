"use client";

import { Col, Row } from "antd";
import DashboardFilter from "./DashboardFilter";
import PopulationGrowth from "./PopulationGrowth";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PopulationGrowthItem } from "./population-growth.type";

type Props = {
  initialData: PopulationGrowthItem[];
};

export default function PopulationGrowthDashboard({ initialData }: Props) {
  const [data, setData] = useState<PopulationGrowthItem[]>(initialData);

  const searchParams = useSearchParams();

  const indicator = searchParams.get("ind") || "SP.POP.TOTL";
  const startDate = searchParams.get("start") || "2010";
  const endDate = searchParams.get("end") || "2022";
  const country = searchParams.get("country") || "";
  const region = searchParams.get("region") || "WLD";

  useEffect(() => {
    const fetchRange = async () => {
      const params = new URLSearchParams({
        indicator: indicator,
        start: startDate,
        end: endDate,
        country: country,
        region: region,
      });
      const res = await fetch(`/api/population?${params.toString()}`);
      const result = await res.json();
      setData(result);
    };

    fetchRange();
  }, [indicator, startDate, endDate, country, region]);

  return (
    <Row gutter={[20, 0]} className="flex-1">
      <Col span={6}>
        <DashboardFilter />
      </Col>
      <Col span={18}>
        <PopulationGrowth data={data} />
      </Col>
    </Row>
  );
}
