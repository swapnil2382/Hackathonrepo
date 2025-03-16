import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Profile = ({ token: propToken }) => {
  const navigate = useNavigate();
  const [investments, setInvestments] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });

  const token = propToken || localStorage.getItem("token");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/user",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [token]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/investments",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setInvestments(response.data);
        }
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    };

    fetchInvestments();
  }, [token]);

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const lineChartData = {
    labels: investments.map((inv) => new Date(inv.date).toLocaleDateString()),
    datasets: [
      {
        label: "Investment Amount Over Time",
        data: investments.map((inv) => inv.amount),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 w-full pt-20">
      <div className="w-full bg-white rounded-lg shadow-lg p-6">
        {/* User Information */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Profile Overview
            </h2>
            <p className="text-gray-700">
              Name:{" "}
              <span className="font-medium text-indigo-600">{user.name}</span>
            </p>
            <p className="text-gray-700">
              Email:{" "}
              <span className="font-medium text-indigo-600">{user.email}</span>
            </p>
          </div>

          {/* Add Money Button */}
          <button
            className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
            onClick={() => navigate("/add-money")}
          >
            Add Money
          </button>
        </div>

        {/* Portfolio Summary */}
        <div className="mb-8 p-4 bg-gray-50 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Portfolio Summary
          </h3>
          <p>
            Total Investments:{" "}
            <span className="font-semibold text-indigo-500">
              {investments.length}
            </span>
          </p>
          <p>
            Total Value:{" "}
            <span className="font-semibold text-indigo-500">
              ${totalInvestment}
            </span>
          </p>
        </div>

        {/* Investment Trend Chart */}
        <div className="h-52 mb-8 bg-white border rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Investment Trend
          </h3>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

        {/* Recent Activities */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Activities
          </h3>
          <ul className="space-y-2">
            {investments.slice(-3).map((inv) => (
              <li
                key={inv._id}
                className="p-3 bg-gray-50 border rounded-lg shadow-sm"
              >
                <span className="font-medium">{inv.name}</span> - Invested $
                {inv.amount} on {new Date(inv.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        {/* Individual Investments */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Your Investments
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {investments.map((investment) => {
              const investmentDuration = Math.floor(
                (new Date() - new Date(investment.date)) / (1000 * 60 * 60 * 24)
              );
              const isGrowing = investment.amount >= 1000; // Example condition

              return (
                <div
                  key={investment._id}
                  className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <h4 className="text-lg font-bold text-gray-800">
                    {investment.name}
                  </h4>
                  <p className="text-gray-700 mt-2">
                    Amount:{" "}
                    <span
                      className={`font-medium ${
                        isGrowing ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      ${investment.amount}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    Held for: {investmentDuration} days
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {isGrowing
                      ? "This investment is showing good growth."
                      : "Consider reviewing this investment."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
