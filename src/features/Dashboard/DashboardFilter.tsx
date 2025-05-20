"use client";

import { useEffect, useMemo, useState } from "react";
// antd
import { Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// components
import Select from "@/components/Select";
import { InputText } from "@/components/Input";
import { Checkbox, CheckboxGroup } from "@/components/Checkbox";
// other
import { useDebounce } from "use-debounce";
import { regions } from "@/constants/regions";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardFilter() {
  const [searching, setSearching] = useState("");
  const [countryList, setCountryList] = useState<
    { code: string; name: string }[]
  >([]);

  const [debounceSearching] = useDebounce(searching, 500);

  const searchParams = useSearchParams();
  const router = useRouter();

  const contries = searchParams.get("country")?.split(",") || [];
  const region = searchParams.get("region") || "WLD";

  useEffect(() => {
    const fetchRange = async () => {
      const params = new URLSearchParams({
        region: region,
      });
      const res = await fetch(`/api/country?${params.toString()}`);
      const result = await res.json();
      console.log("result", result)
      setCountryList(result);
    };

    fetchRange();
  }, [region]);

  const countrySearchList = useMemo(() => {
    return countryList?.filter((country) => {
      if (country.name) {
        return country.name
          .toLowerCase()
          .includes(debounceSearching.toLowerCase());
      }
      return true;
    });
  }, [debounceSearching, countryList]);

  const updateQuery = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <div>
        <h1 className="text-xl font-semibold mb-4">Search Country</h1>
        <InputText
          onChange={(e) => setSearching(e.target.value)}
          placeholder="Search Country"
          suffix={<SearchOutlined />}
        />
      </div>
      <div className="my-5">
        <Divider size="small" />
      </div>
      <div>
        <div className="flex gap-x-4 items-center">
          <h3 className="font-semibold text-nowrap">Region Filter: </h3>
          <Select
            value={region}
            onChange={(value) =>
              updateQuery({ region: value, country: undefined })
            }
            className="w-full"
            options={regions}
          />
        </div>
        <div className="mt-5">
          <CheckboxGroup
            value={contries}
            onChange={(values: string[]) => {
              updateQuery({
                country: values.length > 0 ? values.join(",") : undefined,
              });
            }}
            className="w-full flex gap-y-2 max-h-[600px] overflow-y-scroll"
          >
            {countrySearchList.map((coutry) => (
              <Checkbox
                key={coutry.code}
                value={coutry.code}
                className="w-full"
              >
                {coutry.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </div>
    </div>
  );
}
