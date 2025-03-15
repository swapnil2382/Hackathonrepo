import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const StockData = ({ token }) => {
  const [assetType, setAssetType] = useState("stocks");
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("AAPL");
  const [investments, setInvestments] = useState([]);

  const storedToken = localStorage.getItem("token");
  const authToken = token || storedToken;

  const fetchStockData = async (symbol, assetType = "stocks") => {
    if (!authToken) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/${assetType}/${symbol}?timestamp=${new Date().getTime()}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      console.log("API Response:", response.data);
      if (response.data.values) {
        setData(response.data.values.slice(0, 15)); // Fetch exactly 15 data points
      } else {
        setError("No data available.");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error.message);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchInvestments = async () => {
    if (!authToken) return;
    try {
      const response = await axios.get("http://localhost:5000/api/investments", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setInvestments(response.data);
    } catch (error) {
      console.error("Error fetching investments:", error);
    }
  };

  const handleBuyStock = async (stock) => {
    if (!authToken) {
      alert("Please log in to buy stocks.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/investments",
        {
          name: `${symbol} (${assetType.toUpperCase()})`,
          amount: stock.close,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      alert(`Successfully purchased ${symbol} at $${stock.close}`);
      fetchInvestments(); // Refresh investments
    } catch (error) {
      console.error("Error buying stock:", error);
      alert("Failed to complete purchase. Make sure you're logged in.");
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchStockData(symbol, assetType);
      fetchInvestments();
    }
  }, [symbol, assetType, authToken]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200 p-5">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
          {authToken ? `${assetType.toUpperCase()} Data for ${symbol}` : "Please Log In to View Stock Data"}
        </h2>

        {!authToken && (
          <div className="text-center text-red-500 font-medium">
            You need to log in to view and buy stocks.
          </div>
        )}

        {authToken && (
          <>
            <div className="flex justify-center gap-3 mb-5">
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                className="p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="stocks">Stocks</option>
                <option value="forex_pairs">Forex Pairs</option>
                <option value="cryptocurrencies">Cryptocurrencies</option>
                <option value="etf">ETFs</option>
                <option value="indices">Indices</option>
              </select>
              <input
                type="text"
                placeholder="Symbol (e.g., TSLA)"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                className="p-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={() => setSymbol(input)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
              >
                Search
              </button>
            </div>

            {loading && <div className="text-center">Loading...</div>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && data.length > 0 && (
              <>
                {/* Stock Price Trend Chart */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">Price Trend</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={[...data].reverse()} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <XAxis dataKey="datetime" tick={{ fontSize: 12 }} />
                      <YAxis domain={["auto", "auto"]} />
                      <Tooltip />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Line type="monotone" dataKey="close" stroke="#2563eb" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Display last 15 stock data */}
                <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                  <h3 className="text-md font-semibold text-gray-700 mb-3">Last 15 Data Points</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 border">Date</th>
                          <th className="p-2 border">Open</th>
                          <th className="p-2 border">High</th>
                          <th className="p-2 border">Low</th>
                          <th className="p-2 border">Close</th>
                          <th className="p-2 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item) => (
                          <tr key={item.datetime} className="text-center border-t">
                            <td className="p-2 border">{new Date(item.datetime).toLocaleString()}</td>
                            <td className="p-2 border">{item.open}</td>
                            <td className="p-2 border text-green-600">{item.high}</td>
                            <td className="p-2 border text-red-600">{item.low}</td>
                            <td className="p-2 border">{item.close}</td>
                            <td className="p-2 border">
                              <button
                                onClick={() => handleBuyStock(item)}
                                className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition"
                              >
                                Buy Now
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StockData;
