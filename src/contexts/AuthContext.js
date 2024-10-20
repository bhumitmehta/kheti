import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"; // Assuming you're using Firebase
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // null initially to represent no user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null); // Set user if logged in, null if not
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    await signOut(auth); // Firebase sign out
    setCurrentUser(null); // Clear the current user on logout
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
