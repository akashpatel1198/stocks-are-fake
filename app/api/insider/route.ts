import finnhubApi from "@/lib/axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");

  if (!symbol) {
    return Response.json({ error: "Symbol is required" }, { status: 400 });
  }

  try {
    const response = await finnhubApi.get("/stock/insider-transactions", {
      params: { symbol },
    });
    return Response.json(response.data);
  } catch (error) {
    console.error("Insider transactions API error:", error);
    return Response.json({ error: "Failed to fetch insider transactions" }, { status: 500 });
  }
}
