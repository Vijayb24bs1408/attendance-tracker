import {
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <header className="h-[72px] bg-white border-b border-slate-200 px-8 flex items-center justify-between">

      {/* Left */}

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative hidden md:block">

          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-10 rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />

        </div>

        {/* Notification */}

        <button className="relative w-10 h-10 rounded-xl border border-slate-300 flex items-center justify-center hover:bg-slate-100">

          <FaBell />

          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <FaUserCircle
            size={38}
            className="text-slate-600"
          />

          <div className="hidden md:block">

            <p className="font-semibold text-slate-800">

              {currentUser?.email?.split("@")[0] || "Admin"}

            </p>

            <p className="text-xs text-slate-500">

              {currentUser?.email || "admin@example.com"}

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}