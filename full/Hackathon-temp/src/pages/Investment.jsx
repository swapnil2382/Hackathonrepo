import { useState, useEffect } from "react";
import axios from "axios";

const Investments = ({ token }) => {
  const [investments, setInvestments] = useState([]); // ✅ Ensure state is properly defined
  const [newInvestment, setNewInvestment] = useState({ name: "", amount: "" });

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/investments", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setInvestments(response.data); // ✅ Use correct state setter
        })
        .catch((error) => console.error("Error fetching investments:", error));
    }
  }, [token]);

  const handleAddInvestment = async () => {
    if (newInvestment.name && newInvestment.amount) {
      await axios.post("http://localhost:5000/api/investments", newInvestment, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Refresh the investment list after adding
      axios
        .get("http://localhost:5000/api/investments", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setInvestments(response.data));

      setNewInvestment({ name: "", amount: "" });
    }
  };

  return (
    <div>
      <h2>Your Investments</h2>
      <ul>
        {investments.map((investment) => (
          <li key={investment._id}>
            {investment.name} - ${investment.amount}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Investment Name"
        value={newInvestment.name}
        onChange={(e) =>
          setNewInvestment({ ...newInvestment, name: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Investment Amount"
        value={newInvestment.amount}
        onChange={(e) =>
          setNewInvestment({ ...newInvestment, amount: e.target.value })
        }
      />
      <button onClick={handleAddInvestment}>Add Investment</button>
    </div>
  );
};

export default Investments;
