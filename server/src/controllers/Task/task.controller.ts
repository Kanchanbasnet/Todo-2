import { Request, Response } from "express";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const createTaskByUserId = async (req: Request, res: Response) => {
  try {
    const { email, title } = req.body;
    const user = query(collection(db, "users"), where("email", "==", email));
    const userSnapshot = await getDocs(user);

    if (userSnapshot.empty) {
      throw new Error("User not found.");
    }

    const userDoc = userSnapshot.docs[0];
    const userref = doc(db, "users", userDoc.id);

    await addDoc(collection(userref, "tasks"), {
      title,
      completed: false,
      createdAt: new Date(),
    });
    res.status(201).json({ message: "Task created successfully." });
  } catch (error) {
    console.error("Error creating task:::", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTasksByUserId = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const user = query(collection(db, "users"), where("email", "==", email));
    const userSnapShot = await getDocs(user);
    if (userSnapShot.empty) {
      throw new Error("User not found.");
    }
    const userDoc = userSnapShot.docs[0];
    const userRef = doc(db, "users", userDoc.id);
    const tasks = await getDocs(collection(userRef, "tasks"));
    const taskData = tasks.docs.map((taskDoc) => ({
      ...taskDoc.data(),
      id: taskDoc.id,
    }));
    res
      .status(200)
      .json({ message: "Tasks fetched successfully.", tasks: taskData });
  } catch (error) {
    console.error("Error fetching tasks:::", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserTaskById = async (req: Request, res: Response) => {
  try {
    const { email, taskId, title } = req.body;

    const user = query(collection(db, "users"), where("email", "==", email));
    const userSnapShot = await getDocs(user);
    if (userSnapShot.empty) {
      throw new Error("User not found.");
    }
    const userDoc = userSnapShot.docs[0];
    const userRef = doc(db, "users", userDoc.id);

    const taskref = doc(userRef, "tasks", taskId);
    await updateDoc(taskref, {
      title,
      completed: false,
      updateDocAt: new Date(),
    });
    res.status(200).json({ message: "Task updated successfully." });
  } catch (error) {
    console.error("Error updating task:::", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUserTaskById = async (req: Request, res: Response) => {
  try {
    const { email, taskId } = req.body;
    const user = query(collection(db, "users"), where("email", "==", email));
    const userSnapShot = await getDocs(user);
    if (userSnapShot.empty) {
      throw new Error("User not found.");
    }
    const userRef = doc(db, "users", userSnapShot.docs[0].id);
    const taskref = doc(userRef, "tasks", taskId);
    await deleteDoc(taskref);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:::", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMultipleTaskById = async () => {};
