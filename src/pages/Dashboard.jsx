import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { subscribeDashboardStats } from "../services/dashboardService";
import AcademicCalendar from "../components/dashboard/AcademicCalendar";
import { getAIInsights } from "../services/aiDashboardService";
import { getClassHealth } from "../services/aiHealthService";
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

  const [aiInsights, setAiInsights] = useState({
    excellent: 0,
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
    averageAttendance: 0,
    bestStudent: "-",
    bestPercentage: 0,
  });
  const health = getClassHealth(aiInsights);

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

    async function loadAIInsights() {
      try {
        const data = await getAIInsights();
        setAiInsights(data);
      } catch (error) {
        console.error("AI Insights Error:", error);
      }
    }

    loadAIInsights();

    return () => unsubscribe();
  }, []);

  const todaySchedule = [
    {
      id: 1,
      time: "09:00 AM - 10:00 AM",
      subject: "Applied AI",
      className: "BSc AI - A",
      room: "Room A101",
    },
    {
      id: 2,
      time: "11:00 AM - 12:00 PM",
      subject: "Machine Learning",
      className: "BSc AI - B",
      room: "Room A102",
    },
    {
      id: 3,
      time: "02:00 PM - 03:00 PM",
      subject: "Data Science",
      className: "BSc DS - A",
      room: "Lab 2",
    },
  ];

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
        {/* Today's Schedule */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Today's Schedule</h2>
              <p className="text-slate-500">Your classes scheduled for today</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {todaySchedule.map((cls) => (
              <div
                key={cls.id}
                className="rounded-xl border border-slate-200 p-5 hover:shadow-md transition"
              >
                <p className="text-blue-600 font-semibold">{cls.time}</p>

                <h3 className="text-xl font-bold mt-2">{cls.subject}</h3>

                <p className="text-slate-600 mt-1">{cls.className}</p>

                <p className="text-sm text-slate-500">{cls.room}</p>

                <button
                  onClick={() => navigate("/dashboard/attendance")}
                  className="mt-5 w-full rounded-lg bg-green-600 py-2 text-white font-semibold hover:bg-green-700"
                >
                  Start Attendance
                </button>
              </div>
            ))}
          </div>
        </div>
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
        {/* Dashboard Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pie Chart */}

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

          {/* Academic Calendar */}
          <AcademicCalendar />
        </div>
        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Recent Activity */}

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

            <div className="space-y-3 text-slate-600">
              <p>👨‍🎓 {stats.totalStudents} Students Registered</p>

              <p>✅ {stats.present} Students Present Today</p>

              <p>❌ {stats.absent} Students Absent Today</p>

              <p>📊 Attendance {stats.attendancePercentage}%</p>
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
        {/* AI Analytics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-6">
          <h2 className="text-2xl font-bold mb-6">
            🤖 AI Attendance Analytics
          </h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            <AICard
              title="Excellent"
              value={aiInsights.excellent}
              color="bg-green-500"
            />

            <AICard
              title="Low Risk"
              value={aiInsights.low}
              color="bg-emerald-500"
            />

            <AICard
              title="Medium Risk"
              value={aiInsights.medium}
              color="bg-yellow-500"
            />

            <AICard
              title="High Risk"
              value={aiInsights.high}
              color="bg-orange-500"
            />

            <AICard
              title="Critical"
              value={aiInsights.critical}
              color="bg-red-600"
            />

            <AICard
              title="Average"
              value={`${aiInsights.averageAttendance}%`}
              color="bg-blue-600"
            />
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-5">
            <h3 className="font-semibold text-lg">🏆 Best Student</h3>

            <p className="mt-2 text-slate-700">
              <strong>{aiInsights.bestStudent}</strong> (
              {aiInsights.bestPercentage}% Attendance)
            </p>
          </div>

          <div className="mt-5 rounded-xl bg-blue-50 border border-blue-200 p-5">
            <h3 className="font-semibold text-lg">💡 AI Insight</h3>

            <p className="mt-2 text-slate-700">
              {aiInsights.critical > 0
                ? `There are ${aiInsights.critical} critical students requiring immediate intervention.`
                : "Excellent! No critical students found today."}
            </p>
          </div>
        </div>
        {/* 🤖 AI Class Health Score */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-3xl font-bold">🤖 AI Class Health Score</h2>

          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg">Health Score</p>

              <h1 className="text-6xl font-bold mt-2">{health.score}/100</h1>

              <p className="text-2xl mt-3">{health.level}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">AI Recommendations</h3>

              <ul className="space-y-3">
                {health.recommendations.map((item, index) => (
                  <li key={index}>✅ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
function AICard({ title, value, color }) {
  return (
    <div className="rounded-xl border p-4">
      <div className={`w-4 h-4 rounded-full ${color}`} />

      <h3 className="mt-3 text-slate-500">{title}</h3>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
