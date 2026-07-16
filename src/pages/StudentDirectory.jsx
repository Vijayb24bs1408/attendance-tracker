import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getStudents, deleteStudent } from "../services/studentService";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StudentDirectory() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getStudents();

      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      await loadStudents();

      alert("Student deleted successfully.");
    } catch (error) {
      alert(error.message);
    }
  };

  function handleSearch(e) {
    const value = e.target.value;

    setSearch(value);

    const filtered = students.filter(
      (student) =>
        student.name?.toLowerCase().includes(value.toLowerCase()) ||
        student.rollNo?.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredStudents(filtered);
  }

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Student Directory</h1>

            <p className="text-slate-500 mt-1">
              Total Students : {filteredStudents.length}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search by Name or Roll No"
              value={search}
              onChange={handleSearch}
              className="w-full h-11 pl-10 pr-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {loading && (
          <p className="text-center py-10 text-slate-500">
            Loading students...
          </p>
        )}

        {!loading && filteredStudents.length === 0 && (
          <p className="text-center py-10 text-slate-500">No students found.</p>
        )}

        {!loading && filteredStudents.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Roll No</th>
                  <th className="text-left p-3">Class</th>
                  <th className="text-left p-3">Section</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-center p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.rollNo}</td>
                    <td className="p-3">{student.className}</td>
                    <td className="p-3">{student.section}</td>
                    <td className="p-3">{student.email}</td>

                    <td className="p-3">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/edit-student/${student.id}`)
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDelete(student.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
