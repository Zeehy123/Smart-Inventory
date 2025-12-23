import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosClient.post("login/", {
        email: formData.email,
        password: formData.password,
      });

      //save the tokens
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid login credentials");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-gray w-full max-w-md rounded-xl shadow-md p-8">
        <div className="mx-auto bg-blue-100 w-14 h-14 flex items-center justify-center rounded-full text-3xl">
          icon
        </div>
        <h2 className="text-center mt-4 text-2xl font-bold">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign in to your SmartInventory Account
        </p>
        {error && <p className="text-red-500 text-sm mb-3 ">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block text-left text-sm font-medium text-gray-700 mt-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full border mt-1 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />

          <label className="block text-left text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="*******"
            className="w-full border mt-1 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-6 font-semibold"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
