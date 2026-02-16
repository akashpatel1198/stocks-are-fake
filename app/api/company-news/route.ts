import finnhubApi from "@/lib/axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");

  if (!symbol) {
    return Response.json({ error: "Symbol is required" }, { status: 400 });
  }

  // Get news from last 7 days
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  try {
    const response = await finnhubApi.get("/company-news", {
      params: {
        symbol,
        from: formatDate(from),
        to: formatDate(to),
      },
    });
    return Response.json(response.data);
  } catch (error) {
    console.error("Company news API error:", error);
    return Response.json({ error: "Failed to fetch company news" }, { status: 500 });
  }
}
