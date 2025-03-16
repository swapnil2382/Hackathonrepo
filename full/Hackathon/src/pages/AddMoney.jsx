import { useState, useEffect } from "react";
import axios from "axios";

const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch account balance
    const fetchBalance = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/account/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, [token]);

  const handleAddMoney = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/account/add",
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      setBalance(response.data.balance);
      setAmount("");
    } catch (error) {
      console.error("Error adding money:", error);
      alert("Failed to add money");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Balance</h2>
        <p className="text-lg text-indigo-600 font-semibold">Current Balance: ${balance}</p>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-lg mt-4"
        />
        <button
          onClick={handleAddMoney}
          className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
        >
          Add Money
        </button>
      </div>
    </div>
  );
};

export default AddMoney;
