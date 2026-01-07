import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import profile from "../../public/profile.png";


export default function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [prioritySort, setPrioritySort] = useState("none");

  useEffect(() => {
    api.get("/tasks").then(res => {
      setTasks(res.data);
      setFilteredTasks(res.data);
    });
  }, []);

  useEffect(() => {
    let data = [...tasks];

    if (search) {
      data = data.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      data = data.filter(t => t.status === statusFilter);
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

  //fuction to handle delete
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

 // function handleDelete(id) {
 async function handleDelete(id) {
  const ok = window.confirm("Delete this task? This cannot be undone.");
  if (!ok) return;

  try {
    await api.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  } catch (err) {
    console.error(err);
    alert("Failed to delete task");
  }
}


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">My Tasks</h1>
           <div className="flex gap-2 cursor-pointer " onClick={() => navigate("/profile")}>
            <img src={profile} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            <h3>Profile</h3>

           </div>



        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full md:w-1/3"
          />

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full md:w-1/4"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={prioritySort}
            onChange={e => setPrioritySort(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full md:w-1/4"
          >
            <option value="none">No Priority Sort</option>
            <option value="asc">Priority Low → High</option>
            <option value="desc">Priority High → Low</option>
          </select>

        
          <button
            onClick={() => navigate("/tasks/new")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add Task
          </button>
          <button
            onClick={logout}
            className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm uppercase">
                <th className="p-3">Title</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
                <th className="p-3">Actions</th>

              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3 capitalize">{task.priority}</td>
                  <td className="p-3 capitalize">{task.status}</td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString()}

                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/tasks/edit/${task._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
