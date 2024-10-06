import { Request, Response } from "express";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, address } = req.body;
    const userCredenials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredenials.user;
    const newUser = await setDoc(doc(db, "users", user.uid), {
      email,
      address,
      name,
      uid: user.uid,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "User created Successfully.", newUser });
  } catch (error) {
    console.error("Error creating user:::", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    res.status(200).json({ message: "User logged in successfully.", user });
  } catch (error) {
    console.error("Error logging in user:::", error);
    res.status(500).json({ message: "Invalid email or password." });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let userQuery;
    if (email) {
      userQuery = query(collection(db, "users"), where("email", "==", email));
    } else {
      userQuery = query(collection(db, "users"));
    }
    const user = await getDocs(userQuery);
    if (user.empty) {
      throw new Error("User not found.");
    }
    const users = user.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log("User::::", users);
    res.status(200).json({ message: "User fetched successfully.", users });
  } catch (error) {
    console.log("Error getting user:::", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, name, address } = req.body;
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const user = await getDocs(userQuery);
    if (user.empty) {
      throw new Error("User not found.");
    }
    await updateDoc(doc(db, "users", user.docs[0].id), {
      name,
      address,
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error("Error updating user:::", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const user = await getDocs(userQuery);
    if (user.empty) {
      throw new Error("User not found.");
    }

    user.docs.map(async (userDoc) => {
      await deleteDoc(doc(db, "users", userDoc.id));
    });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:::", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
