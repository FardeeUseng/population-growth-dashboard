export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region") || "WLD";

  const res = await fetch(
    `https://api.worldbank.org/v2/country?format=json&per_page=1000&region=${region}`
  );

  const data = await res.json();
  return Response.json(data[1]?.map((c: PopulationCountry) => ({
    code: c.id, // เช่น 'THA', 'USA'
    name: c.name, // เช่น 'Thailand', 'United States'
  })));
}
