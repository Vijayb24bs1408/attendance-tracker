import { useState } from "react";
import { FaSchool, FaUniversity } from "react-icons/fa";

export default function InstitutionSelector() {
  const [selected, setSelected] = useState("school");

  return (
    <div className="mb-3">

      <label className="block text-[13px] font-semibold text-slate-700 mb-2">
        Institution Type
      </label>

      <div className="grid grid-cols-2 gap-3">

        {/* School */}

        <button
          type="button"
          onClick={() => setSelected("school")}
          className={`h-[64px] rounded-xl border flex flex-col items-center justify-center transition-all duration-300
          ${
            selected === "school"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white border-slate-300 hover:border-blue-500 hover:bg-blue-50"
          }`}
        >
          <FaSchool size={18} />

          <span className="mt-1 text-sm font-semibold">
            School
          </span>

        </button>

        {/* College */}

        <button
          type="button"
          onClick={() => setSelected("college")}
          className={`h-[64px] rounded-xl border flex flex-col items-center justify-center transition-all duration-300
          ${
            selected === "college"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white border-slate-300 hover:border-blue-500 hover:bg-blue-50"
          }`}
        >
          <FaUniversity size={18} />

          <span className="mt-1 text-sm font-semibold">
            College
          </span>

        </button>

      </div>

    </div>
  );
}