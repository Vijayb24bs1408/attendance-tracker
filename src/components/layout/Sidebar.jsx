import {
  FaHome,
  FaUserGraduate,
  FaClipboardCheck,
  FaChartBar,
  FaSchool,
  FaRobot,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Students",
    path: "/dashboard/students",
    icon: <FaUserGraduate />,
  },
  {
    name: "Attendance",
    path: "/dashboard/attendance",
    icon: <FaClipboardCheck />,
  },
  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: <FaChartBar />,
  },
  {
    name: "Classes",
    path: "/dashboard/classes",
    icon: <FaSchool />,
  },
  {
    name: "Smart Parent Alerts",
    path: "/dashboard/parent-alerts",
    icon: <FaRobot />,
  },
  {
    name: "AI Teacher Copilot",
    path: "/dashboard/ai-assistant",
    icon: <FaRobot />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <FaCog />,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutUser();
      navigate("/", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <aside className="w-[260px] h-screen bg-slate-900 text-white flex flex-col overflow-hidden">
      {/* Logo */}

      <div className="px-6 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">Attendance</h1>

        <p className="text-sm text-slate-400">Tracker</p>
      </div>

      {/* Menu */}

      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}

      <div className="shrink-0 border-t border-slate-800 p-4 bg-slate-900">
        <div className="flex items-center gap-3 mb-4">
          <FaUserCircle size={36} />

          <div>
            <p className="font-semibold">Admin</p>

            <p className="text-xs text-slate-400">administrator</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 py-2.5 text-sm font-medium hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
