import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}

        <Navbar />

        {/* Content */}

        <main className="flex-1 overflow-y-auto p-6">

          {children}

        </main>

      </div>

    </div>
  );
}