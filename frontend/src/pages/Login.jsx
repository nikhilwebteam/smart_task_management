import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/80 backdrop-blur
                     border border-slate-800
                     rounded-2xl shadow-2xl
                     p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Welcome Back
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Sign in to your account
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30
                            text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

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
              autoComplete="email"
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
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-lg bg-slate-800/70
                         border border-slate-700
                         px-4 py-2.5 text-slate-100
                         placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium text-white
                       bg-gradient-to-r from-indigo-500 to-violet-500
                       hover:from-indigo-600 hover:to-violet-600
                       transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-xs text-slate-500 uppercase tracking-wider">
              or
            </span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* Register */}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full py-3 rounded-lg font-medium
                       bg-slate-800 text-slate-200
                       hover:bg-slate-700 transition"
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
}
