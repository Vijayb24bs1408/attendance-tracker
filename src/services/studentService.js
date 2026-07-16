import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const studentCollection = collection(db, "students");

// Add Student
export async function addStudent(student) {
  return await addDoc(studentCollection, {
    ...student,
    createdAt: serverTimestamp(),
  });
}

// Get Students
export async function getStudents() {
  const snapshot = await getDocs(studentCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Update Student
export async function updateStudent(id, data) {
  const studentRef = doc(db, "students", id);

  return await updateDoc(studentRef, data);
}

// Delete Student
export async function deleteStudent(id) {
  const studentRef = doc(db, "students", id);

  return await deleteDoc(studentRef);
}

// Get Single Student

export async function getStudent(id) {
  const studentRef = doc(db, "students", id);

  const snapshot = await getDoc(studentRef);

  if (!snapshot.exists()) {
    throw new Error("Student not found.");
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// Update Student

export async function editStudent(id, data) {
  const studentRef = doc(db, "students", id);

  return await updateDoc(studentRef, data);
}