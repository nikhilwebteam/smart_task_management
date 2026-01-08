import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";
import { MdOutlineLogout } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [prioritySort, setPrioritySort] = useState("none");

  useEffect(() => {
    api.get("/tasks").then((res) => {
      setTasks(res.data);
      setFilteredTasks(res.data);
      console.log(res.data);
    });
  }, []);


  useEffect(() => {
    let data = [...tasks];

    if (search) {
      data = data.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((t) => t.status === statusFilter);
    }

    if (prioritySort !== "none") {
      const order = { high: 3, medium: 2, low: 1 };
      data.sort((a, b) =>
        prioritySort === "asc"
          ? order[a.priority] - order[b.priority]
          : order[b.priority] - order[a.priority]
      );
    }

    setFilteredTasks(data);
  }, [search, statusFilter, prioritySort, tasks]);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  async function handleDelete(id) {
    const ok = window.confirm("Delete this task? This cannot be undone.");
    if (!ok) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start
                    bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900
                    px-4 py-8"
    >
      <div className="w-full max-w-5xl">
        <div
          className="bg-slate-900/80 backdrop-blur
                        border border-slate-800 rounded-2xl shadow-2xl
                        p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
              My Tasks
            </h1>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <img
                src={profile}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-slate-200 font-medium">Profile</span>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-2">
                <button
                  onClick={logout}
                  title="logout"
                  className="w-full sm:w-auto rounded-lg font-medium
                         text-white hover:slate-600 transition cursor-pointer mb-2 "
                >
                  <MdOutlineLogout />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 rounded-lg bg-slate-800/70
                         border border-slate-700 px-4 py-2.5 text-slate-100
                         placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-1/4 rounded-lg bg-slate-800/70
                         border border-slate-700 px-4 py-2.5 text-slate-100
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={prioritySort}
              onChange={(e) => setPrioritySort(e.target.value)}
              className="w-full md:w-1/4 rounded-lg bg-slate-800/70
                         border border-slate-700 px-4 py-2.5 text-slate-100
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            >
              <option value="none">No Priority Sort</option>
              <option value="asc">Priority Low → High</option>
              <option value="desc">Priority High → Low</option>
            </select>
            <button
              onClick={() => navigate("/tasks/new")}
              className="w-full sm:w-auto px-3 py-2 rounded-lg font-medium
                         bg-linear-to-r from-indigo-500 to-violet-500
                         text-white hover:from-indigo-600 hover:to-violet-600
                         transition cursor-pointer"
            >
              Add Task
            </button>
          </div>

          {/* Tasks Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-slate-100">
              <thead>
                <tr className="bg-slate-800/70 text-left text-sm uppercase">
                  <th className="p-3">Title</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Created</th>
                  <th className="p-3">Assigned User</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-t border-slate-700 hover:bg-slate-800/50"
                  >
                    <td className="p-3">{task.title}</td>
                    <td className="p-3 capitalize">{task.priority}</td>
                    <td className="p-3 capitalize">{task.status}</td>
                    <td className="p-3 text-sm text-slate-400">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-sm text-slate-400">
                      {task.assignedUser
                        ? task.assignedUser.uname || task.assignedUser.email
                        : "Unassigned"}
                    </td>

                    <td className="p-3 text-sm text-slate-400">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-3 flex gap-2 flex-wrap">
                      <button
                        title="Edit"
                        onClick={() => navigate(`/tasks/edit/${task._id}`)}
                        className="bg-transparent text-white px-3 py-1 rounded-lg hover:bg-white/30 transition cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(task._id)}
                        className="bg-transparent text-white px-3 py-1 rounded-lg hover:bg-white/30 transition cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-slate-400">
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
