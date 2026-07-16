import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export function subscribeDashboardStats(callback) {
  const today = new Date().toISOString().split("T")[0];

  const studentsRef = collection(db, "students");

  const attendanceRef = query(
    collection(db, "attendance"),
    where("date", "==", today)
  );

  let totalStudents = 0;
  let present = 0;
  let absent = 0;

  const unsubscribeStudents = onSnapshot(studentsRef, (snapshot) => {
    totalStudents = snapshot.size;

    callback({
      totalStudents,
      present,
      absent,
      attendancePercentage:
        totalStudents === 0
          ? 0
          : ((present / totalStudents) * 100).toFixed(1),
    });
  });

  const unsubscribeAttendance = onSnapshot(attendanceRef, (snapshot) => {
    console.log("Attendance Docs:", snapshot.size);
    present = 0;
    absent = 0;

    snapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
      const data = doc.data();

      if (data.status === "Present") {
        present++;
      } else {
        absent++;
      }
    });

    callback({
      totalStudents,
      present,
      absent,
      attendancePercentage:
        totalStudents === 0
          ? 0
          : ((present / totalStudents) * 100).toFixed(1),
    });
  });

  return () => {
    unsubscribeStudents();
    unsubscribeAttendance();
  };
}