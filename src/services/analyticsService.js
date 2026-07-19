import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Analytics for a single student
export async function getStudentAttendanceAnalytics(studentId) {
  const attendanceRef = collection(db, "attendance");
  const snapshot = await getDocs(attendanceRef);

  let totalClasses = 0;
  let present = 0;
  let absent = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (data.studentId !== studentId) return;

    totalClasses++;

    if (data.status === "Present") {
      present++;
    } else {
      absent++;
    }
  });

  const attendancePercentage =
    totalClasses === 0
      ? 0
      : Number(((present / totalClasses) * 100).toFixed(1));

  return {
    totalClasses,
    present,
    absent,
    attendancePercentage,
  };
}