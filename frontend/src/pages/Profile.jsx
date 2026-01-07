import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import avatar from "../../public/profile.png";
import UpdatePassword from "../components/UpdatePassword.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    api.get("/profile")
      .then(res => setUser(res.data.user))
      .catch(err => {
        console.error(err);
        setError("Failed to load profile");
      })
      .finally(() => setLoading(false));
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (loading) return <p className="p-10 text-center text-slate-100">Loading profile...</p>;
  if (error) return <p className="p-10 text-center text-red-400">{error}</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex justify-center items-center
                    bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900
                    px-4 py-8">
      <div className="bg-slate-900/80 backdrop-blur border border-slate-800
                      shadow-2xl rounded-2xl p-8 w-full max-w-md text-center space-y-4">
        <img
          src={avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 border border-slate-700 object-cover"
        />

        <h1 className="text-2xl font-bold text-slate-100">{user.uname}</h1>
        <p className="text-slate-400 mb-6">{user.email}</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/tasks")}
            className="w-full py-3 rounded-lg font-medium text-white
                       bg-gradient-to-r from-indigo-500 to-violet-500
                       hover:from-indigo-600 hover:to-violet-600
                       transition"
          >
            Go to Tasks
          </button>

          <button
            onClick={logout}
            className="w-full py-3 rounded-lg font-medium text-white
                       bg-red-500 hover:bg-red-600 transition"
          >
            Logout
          </button>

          <button
            onClick={() => setShowChangePassword(true)}
            className="w-full py-3 rounded-lg font-medium text-white
                       bg-yellow-500 hover:bg-yellow-600 transition"
          >
            Change Password
          </button>
        </div>
      </div>

      {showChangePassword && (
        <UpdatePassword setShowChangePassword={setShowChangePassword} />
      )}
    </div>
  );
}
