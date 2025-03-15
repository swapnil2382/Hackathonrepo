import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate=useNavigate()
  
    const handleChange = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", { email, password })
        setToken(response.data.token);  
        localStorage.setItem("token", response.data.token); // Store token persistently
    
        console.log("Successfully logged in");
        navigate('/'); 
      } catch (err) {
        setError('Invalid credentials');
        console.log(err);
      }
    };
    

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl transition hover:shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
        </h2>
        <form onSubmit={handleChange} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-blue-600 hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
