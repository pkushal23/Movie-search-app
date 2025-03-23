import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../services/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

// ✅ Create AuthContext
const AuthContext = createContext();

// ✅ Hook for easy access to AuthContext
export function useAuth() {
    return useContext(AuthContext);
}

// ✅ AuthProvider to wrap the entire app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ✅ Login function
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Signup function
  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Logout function
  const logout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
