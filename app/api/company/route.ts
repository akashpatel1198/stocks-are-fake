import finnhubApi from "@/lib/axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");

  if (!symbol) {
    return Response.json({ error: "Symbol is required" }, { status: 400 });
  }

  try {
    const response = await finnhubApi.get("/stock/profile2", {
      params: { symbol },
    });
    return Response.json(response.data);
  } catch (error) {
    console.error("Company profile API error:", error);
    return Response.json({ error: "Failed to fetch company profile" }, { status: 500 });
  }
}
