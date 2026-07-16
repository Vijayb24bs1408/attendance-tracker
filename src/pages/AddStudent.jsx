import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { addStudent } from "../services/studentService";

export default function AddStudent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    className: "",
    section: "",
    email: "",
    phone: "",
    gender: "",
  });

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !student.name ||
      !student.rollNo ||
      !student.className ||
      !student.section
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await addStudent(student);

      alert("Student Added Successfully ✅");

      navigate("/dashboard/students");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">

        <h1 className="text-3xl font-bold mb-6">
          Add Student
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

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

          <div>

            <label className="block mb-2 font-medium">
              Gender
            </label>

            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              className="w-full border rounded-xl h-11 px-3"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

          </div>

          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Add Student"}
            </button>

          </div>

        </form>

      </div>

    </DashboardLayout>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>

      <label className="block mb-2 font-medium">
        {label}
      </label>

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