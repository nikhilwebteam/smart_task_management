import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function TaskForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      api.get(`/tasks/${id}`).then(res => {
        setFormData({
          title: res.data.title,
          description: res.data.description || "",
          priority: res.data.priority || "medium",
          status: res.data.status || "pending",
        });
      });
    }
  }, [id, isEdit]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors(prev => ({ ...prev, [e.target.name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    // Frontend rules
    if (formData.title.length < 5) {
      setFieldErrors({ title: "Title must be at least 5 characters" });
      setLoading(false);
      return;
    }

    if (isEdit && formData.status === "pending") {
      const original = await api.get(`/tasks/${id}`);
      if (original.data.status === "completed") {
        setError("Completed tasks cannot be moved back to pending.");
        setLoading(false);
        return;
      }
    }

    try {
      if (isEdit) {
        await api.put(`/tasks/${id}`, formData);
      } else {
        await api.post("/tasks", formData);
      }
      navigate("/tasks");
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg && msg.includes("validation")) {
        setError(msg);
      } else {
        setError(msg || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg 
                   rounded-2xl shadow-lg p-6 sm:p-8 md:p-10"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
          {isEdit ? "Edit Task" : "Add Task"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          {fieldErrors.title && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Update Task" : "Create Task"}
        </button>

          <button
            onClick={() => navigate("/tasks")}
            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 disabled:opacity-50 mt-2"
          >
            MY Tasks
          </button>
      </form>
    </div>
  );
}
