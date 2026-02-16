import finnhubApi from "@/lib/axios";

export async function GET() {
  try {
    const response = await finnhubApi.get("/stock/market-holiday", {
      params: { exchange: "US" },
    });
    return Response.json(response.data);
  } catch (error) {
    console.error("Market holidays API error:", error);
    return Response.json({ error: "Failed to fetch market holidays" }, { status: 500 });
  }
}
