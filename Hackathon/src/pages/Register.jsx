import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6 ">
      <div className="w-full max-w-6xl flex bg-white rounded-lg ">
        {/* Left Column - Text Content */}
        <div className="w-full sm:w-1/2 p-6 bg-gray-50 mt-[8%]">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Our Platform!
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Create an account to start managing your investments and track your portfolio.
          </p>
          <p className="text-gray-600 mb-6 text-sm">
            Our platform allows you to monitor your investments, track your financial growth, and receive insights to make smarter financial decisions.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Start your investment journey now.
          </h3>
          <p className="text-gray-600 text-xs">
            Sign up to gain access to a user-friendly and secure platform to manage all your financial assets.
          </p>
        </div>

        {/* Vertical Separator */}
        <div className="w-px bg-gray-300 mx-4"></div>

        {/* Right Column - Register Form */}
        <div className="w-full sm:w-1/2 p-6  pe-[15%]">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-300 transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              Register
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
