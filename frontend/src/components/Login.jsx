import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-950 p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-slate-900 border border-slate-700
                     focus:outline-none focus:border-sky-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 p-2 rounded bg-slate-900 border border-slate-700
                     focus:outline-none focus:border-sky-400"
        />

        <button
          type="submit"
          className="w-full bg-sky-400 text-slate-900 font-semibold py-2 rounded
                     hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
