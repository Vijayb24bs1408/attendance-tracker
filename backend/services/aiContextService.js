const { db } = require("../config/firebaseAdmin");

async function getAIContext() {
  const today = new Date().toISOString().split("T")[0];

  // Fetch collections in parallel
  const [studentsSnap, attendanceSnap, alertsSnap] = await Promise.all([
    db.collection("students").get(),
    db.collection("attendance").where("date", "==", today).get(),
    db.collection("alerts").get(),
  ]);

  const students = studentsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const attendance = attendanceSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const alerts = alertsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const present = attendance.filter((a) => a.status === "Present").length;
  const absent = attendance.filter((a) => a.status === "Absent").length;

  const criticalStudents = alerts
    .filter((a) => a.riskLevel === "Critical")
    .map((a) => ({
      name: a.studentName,
      attendancePercentage: a.attendancePercentage,
      riskLevel: a.riskLevel,
    }));

  return {
    date: today,
    totalStudents: students.length,
    present,
    absent,
    students,
    attendance,
    alerts,
    criticalStudents,
  };
}

module.exports = {
  getAIContext,
};