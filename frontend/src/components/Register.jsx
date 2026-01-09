import React, { useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";





const Register = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      toast.success("Account created successfully!");
      navigate("/login");
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
        <h2 className="text-2xl font-semibold text-center mb-1 text-slate-100">
          Create Account
        </h2>

        <p className="text-slate-400 text-center mb-6 text-sm">
          Sign up to manage your tasks
        </p>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 rounded bg-slate-900 border border-slate-700
                     text-slate-100 focus:outline-none focus:border-sky-400"
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 rounded bg-slate-900 border border-slate-700
                     text-slate-100 focus:outline-none focus:border-sky-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full mb-6 p-2 rounded bg-slate-900 border border-slate-700
                     text-slate-100 focus:outline-none focus:border-sky-400"
        />

        <button
          type="submit"
          className="w-full bg-sky-400 text-slate-900 font-semibold py-2 rounded
                     hover:opacity-90 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
