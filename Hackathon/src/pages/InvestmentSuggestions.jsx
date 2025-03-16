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
import { useNavigate } from "react-router-dom";

export default function InvestmentSuggestions() {
  const [symbol, setSymbol] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-100 flex justify-center py-8 px-2 mt-16">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-5 space-y-4 border border-gray-200">
        <h2 className="text-xl font-bold text-indigo-700 text-center">
          Investment Suggestions
        </h2>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Stock symbol (e.g., IBM)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
          />
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm"
          >
            Get Suggestion
          </button>
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        {recommendation && (
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-indigo-700">
              {recommendation.companyName}
            </h3>
            <p className="text-gray-600 text-xs mt-1">
              {getRecommendationReason()}
            </p>
            <button
              onClick={() => navigate("/investments")}
              className="mt-3 px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-xs"
            >
              Buy Share
            </button>
          </div>
        )}

        <div className="h-52">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-xs">Graph is loading...</p>
            </div>
          ) : data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#ccc",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="close"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-xs">No graph data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
