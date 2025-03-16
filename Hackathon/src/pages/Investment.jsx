import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Investments = ({ token }) => {
  const [investments, setInvestments] = useState([]);
  const [balance, setBalance] = useState(0);
  const [newInvestment, setNewInvestment] = useState({ name: "", amount: "" });

  // Fetch investments & balance on component mount
  useEffect(() => {
    if (token) {
      fetchInvestments();
      fetchBalance();
    }
  }, [token]);

  // Fetch investments from backend
  const fetchInvestments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/investments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInvestments(response.data);
    } catch (error) {
      console.error("Error fetching investments:", error);
    }
  };

  // Fetch account balance
  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/account/balance",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Add a new investment
  const handleAddInvestment = async () => {
    if (newInvestment.name && newInvestment.amount) {
      try {
        await axios.post(
          "http://localhost:5000/api/investments",
          { ...newInvestment, amount: Number(newInvestment.amount) }, // Ensure amount is a number
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setNewInvestment({ name: "", amount: "" });
        fetchInvestments(); // Refresh investments
        fetchBalance(); // Refresh balance
      } catch (error) {
        console.error("Error adding investment:", error);
      }
    }
  };

  // Sell an investment
  const handleSellInvestment = async (investmentId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/account/sell",
        { investmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Remove sold investment from UI
      setInvestments((prev) =>
        prev.filter((investment) => investment._id !== investmentId)
      );

      // Refresh balance
      fetchBalance();
    } catch (error) {
      console.error("Error selling investment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex justify-center py-6 px-2 mt-16">
      <div className="w-full bg-white rounded-lg shadow-lg p-6 space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          Your <span className="text-gray-800">Investments</span>
        </h2>

        {/* Display Balance */}
        <div className="text-center text-lg font-medium text-gray-700">
          Account Balance:{" "}
          <span className="text-indigo-700 font-bold">${balance}</span>
        </div>

        {/* Add Investment Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Add New Investment
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Investment Name"
              value={newInvestment.name}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition hover:border-indigo-400"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newInvestment.amount}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, amount: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition hover:border-indigo-400"
            />
            <button
              onClick={handleAddInvestment}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm shadow-sm hover:shadow-md"
            >
              Add
            </button>
          </div>
        </div>

        {/* Investment List Section */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Current Investments
          </h3>

          {investments.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">
              No investments added yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {investments.map((investment) => {
                const investmentDate = moment(investment.date).format(
                  "MMM DD, YYYY"
                );
                const duration = moment().diff(moment(investment.date), "days");
                const status = investment.amount > 1000 ? "Growing" : "Stable";

                return (
                  <div
                    key={investment._id}
                    className="relative p-4 bg-gradient-to-tr from-white to-gray-100 border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition hover:border-indigo-500 hover:bg-white cursor-pointer"
                  >
                    <h4 className="text-md font-semibold text-indigo-700 mb-1 truncate">
                      {investment.name}
                    </h4>
                    <p className="text-sm text-gray-700 mb-1">
                      Amount:{" "}
                      <span className="text-gray-900 font-medium">
                        ${investment.amount}
                      </span>
                    </p>

                    <hr className="my-2 border-gray-300" />

                    <p className="text-xs text-gray-500">
                      Date:{" "}
                      <span className="text-gray-800">{investmentDate}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Duration:{" "}
                      <span className="text-gray-800">{duration} days</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          status === "Growing"
                            ? "text-green-500"
                            : "text-blue-500"
                        }`}
                      >
                        {status}
                      </span>
                    </p>

                    {/* Sell Button */}
                    <button
                      onClick={() => handleSellInvestment(investment._id)}
                      className="absolute bottom-3 right-3 px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow-sm"
                    >
                      Sell
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Investments;
