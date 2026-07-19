import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getStudents } from "../services/studentService";
import { saveAttendance } from "../services/attendanceService";
import { generateAlerts } from "../utils/generateAlerts";

export default function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const data = await getStudents();

      const attendanceData = data.map((student) => ({
        ...student,
        status: "Present",
      }));

      setStudents(attendanceData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function changeStatus(id, status) {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student,
      ),
    );
  }
  async function handleSaveAttendance() {
    try {
      console.log("Saving attendance...");
      console.log(students);

      await saveAttendance(students);

      console.log("Attendance saved successfully");

      // 🔥 IMPORTANT
      console.log("Students passed to generateAlerts:", students);

      await generateAlerts(students);

      console.log("AI Alerts generated successfully");

      alert("Attendance and AI alerts generated successfully.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Mark Attendance</h1>

            <p className="text-slate-500 mt-1">
              {new Date().toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={handleSaveAttendance}
            className="px-6 h-11 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Save Attendance
          </button>
        </div>

        {loading ? (
          <p className="text-center py-10">Loading Students...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b">
                  <th className="text-left p-3">Name</th>

                  <th className="text-left p-3">Roll No</th>

                  <th className="text-left p-3">Class</th>

                  <th className="text-left p-3">Section</th>

                  <th className="text-center p-3">Attendance</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">{student.name}</td>

                    <td className="p-3">{student.rollNo}</td>

                    <td className="p-3">{student.className}</td>

                    <td className="p-3">{student.section}</td>

                    <td className="p-3">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => changeStatus(student.id, "Present")}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                            student.status === "Present"
                              ? "bg-green-600 text-white"
                              : "bg-slate-200"
                          }`}
                        >
                          Present
                        </button>

                        <button
                          onClick={() => changeStatus(student.id, "Absent")}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                            student.status === "Absent"
                              ? "bg-red-600 text-white"
                              : "bg-slate-200"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
