import { useEffect, useRef, useState } from "react";
import api from "../api/axios";

export default function UserSelect({
  label = "Assign To",
  name = "assignedUser",
  value,
  onChange,
  error,
})

{
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedUser = users.find(u => u._id === value);

  const filteredUsers = users.filter(user =>
    (user.uname || user.email)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function selectUser(user) {
    onChange({
      target: {
        name,
        value: user._id,
      },
    });
    setSearch("");
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>

      <div
        onClick={() => setOpen(true)}
        className="w-full rounded-lg bg-slate-800/70 border border-slate-700
                   px-4 py-2.5 text-slate-100 cursor-text
                   focus-within:ring-2 focus-within:ring-indigo-500"
      >
        <input
          type="text"
          placeholder="Search users..."
          value={search || selectedUser?.uname || selectedUser?.email || ""}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setSearch("");
            setOpen(true);
          }}
          className="w-full bg-transparent outline-none placeholder-slate-500"
        />
      </div>

      {open && (
        <div
          className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto
                     rounded-lg bg-slate-900 border border-slate-700 shadow-lg"
        >
          {filteredUsers.length === 0 && (
            <div className="px-4 py-2 text-slate-400 text-sm">
              No users found
            </div>
          )}

          {filteredUsers.map(user => (
            <div
              key={user._id}
              onClick={() => selectUser(user)}
              className="px-4 py-2 cursor-pointer text-slate-100
                         hover:bg-indigo-500/10"
            >
              <div className="font-medium">
                {user.uname || "Unnamed User"}
              </div>
              <div className="text-xs text-slate-400">
                {user.email}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
