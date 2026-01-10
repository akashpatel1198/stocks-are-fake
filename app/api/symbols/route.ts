import finnhubApi from "@/lib/axios";

export async function GET(){
    const response = await finnhubApi.get("/stock/symbol", {
        params: {
            exchange: "US",
        },
    });
    return Response.json(response.data);
}
