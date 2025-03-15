import React, { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function InvestmentSuggestions() {
  const [symbol, setSymbol] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const profileResponse = await axios.get(
        `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=Tmg6F8zgCUbDnvnS00xwSuubklKuAS31`
      );
      const profile = profileResponse.data[0];

      const priceResponse = await axios.get(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=Tmg6F8zgCUbDnvnS00xwSuubklKuAS31`
      );

      setRecommendation(profile);
      setData(priceResponse.data.historical || []);
      setError("");
    } catch (error) {
      setError("Error fetching data. Please check the symbol or API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendationReason = () => {
    if (!recommendation) return "";
    const { beta, price } = recommendation;

    if (beta > 1)
      return `Recommendation: Buy - High growth potential with current price at $${price}.`;
    if (beta < 1)
      return `Recommendation: Hold - Stable stock with current price at $${price}.`;
    return `Recommendation: Hold - No significant growth or decline expected.`;
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-blue-700">
        Investment Suggestion
      </h2>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol (e.g., IBM)"
        className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={fetchData}
        className="bg-blue-600 text-white mt-3  px-5 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Get Suggestion
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {recommendation && (
        <div className="p-4 bg-blue-50 rounded-lg shadow">
          <h3 className="text-lg font-semibold">
            {recommendation.companyName}
          </h3>
          <p>{getRecommendationReason()}</p>
        </div>
      )}
      <div className="h-64">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Graph is loading...</p>
          </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="date" hide={false} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{ fill: "#4F46E5" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No graph data available.</p>
        )}
      </div>
    </div>
  );
}
