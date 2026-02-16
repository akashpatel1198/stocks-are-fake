import finnhubApi from "@/lib/axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") || "general";

  try {
    const response = await finnhubApi.get("/news", {
      params: { category },
    });
    return Response.json(response.data);
  } catch (error) {
    console.error("Market news API error:", error);
    return Response.json({ error: "Failed to fetch market news" }, { status: 500 });
  }
}
