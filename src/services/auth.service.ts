import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserData } from "@/context/AuthContext";

export const registerUser = async (
  email: string,
  password: string,
  displayName: string,
  phoneNumber: string,
): Promise<UserData> => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    const userData: UserData = {
      uid: user.uid,
      email: email,
      displayName: displayName,
      phoneNumber: phoneNumber,
      role: "user",
      coins: 0,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return userData;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<UserData> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      // Create user document if it doesn't exist
      const userData: UserData = {
        uid: user.uid,
        email: user.email || email,
        displayName: user.displayName || email.split("@")[0],
        phoneNumber: user.phoneNumber || "",
        role: "user",
        coins: 0,
        createdAt: new Date(),
      };
      await setDoc(doc(db, "users", user.uid), userData);
      return userData;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
