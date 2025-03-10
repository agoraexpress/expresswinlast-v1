import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  role: "user" | "admin";
  coins: number;
  createdAt: Date;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  setUserData: (userData: UserData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);

        if (user) {
          try {
            // Set localStorage for compatibility with existing code
            localStorage.setItem("isLoggedIn", "true");

            // Check if user is admin
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data() as UserData;
              setUserData(userData);

              // Set admin status in localStorage
              if (userData.role === "admin") {
                localStorage.setItem("isAdmin", "true");
              } else {
                localStorage.setItem("isAdmin", "false");
              }
            } else {
              // Create new user document if it doesn't exist
              const newUserData: UserData = {
                uid: user.uid,
                email: user.email || "",
                displayName: user.displayName || "",
                phoneNumber: user.phoneNumber || "",
                role: "user",
                coins: 0,
                createdAt: new Date(),
              };

              await setDoc(doc(db, "users", user.uid), newUserData);
              setUserData(newUserData);
              localStorage.setItem("isAdmin", "false");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          setUserData(null);
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("isAdmin");
        }

        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Firebase auth initialization error:", error);
      setLoading(false);
      return () => {};
    }
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    setUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
