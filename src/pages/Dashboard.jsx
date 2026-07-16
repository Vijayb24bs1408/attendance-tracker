import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { subscribeDashboardStats } from "../services/dashboardService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaUserGraduate,
  FaClipboardCheck,
  FaUserTimes,
  FaChartLine,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    present: 0,
    absent: 0,
    attendancePercentage: 0,
  });

  const chartData = [
    {
      name: "Present",
      value: Number(stats.present),
    },
    {
      name: "Absent",
      value: Number(stats.absent),
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeDashboardStats((data) => {
      setStats(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const cards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: <FaUserGraduate className="text-blue-600 text-2xl" />,
    },
    {
      title: "Present Today",
      value: stats.present,
      icon: <FaClipboardCheck className="text-green-600 text-2xl" />,
    },
    {
      title: "Absent Today",
      value: stats.absent,
      icon: <FaUserTimes className="text-red-600 text-2xl" />,
    },
    {
      title: "Attendance %",
      value: `${stats.attendancePercentage}%`,
      icon: <FaChartLine className="text-purple-600 text-2xl" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>

                  <h2 className="text-3xl font-bold mt-2 text-slate-800">
                    {loading ? "..." : item.value}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Attendance Overview</h2>

            <div className="h-[350px]">
              {loading ? (
                <div className="flex items-center justify-center h-full text-slate-500">
                  Loading Chart...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>

                    <Tooltip />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Recent Activity */}

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

            <div className="space-y-3 text-slate-600">
              <p>👨‍🎓 Students loaded from Firebase</p>

              <p>✅ Attendance connected with Firestore</p>

              <p>📊 Dashboard statistics are live</p>

              <p>🚀 Ready for Reports Module</p>
            </div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/dashboard/add-student")}
                className="h-14 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                Add Student
              </button>

              <button
                onClick={() => navigate("/dashboard/attendance")}
                className="h-14 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
              >
                Mark Attendance
              </button>

              <button
                onClick={() => navigate("/dashboard/reports")}
                className="h-14 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
              >
                View Reports
              </button>

              <button
                onClick={() => navigate("/dashboard/classes")}
                className="h-14 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600"
              >
                Manage Classes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
