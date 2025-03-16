import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      console.log("Successfully logged in");
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6 ">
      <div className="w-full max-w-6xl flex bg-white rounded-lg ">
        {/* Left Column - Login Form */}
        <div className=" sm:w-1/2 p-6 ps-[16%]">
          <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800 tracking-tight">
            Log-In
          </h2>
          <p className="text-center text-gray-500 text-xs mb-6">
            Login to manage your investments efficiently.
          </p>
          <form onSubmit={handleChange} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 p-2 text-xs shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-300 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 p-2 text-xs shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-300 transition"
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-300 transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline hover:text-indigo-800 transition"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Vertical Separator */}
        <div className="w-px bg-gray-300 mx-4"></div>

        {/* Right Column - Content about the website */}
        <div className="w-full sm:w-1/2 p-6 bg-gray-50">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Our platform offers a seamless way to manage your investments. With real-time tracking and detailed analytics, you can make informed decisions and grow your portfolio effortlessly.
          </p>
          <p className="text-gray-600 mb-6 text-sm">
            Experience secure and transparent transactions, detailed investment insights, and a user-friendly interface that puts you in control of your financial future.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Get Started Now</h3>
          <p className="text-gray-600 text-xs">
            Log in to access your investment portfolio, track your performance, and discover new opportunities. Let us help you make smarter financial decisions!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
