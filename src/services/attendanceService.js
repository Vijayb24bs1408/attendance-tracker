import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// Save Attendance

export async function saveAttendance(students) {
  const today = new Date().toISOString().split("T")[0];

  for (const student of students) {
    const q = query(
      collection(db, "attendance"),
      where("studentId", "==", student.id),
      where("date", "==", today)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const attendanceDoc = snapshot.docs[0];

      await updateDoc(doc(db, "attendance", attendanceDoc.id), {
        status: student.status,
      });

      continue;
    }

    await addDoc(collection(db, "attendance"), {
      studentId: student.id,
      studentName: student.name,
      rollNo: student.rollNo,
      className: student.className,
      section: student.section,
      status: student.status,
      date: today,
      createdAt: serverTimestamp(),
    });
  }
}

// Get Attendance By Date

export async function getAttendanceByDate(date) {
  const q = query(
    collection(db, "attendance"),
    where("date", "==", date)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}