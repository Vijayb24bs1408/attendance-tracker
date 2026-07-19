import { FaRobot, FaStar } from "react-icons/fa";
import { MdHistory } from "react-icons/md";

export default function CopilotHeader() {
  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <FaRobot className="text-blue-600 text-lg" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900">
            AI Teacher Copilot
          </h1>

          <p className="text-xs text-gray-500">Smart attendance assistant</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 transition">
          <FaStar className="text-yellow-500" />
          Favorites
        </button>

        <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 transition">
          <MdHistory />
          History
        </button>
      </div>
    </div>
  );
}
