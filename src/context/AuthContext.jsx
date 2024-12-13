// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { auth, googleProvider, firebase } from "../config/firebaseConfig"; // Firebase config file

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Clean up listener when the component unmounts
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
