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
  const [balance, setBalance] = useState(0); // ✅ Balance state

  const storedToken = localStorage.getItem("token");
  const authToken = token || storedToken;

  // ✅ Fetch Balance
  const fetchBalance = async () => {
    if (!authToken) return;
    try {
      const response = await axios.get("http://localhost:5000/api/account/balance", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // ✅ Fetch Stock Data
  const fetchStockData = async (symbol, assetType = "stocks") => {
    if (!authToken) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/${assetType}/${symbol}?timestamp=${new Date().getTime()}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

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

  // ✅ Fetch User Investments
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
  
    if (stock.close > balance) {
      alert("Insufficient balance to purchase this stock.");
      return;
    }
  
    try {
      // ✅ Deduct balance in backend
      const balanceResponse = await axios.post(
        "http://localhost:5000/api/account/deduct-balance",
        { amount: stock.close },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
  
      // ✅ Update local balance state
      setBalance(balanceResponse.data.balance);
  
      // ✅ Store the purchased stock in investments
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
      alert("Failed to complete purchase.");
    }
  };
  

  useEffect(() => {
    if (authToken) {
      fetchBalance(); // ✅ Fetch balance
      fetchStockData(symbol, assetType);
      fetchInvestments();
    }
  }, [symbol, assetType, authToken]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="w-full bg-white shadow-lg rounded-xl border border-gray-200 p-5">
        {/* ✅ Balance Display */}
        <div className="text-right mb-4 text-lg font-semibold text-gray-800">
          Balance: <span className="text-green-600">${balance.toFixed(2)}</span>
        </div>

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
            <div className="flex justify-center gap-4 mb-5">
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                className="p-2 border-2 border-gray-300 rounded-md text-sm"
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
                className="p-2 border-2 border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={() => setSymbol(input)}
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all text-sm"
              >
                Search
              </button>
            </div>

            {loading && <div className="text-center text-white">Loading...</div>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && data.length > 0 && (
              <>
                {/* Stock Price Trend Chart */}
                <div className="bg-white p-5 rounded-lg shadow-md mb-5">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">Price Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[...data].reverse()} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <XAxis dataKey="datetime" tick={{ fontSize: 12 }} />
                      <YAxis domain={["auto", "auto"]} />
                      <Tooltip />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Line type="monotone" dataKey="close" stroke="#38bdf8" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Display last 15 stock data */}
                <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 mb-5">
                  <h3 className="text-md font-semibold text-gray-700 mb-3">Last 15 Data Points</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-3 border text-gray-600">Date</th>
                          <th className="p-3 border text-gray-600">Time</th>
                          <th className="p-3 border text-gray-600">Close</th>
                          <th className="p-3 border text-gray-600">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item) => {
                          const date = new Date(item.datetime);
                          const formattedDate = date.toLocaleDateString();
                          const formattedTime = date.toLocaleTimeString();
                          return (
                            <tr key={item.datetime} className="text-center border-t">
                              <td className="p-3 border">{formattedDate}</td>
                              <td className="p-3 border">{formattedTime}</td>
                              <td className="p-3 border">${item.close}</td>
                              <td className="p-3 border">
                                <button
                                  onClick={() => handleBuyStock(item)}
                                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
                                >
                                  Buy Now
                                </button>
                              </td>
                            </tr>
                          );
                        })}
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