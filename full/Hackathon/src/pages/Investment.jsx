import { useState, useEffect } from "react";
import axios from "axios";

const Investments = ({ token }) => {
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({ name: "", amount: "" });

  // Fetch investments data when token is available
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/investments", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setInvestments(response.data);
        })
        .catch((error) => console.error("Error fetching investments:", error));
    }
  }, [token]);

  // Handle adding new investment
  const handleAddInvestment = async () => {
    if (newInvestment.name && newInvestment.amount) {
      try {
        await axios.post("http://localhost:5000/api/investments", newInvestment, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Refresh the investment list after adding
        const response = await axios.get("http://localhost:5000/api/investments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvestments(response.data);
        setNewInvestment({ name: "", amount: "" }); // Reset form
      } catch (error) {
        console.error("Error adding investment:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Your Investments
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Add New Investment</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Investment Name"
              value={newInvestment.name}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
              type="number"
              placeholder="Investment Amount"
              value={newInvestment.amount}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, amount: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleAddInvestment}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Current Investments</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left text-gray-700">Name</th>
                  <th className="p-4 text-left text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {investments.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="p-4 text-center text-gray-500">
                      No investments found.
                    </td>
                  </tr>
                ) : (
                  investments.map((investment) => (
                    <tr key={investment._id} className="border-t">
                      <td className="p-4 text-gray-700">{investment.name}</td>
                      <td className="p-4 text-gray-700">${investment.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;
