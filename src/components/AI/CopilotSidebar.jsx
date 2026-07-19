import {
  FaUserGraduate,
  FaChartBar,
  FaClipboardCheck,
  FaBell,
  FaBrain,
} from "react-icons/fa";

import { aiCategories } from "./aiQuestions";

const icons = {
  attendance: <FaClipboardCheck />,
  students: <FaUserGraduate />,
  reports: <FaChartBar />,
  analytics: <FaChartBar />,
  alerts: <FaBell />,
  insights: <FaBrain />,
};

export default function CopilotSidebar({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="w-72 border-r bg-gray-50 flex flex-col">
      {/* Title */}

      <div className="px-5 py-4 border-b bg-white">
        <h2 className="text-lg font-bold text-gray-900">Categories</h2>

        <p className="text-sm text-gray-500 mt-1">Choose a category</p>
      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto p-3">
        {aiCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-white hover:shadow"
            }`}
          >
            <span className="text-lg">{icons[category.id] || <FaBrain />}</span>

            <span className="font-medium">{category.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
