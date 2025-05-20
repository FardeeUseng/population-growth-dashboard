import { PopulationGrowthItem } from "@/features/Dashboard/population-growth.type";

export function enrichPopulationData(data: PopulationGrowthItem[]): PopulationGrowthItem[] {
  // 1. จัดเรียงข้อมูลจากเก่ามาก -> ใหม่มาก
  const sorted = [...data].sort((a, b) => Number(a.date) - Number(b.date));

  // 2. วน loop เพื่อคำนวณ growth_rate และ trend
  const enriched = sorted.map((item, index) => {
    const prev = sorted[index - 1];
    let growth_rate = '-';
    let trend: '↑' | '↓' | '→' = '→';

    if (prev && item.value && prev.value) {
      const rate = ((item.value - prev.value) / prev.value) * 100;
      growth_rate = `${rate.toFixed(2)}%`;
      trend = rate > 0 ? '↑' : rate < 0 ? '↓' : '→';
    }

    return {
      ...item,
      growth_rate,
      trend,
    };
  });

  // 3. คำนวณอันดับ (rank) โดยจัดเรียงจากประชากรมาก -> น้อย
  const withRank = enriched
    .map((item) => ({ ...item })) // copy
    .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
    .map((item, index) => ({ ...item, rank: index + 1 }));

  // 4. รวมค่า rank กลับเข้าไป
  const final = enriched.map((item) => {
    const match = withRank.find((r) => r.date === item.date);
    return {
      ...item,
      rank: match?.rank,
    };
  });

  return final;
}
