import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {showSuccessToast ,showErrorToast } from "../components/Toast.jsx";


export default function Register() {
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        showSuccessToast("Registration successful");
      }

      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      showErrorToast("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center
                 bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900
                 px-4 py-8"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md
                   bg-slate-900/80 backdrop-blur
                   border border-slate-800
                   rounded-2xl shadow-2xl
                   p-6 sm:p-8 space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 text-center">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30
                          text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Username
          </label>
          <input
            type="text"
            name="uname"
            value={formData.uname}
            onChange={handleChange}
            required
            placeholder="Your username"
            className="w-full rounded-lg bg-slate-800/70
                       border border-slate-700
                       px-4 py-2.5 text-slate-100
                       placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full rounded-lg bg-slate-800/70
                       border border-slate-700
                       px-4 py-2.5 text-slate-100
                       placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 transition"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full rounded-lg bg-slate-800/70
                       border border-slate-700
                       px-4 py-2.5 text-slate-100
                       placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-medium text-white
                     bg-linear-to-r from-indigo-500 to-violet-500
                     hover:from-indigo-600 hover:to-violet-600
                     transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <span
            className="text-indigo-400 hover:text-indigo-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}
