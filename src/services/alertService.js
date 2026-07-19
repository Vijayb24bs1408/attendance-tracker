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

const alertCollection = collection(db, "parentAlerts");

// Create or Update Alert
export async function createAlert(alert) {
  const q = query(
    alertCollection,
    where("studentId", "==", alert.studentId),
    where("date", "==", alert.date)
  );

  const snapshot = await getDocs(q);

  // Alert already exists → Update it
  if (!snapshot.empty) {
    const existingDoc = snapshot.docs[0];

    await updateDoc(doc(db, "parentAlerts", existingDoc.id), {
      ...alert,
      updatedAt: serverTimestamp(),
    });

    return;
  }

  // No alert found → Create new
  await addDoc(alertCollection, {
    ...alert,
    sent: false,
    createdAt: serverTimestamp(),
  });
}

// Get Today's Alerts
export async function getTodayAlerts() {
  const today = new Date().toISOString().split("T")[0];

  const q = query(
    alertCollection,
    where("date", "==", today)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}