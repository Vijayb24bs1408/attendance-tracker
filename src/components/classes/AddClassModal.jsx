import { useState } from "react";
import { createClass } from "../../services/classService";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function AddClassModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    className: "",
    room: "",
    day: "Monday",
    startTime: "",
    endTime: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (
      !form.subject ||
      !form.className ||
      !form.room ||
      !form.startTime ||
      !form.endTime
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createClass(form);

      alert("Class added successfully");

      setForm({
        subject: "",
        className: "",
        room: "",
        day: "Monday",
        startTime: "",
        endTime: "",
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Class</h2>

        <div className="space-y-4">
          <input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="className"
            placeholder="Class Name"
            value={form.className}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="room"
            placeholder="Room"
            value={form.room}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="day"
            value={form.day}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            {DAYS.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Start Time</label>

              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">End Time</label>

              <input
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-5 py-2 rounded-lg border">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Class"}
          </button>
        </div>
      </div>
    </div>
  );
}
