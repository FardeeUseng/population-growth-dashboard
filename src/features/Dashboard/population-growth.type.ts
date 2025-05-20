export interface PopulationGrowthItem {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: "AFE";
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
  growth_rate?: string;
  trend?: "↑" | "↓" | "→";
  rank?: number;
}

export interface PopulationCountry {
  id: string;
  iso2Code: string;
  name: string;
  region: { id: string; iso2code: string; value: string; };
  adminregion: { id: string; iso2code: string; value: string; };
  incomeLevel: { id: string; iso2code: string; value: string; };
  lendingType: { id: string; iso2code: string; value: string; };
  capitalCity: string;
  longitude: string;
  latitude: string;
}
