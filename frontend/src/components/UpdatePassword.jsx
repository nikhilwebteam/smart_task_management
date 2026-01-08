import React, { useState } from 'react';
import api from '../api/axios';

const UpdatePassword = ({ setShowChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //handle password change
  async function handlePasswordChange(e) {
    e.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    try {
      const res = await api.put("/profile/password", {
        currentPassword,
        newPassword,
      });

      setPasswordMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");

      setTimeout(() => {
        setShowChangePassword(false);
      }, 1000);

    } catch (err) {
      setPasswordError(err.response?.data?.message || "Failed to update password");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
      <div className="bg-slate-900/80 backdrop-blur border border-slate-800
                      rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-slate-100 text-center">Change Password</h2>

        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg bg-slate-800/70 border border-slate-700
                       px-4 py-2.5 text-slate-100 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition"
            required
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full rounded-lg bg-slate-800/70 border border-slate-700
                       px-4 py-2.5 text-slate-100 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition"
            required
          />

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="w-full py-2 rounded-lg font-medium text-white
                         bg-linear-to-r from-indigo-500 to-violet-500
                         hover:from-indigo-600 hover:to-violet-600
                         transition"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => setShowChangePassword(false)}
              className="w-full py-2 rounded-lg font-medium text-slate-100
                         bg-slate-700 hover:bg-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>

        {passwordMessage && <p className="text-green-400 mt-2 text-center">{passwordMessage}</p>}
        {passwordError && <p className="text-red-400 mt-2 text-center">{passwordError}</p>}
      </div>
    </div>
  );
}

export default UpdatePassword;
