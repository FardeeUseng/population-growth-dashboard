import { Suspense } from "react";
import PopulationGrowthDashboard from "@/features/Dashboard";

async function getInitialPopulation() {
  const res = await fetch(
    "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json",
    { next: { revalidate: 3600 } } // revalidate สำหรับ ISR
  );
  const data = await res.json();
  return data[1];
}

export default async function Page() {
  const initialData = await getInitialPopulation();

  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <PopulationGrowthDashboard initialData={initialData} />
    </Suspense>
  );
}
