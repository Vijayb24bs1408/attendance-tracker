import { createAlert } from "../services/alertService";
import { generateParentAlert } from "./aiMessageGenerator";
import { getStudentAttendanceAnalytics } from "../services/analyticsService";
import { calculateRisk } from "./aiRiskEngine";

export async function generateAlerts(students) {
  for (const student of students) {
  console.log("Student inside generateAlerts:", student);
    // Get real attendance analytics
    const analytics = await getStudentAttendanceAnalytics(student.id);

    const attendancePercentage = analytics.attendancePercentage;

    // Calculate AI Risk
    const risk = calculateRisk(attendancePercentage);

    // Generate AI Parent Message
    const ai = generateParentAlert(
      student,
      student.status,
      attendancePercentage
    );

const alertData = {
  studentId: student.id,
  studentName: student.name,

  parentName: student.parentName || "Parent",
  parentEmail: student.parentEmail || "",
  parentPhone: student.parentPhone || "",

  attendanceStatus: student.status,
  attendancePercentage,

  priority: ai.priority,

  riskScore: risk.riskScore,
  riskLevel: risk.riskLevel,
  recommendation: risk.recommendation,

  message: ai.message,

  date: new Date().toISOString().split("T")[0],
};

console.log("Alert being saved:", alertData);

await createAlert(alertData);

    // Save Alert
    await createAlert({
      studentId: student.id,
      studentName: student.name,

      parentName: student.parentName || "Parent",
parentEmail: student.parentEmail || "",
parentPhone: student.parentPhone || "",

      attendanceStatus: student.status,
      attendancePercentage,

      priority: ai.priority,

      riskScore: risk.riskScore,
      riskLevel: risk.riskLevel,
      recommendation: risk.recommendation,

      message: ai.message,

      date: new Date().toISOString().split("T")[0],
    });
  }
}