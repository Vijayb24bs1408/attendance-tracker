import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// Collection Reference
const classRef = collection(db, "classes");

// Add Class
export async function createClass(data) {
  const docRef = await addDoc(classRef, {
    ...data,
    createdAt: new Date(),
  });

  return docRef.id;
}

// Get All Classes
export async function getClasses() {
  const snapshot = await getDocs(classRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get Today's Classes
export async function getTodayClasses(day) {
  const q = query(classRef, where("day", "==", day));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Update Class
export async function updateClass(id, data) {
  await updateDoc(doc(db, "classes", id), data);
}

// Delete Class
export async function deleteClass(id) {
  await deleteDoc(doc(db, "classes", id));
}

// Delete All Classes
export async function deleteAllClasses() {
  const snapshot = await getDocs(classRef);

  console.log("Documents found:", snapshot.size);

  for (const document of snapshot.docs) {
    console.log("Deleting:", document.id);

    await deleteDoc(doc(db, "classes", document.id));
  }

  console.log("All documents deleted.");
}