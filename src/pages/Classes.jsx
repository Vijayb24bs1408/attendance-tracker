import { useEffect, useMemo, useState } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPlay } from "react-icons/fa";

import AddClassModal from "../components/classes/AddClassModal";
import ClassesHeader from "../components/classes/ClassesHeader";
import { downloadClassTemplate } from "../utils/downloadTemplate";
import ImportTimetableModal from "../components/classes/ImportTimetableModal";
import {
  getClasses,
  createClass,
  deleteAllClasses,
} from "../services/classService";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const loadClasses = async () => {
    try {
      setLoading(true);
      const data = await getClasses();
      setClasses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (rows) => {
    try {
      console.log("========== IMPORT START ==========");
      console.log("Rows to import:", rows.length);

      // Delete old timetable
      console.log("Deleting old classes...");
      await deleteAllClasses();
      console.log("Old classes deleted.");

      // Import new timetable
      for (const row of rows) {
        console.log("Importing:", row);

        await createClass({
          date: row.Date?.toString().trim(),
          day: row.Day?.toString().trim(),
          subject: row.Subject?.toString().trim(),
          className: row.Class?.toString().trim(),
          room: row.Room?.toString().trim(),
          startTime: row["Start Time"]?.toString().trim(),
          endTime: row["End Time"]?.toString().trim(),
        });
      }

      console.log("Loading latest classes...");
      await loadClasses();

      console.log("========== IMPORT COMPLETE ==========");

      alert(`Timetable replaced successfully!
Imported ${rows.length} classes.`);

      setShowImportModal(false);
    } catch (err) {
      console.error("IMPORT ERROR:", err);
      alert(err.message);
    }
  };
  useEffect(() => {
    loadClasses();
  }, []);

  const todayDate = useMemo(() => {
    return new Date().toLocaleDateString("en-CA");
  }, []);

  const todayClasses = useMemo(() => {
    return classes.filter((cls) => cls.date === todayDate);
  }, [classes, todayDate]);
  const formatTime = (time) => {
    if (!time) return "";
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedClasses = useMemo(() => {
    return [...classes].sort((a, b) => {
      if (a.date && b.date && a.date !== b.date) {
        return new Date(a.date) - new Date(b.date);
      }

      return (a.startTime || "").localeCompare(b.startTime || "");
    });
  }, [classes]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <ClassesHeader
        onAddClass={() => setShowModal(true)}
        onImport={() => setShowImportModal(true)}
        onDownloadTemplate={downloadClassTemplate}
      />

      {/* Today's Classes */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Today's Classes</h2>

        {loading ? (
          <p>Loading...</p>
        ) : todayClasses.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-gray-500">
            No classes scheduled for today.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {todayClasses.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold">{item.className}</h3>

                <p className="mt-2 text-gray-600">{item.subject}</p>

                <div className="mt-5 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaClock />
                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    {item.room}
                  </div>
                </div>

                <button className="mt-6 flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-white hover:bg-green-700 transition">
                  <FaPlay />
                  Start Attendance
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Timetable */}
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b p-5">
          <FaCalendarAlt className="text-blue-600" />
          <h2 className="text-xl font-semibold">Weekly Timetable</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Day</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Class</th>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Room</th>
              </tr>
            </thead>

            <tbody>
              {sortedClasses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No classes found.
                  </td>
                </tr>
              ) : (
                sortedClasses.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      {item.day}
                      {item.date && (
                        <div className="text-xs text-gray-500">{item.date}</div>
                      )}
                    </td>

                    <td className="p-4">
                      {formatTime(item.startTime)} - {formatTime(item.endTime)}
                    </td>

                    <td className="p-4">{item.className}</td>

                    <td className="p-4">{item.subject}</td>

                    <td className="p-4">{item.room}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ImportTimetableModal
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
      />

      <AddClassModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={loadClasses}
      />
    </div>
  );
}
