import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import DateInput from "../components/DateSelector";
import UserSelect from "../components/AssigningTask";

export default function TaskForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    status: "pending",
    assignedUser: null,
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      api.get(`/tasks/${id}`).then((res) => {
        setFormData({
          title: res.data.title,
          description: res.data.description || "",
          priority: res.data.priority || "medium",
          dueDate: res.data.dueDate ? res.data.dueDate.split("T")[0] : "",
          status: res.data.status || "pending",
        });
      });
    }
  }, [id, isEdit]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

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
          {isEdit ? "Edit Task" : "Add Task"}
        </h2>

        {error && (
          <div
            className="bg-red-500/10 border border-red-500/30
                          text-red-400 px-4 py-3 rounded-lg text-sm"
          >
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800/70 border border-slate-700
                       px-4 py-2.5 text-slate-100 placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 transition"
            placeholder="Task title"
          />
          {fieldErrors.title && (
            <p className="text-red-400 text-sm mt-1">{fieldErrors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-lg bg-slate-800/70 border border-slate-700
                       px-4 py-2.5 text-slate-100 placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 transition"
            placeholder="Task description"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800/70 border border-slate-700
                       px-4 py-2.5 text-slate-100
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 transition"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800/70 border border-slate-700
                       px-4 py-2.5 text-slate-100
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 transition"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Due Date */}

        <DateInput
          label="Due Date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          error={fieldErrors.dueDate}
        />

        {/* Assigned User */}
        <UserSelect
          value={formData.assignedUser}
          onChange={handleChange}
          error={fieldErrors.assignedUser}
        />

        {/* Buttons */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-medium text-white
                     bg-linear-to-r from-indigo-500 to-violet-500
                     hover:from-indigo-600 hover:to-violet-600
                     transition disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Update Task" : "Create Task"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="w-full py-3 rounded-lg font-medium text-white
                     bg-gray-700 hover:bg-gray-600 transition"
        >
          My Tasks
        </button>
      </form>
    </div>
  );
}
