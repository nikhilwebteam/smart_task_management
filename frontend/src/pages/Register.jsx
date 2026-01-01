import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const res = await axios.post("http://localhost:8000/api/auth/register", formData);

      // optional: auto login token if backend sends it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg 
                   rounded-2xl shadow-lg 
                   p-6 sm:p-8 md:p-10"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm sm:text-base mb-1">Username</label>
          <input
            type="text"
            name="uname"
            value={formData.uname}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2.5 sm:py-2 
                       focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm sm:text-base mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2.5 sm:py-2 
                       focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm sm:text-base mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2.5 sm:py-2 
                       focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white 
                     py-3 sm:py-2.5 
                     rounded-lg font-medium 
                     hover:bg-blue-700 transition 
                     disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
