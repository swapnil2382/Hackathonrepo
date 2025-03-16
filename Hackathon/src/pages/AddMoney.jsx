import { useState, useEffect } from "react";
import axios from "axios";

const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!token) {
        setError("User not authenticated.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/account/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setError("Failed to fetch balance. Please try again.");
        setTimeout(() => setError(""), 2000);
      }
    };

    fetchBalance();
  }, [token]);

  const handleAddMoney = async () => {
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/account/add",
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Money added successfully!");
      setBalance(response.data.balance);
      setAmount("");

      setTimeout(() => setSuccess(""), 1500);
    } catch (error) {
      console.error("Error adding money:", error);
      setError(error.response?.data?.message || "Failed to add money. Please try again.");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Add Money to Your Account</h2>

        {/* Success and Error Messages */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4 text-center shadow-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-600 p-4 rounded-md mb-4 text-center shadow-sm">
            {success}
          </div>
        )}

        {/* Current Balance Display */}
        <div className="mb-6">
          <p className="text-xl text-gray-700 font-medium">Current Balance</p>
          <p className="text-4xl font-semibold text-indigo-600">${balance.toFixed(2)}</p>
        </div>

        {/* Amount Input Field */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Enter Amount to Add</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Add Money Button */}
        <button
          onClick={handleAddMoney}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center">
              <svg
                className="w-6 h-6 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                ></path>
              </svg>
            </span>
          ) : (
            "Add Money"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddMoney;
