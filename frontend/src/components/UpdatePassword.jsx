import React from 'react'
import { useState } from 'react';
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
   
  return (<>
      
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
      <h2 className="text-lg font-bold mb-4">Change Password</h2>

      <form onSubmit={handlePasswordChange} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <div className="flex gap-2 mt-2">
          <button className="bg-green-500 text-white py-2 rounded w-full">
            Update
          </button>
          <button
            type="button"
            onClick={() => setShowChangePassword(false)}
            className="bg-gray-300 py-2 rounded w-full"
          >
            Cancel
          </button>
        </div>
      </form>

      {passwordMessage && <p className="text-green-600 mt-2">{passwordMessage}</p>}
      {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
    </div>
  </div>
  </>)
}

export default UpdatePassword