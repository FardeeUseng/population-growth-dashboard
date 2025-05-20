export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const indicator = searchParams.get("indicator") || "SP.POP.TOTL"; // ✅ fallback ค่า default
  const start = searchParams.get("start") || "2010";
  const end = searchParams.get("end") || "2022";
  const region = searchParams.get("region") || "WLD";
  const contries = (searchParams.get("country") || "").replaceAll(",", ";");

  const res = await fetch(
    `https://api.worldbank.org/v2/country/${contries}/indicator/${indicator}?format=json&region=${region}&date=${start}:${end}&per_page=1000`
  );
  const data = await res.json();

  return Response.json(data[1]);
}
