import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getAttendanceReport } from "../services/reportService";
import { FaSearch } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Reports() {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [search, setSearch] = useState("");

  const [report, setReport] = useState({
    students: [],
    total: 0,
    present: 0,
    absent: 0,
    percentage: 0,
  });

  const [filteredStudents, setFilteredStudents] = useState([]);

  const loadReport = useCallback(async () => {
    try {
      const data = await getAttendanceReport(date);

      setReport(data);
      setFilteredStudents(data.students);
    } catch (error) {
      alert(error.message);
    }
  }, [date]);

  useEffect(() => {
    loadReport();
  }, [loadReport]);
  function handleSearch(e) {
    const value = e.target.value;

    setSearch(value);

    const filtered = report.students.filter(
      (student) =>
        student.studentName?.toLowerCase().includes(value.toLowerCase()) ||
        student.rollNo?.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredStudents(filtered);
  }

  function downloadPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Attendance Report", 14, 18);

    doc.setFontSize(11);

    doc.text(`Date: ${date}`, 14, 30);
    doc.text(`Total Students: ${report.total}`, 14, 38);
    doc.text(`Present: ${report.present}`, 14, 46);
    doc.text(`Absent: ${report.absent}`, 14, 54);
    doc.text(`Attendance: ${report.percentage}%`, 14, 62);

    autoTable(doc, {
      startY: 72,
      head: [["Name", "Roll No", "Class", "Section", "Status"]],
      body: filteredStudents.map((student) => [
        student.studentName,
        student.rollNo,
        student.className,
        student.section,
        student.status,
      ]),
    });

    doc.save(`Attendance_Report_${date}.pdf`);
  }

  function downloadExcel() {
    const excelData = filteredStudents.map((student) => ({
      Name: student.studentName,
      "Roll No": student.rollNo,
      Class: student.className,
      Section: student.section,
      Status: student.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, `Attendance_Report_${date}.xlsx`);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Attendance Reports</h1>

              <p className="text-slate-500 mt-1">
                View attendance reports by date
              </p>
            </div>

            <div className="flex gap-3">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-xl h-11 px-4"
              />

              <button
                onClick={downloadPDF}
                className="px-5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700"
              >
                Download PDF
              </button>

              <button
                onClick={downloadExcel}
                className="px-5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                Download Excel
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <Card title="Total" value={report.total} />

          <Card title="Present" value={report.present} />

          <Card title="Absent" value={report.absent} />

          <Card title="Attendance %" value={`${report.percentage}%`} />
        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="relative max-w-md mb-6">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={handleSearch}
              placeholder="Search Student"
              className="w-full h-11 border rounded-xl pl-10 pr-4"
            />
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 text-left">Name</th>

                  <th className="p-3 text-left">Roll No</th>

                  <th className="p-3 text-left">Class</th>

                  <th className="p-3 text-left">Section</th>

                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">{student.studentName}</td>

                    <td className="p-3">{student.rollNo}</td>

                    <td className="p-3">{student.className}</td>

                    <td className="p-3">{student.section}</td>

                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          student.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-slate-500">{title}</p>

      <h2 className="text-3xl font-bold mt-3">{value}</h2>
    </div>
  );
}
