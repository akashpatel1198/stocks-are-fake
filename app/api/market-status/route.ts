import finnhubApi from "@/lib/axios";

export async function GET() {
  try {
    const response = await finnhubApi.get("/stock/market-status", {
      params: { exchange: "US" },
    });
    return Response.json(response.data);
  } catch (error) {
    console.error("Market status API error:", error);
    return Response.json({ error: "Failed to fetch market status" }, { status: 500 });
  }
}
