import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getStudent, editStudent } from "../services/studentService";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    className: "",
    section: "",
    email: "",
    phone: "",
    gender: "",

    parentName: "",
    parentEmail: "",
    parentPhone: "",
  });
  const loadStudent = useCallback(async () => {
    try {
      const data = await getStudent(id);
      setStudent(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await editStudent(id, {
        name: student.name,
        rollNo: student.rollNo,
        className: student.className,
        section: student.section,
        email: student.email,
        phone: student.phone,
        gender: student.gender,

        parentName: student.parentName,
        parentEmail: student.parentEmail,
        parentPhone: student.parentPhone,
      });

      alert("Student Updated Successfully ✅");

      navigate("/dashboard/students");
    } catch (error) {
      alert(error.message);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">Loading Student...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Student</h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <Input
            label="Student Name"
            name="name"
            value={student.name}
            onChange={handleChange}
          />

          <Input
            label="Roll Number"
            name="rollNo"
            value={student.rollNo}
            onChange={handleChange}
          />

          <Input
            label="Class"
            name="className"
            value={student.className}
            onChange={handleChange}
          />

          <Input
            label="Section"
            name="section"
            value={student.section}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={student.email}
            onChange={handleChange}
          />

          <Input
            label="Phone"
            name="phone"
            value={student.phone}
            onChange={handleChange}
          />

          <Input
            label="Parent Name"
            name="parentName"
            value={student.parentName}
            onChange={handleChange}
          />

          <Input
            label="Parent Email"
            name="parentEmail"
            type="email"
            value={student.parentEmail}
            onChange={handleChange}
          />

          <Input
            label="Parent Phone"
            name="parentPhone"
            value={student.parentPhone}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-2 font-medium">Gender</label>

            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              className="w-full border rounded-xl h-11 px-3"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Update Student
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl h-11 px-3"
      />
    </div>
  );
}
