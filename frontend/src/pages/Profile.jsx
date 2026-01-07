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

  if (loading) return <p className="p-10 text-center">Loading profile...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">

        <img
          src={avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 border object-cover"
        />

        <h1 className="text-2xl font-bold">{user.uname}</h1>
        <p className="text-gray-500 mb-6">{user.email}</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/tasks")}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go to Tasks
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
          <button
  onClick={() => setShowChangePassword(true)}
  className="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
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



