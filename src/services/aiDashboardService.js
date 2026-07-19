import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { calculateRisk } from "../utils/aiRiskEngine";

export async function getAIInsights() {
  const studentsSnapshot = await getDocs(collection(db, "students"));
  const attendanceSnapshot = await getDocs(collection(db, "attendance"));

  const students = studentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  let excellent = 0;
  let low = 0;
  let medium = 0;
  let high = 0;
  let critical = 0;

  let totalAttendance = 0;
  let bestStudent = null;
  let bestPercentage = -1;

  for (const student of students) {
    let total = 0;
    let present = 0;

    attendanceSnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.studentId !== student.id) return;

      total++;

      if (data.status === "Present") {
        present++;
      }
    });

    const percentage =
      total === 0 ? 0 : Number(((present / total) * 100).toFixed(1));

    totalAttendance += percentage;

    if (percentage > bestPercentage) {
      bestPercentage = percentage;
      bestStudent = student.name;
    }

    const risk = calculateRisk(percentage);

    switch (risk.riskLevel) {
      case "Excellent":
        excellent++;
        break;
      case "Low":
        low++;
        break;
      case "Medium":
        medium++;
        break;
      case "High":
        high++;
        break;
      default:
        critical++;
    }
  }

  return {
    excellent,
    low,
    medium,
    high,
    critical,

    averageAttendance:
      students.length === 0
        ? 0
        : Number((totalAttendance / students.length).toFixed(1)),

    bestStudent,
    bestPercentage,
  };
}