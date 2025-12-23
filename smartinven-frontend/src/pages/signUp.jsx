import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSucess("");
    if (formData.password !== formData.confirm_password) {
      setError("password do not match!");
      return;
    }
    try {
      const res = await axiosClient.post("register/", formData);
      setSucess("Account created succesfully!");
    } catch (err) {
      console.log("SIGNUP FAILED", err.response?.data);
      if (err.reponse?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Somthing went wrong!");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-8 ">
        <div className="mx-auto bg-blue-100 w-14 h-14 flex items-center justify-center rounded-full text-3xl">
          icon
        </div>
        <h2 className="text-center mt-4 text-2xl font-bold">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Get started with smart Inventory
        </p>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {sucess && <p className="text-green-600 text-sm mb-3">{sucess}</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              className="w-full border mt-4 px-3 py-2 rounded-lg focus:ring-1 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              className="w-full border mt-4 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            className="w-full border mt-4 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="email"
            className="w-full border mt-4 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="w-full border mt-4 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            className="w-full border mt-4 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-5 font-semibold"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-small mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
