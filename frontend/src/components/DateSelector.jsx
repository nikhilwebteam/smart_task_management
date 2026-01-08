export default function DateInput({
  label,
  name,
  value,
  onChange,
  error,
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  function handleDateChange(e) {
    const selected = new Date(e.target.value);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) {
      return; // hard stop (extra safety)
    }

    onChange(e);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>

      <input
        type="date"
        name={name}
        value={value}
        min={todayStr}
        onChange={handleDateChange}
        className="w-full rounded-lg bg-slate-800/70 border border-slate-700
                   px-4 py-2.5 text-slate-100
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:border-indigo-500 transition"
      />

      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
