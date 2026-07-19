import { FaExclamationTriangle, FaUserGraduate } from "react-icons/fa";

export default function StudentRiskCard({
  students = [
    {
      name: "Rahul Sharma",
      attendance: 62,
    },
    {
      name: "Aman Verma",
      attendance: 68,
    },
    {
      name: "Priya Singh",
      attendance: 71,
    },
  ],
}) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-5">
      <div className="flex items-center gap-3 mb-4">
        <FaExclamationTriangle className="text-red-600 text-2xl" />

        <div>
          <h2 className="font-bold text-lg">Students at Risk</h2>

          <p className="text-gray-500 text-sm">Attendance below 75%</p>
        </div>
      </div>

      <div className="space-y-3">
        {students.map((student, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <FaUserGraduate className="text-blue-600" />

              <div>
                <div className="font-semibold">{student.name}</div>

                <div className="text-gray-500 text-sm">Needs attention</div>
              </div>
            </div>

            <div className="text-red-600 font-bold text-xl">
              {student.attendance}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
