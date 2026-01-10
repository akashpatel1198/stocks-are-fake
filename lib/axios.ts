import axios from "axios";

const finnhubApi = axios.create({
    baseURL: "https://finnhub.io/api/v1",
    headers: {
        'X-Finnhub-Token': process.env.FINNHUB_API_KEY,
    },
});

export default finnhubApi;