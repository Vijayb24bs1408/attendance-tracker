import { useState } from "react";
import * as XLSX from "xlsx";

export default function ImportTimetableModal({ open, onClose, onImport }) {
  const [rows, setRows] = useState([]);

  if (!open) return null;

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, {
        type: "binary",
      });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(sheet);

      console.log(data);

      setRows(data);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold">Import Timetable</h2>

        <p className="text-gray-500 mb-6">Upload Excel timetable</p>

        <input type="file" accept=".xlsx,.xls" onChange={handleFile} />

        {rows.length > 0 && (
          <div className="mt-6 border rounded-lg max-h-64 overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(rows[0]).map((key) => (
                    <th key={key} className="p-2 border">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.slice(0, 5).map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="border p-2">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border rounded-lg px-4 py-2">
            Close
          </button>

          <button
            disabled={rows.length === 0}
            onClick={() => onImport(rows)}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 disabled:bg-gray-400"
          >
            Import Classes
          </button>
        </div>
      </div>
    </div>
  );
}
