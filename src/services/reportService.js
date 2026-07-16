import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getAttendanceReport(date) {
  const q = query(
    collection(db, "attendance"),
    where("date", "==", date)
  );

  const snapshot = await getDocs(q);

  const students = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const present = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absent = students.filter(
    (student) => student.status === "Absent"
  ).length;

  return {
    students,
    total: students.length,
    present,
    absent,
    percentage:
      students.length === 0
        ? 0
        : ((present / students.length) * 100).toFixed(1),
  };
}