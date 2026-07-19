import { FaArrowLeft, FaFileImport, FaDownload, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ClassesHeader({
  onImport,
  onDownloadTemplate,
  onAddClass,
}) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      {/* Back */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <FaArrowLeft />
        Dashboard
      </button>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Classes</h1>

          <p className="mt-1 text-gray-500">
            Manage your classes and weekly timetable.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onImport}
            className="rounded-xl bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700"
          >
            <span className="flex items-center gap-2">
              <FaFileImport />
              Import Timetable
            </span>
          </button>

          <button
            onClick={onDownloadTemplate}
            className="rounded-xl border px-4 py-3 hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <FaDownload />
              Template
            </span>
          </button>

          <button
            onClick={onAddClass}
            className="rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
          >
            <span className="flex items-center gap-2">
              <FaPlus />
              Add Class
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
