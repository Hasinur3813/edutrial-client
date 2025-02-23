/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import useAxiosPublic from "../axios/useAxiosPublic";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const axios = useAxiosPublic();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        axios
          .post("/auth/jwt", {
            email: user?.email,
            name: user?.displayName,
          })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
            setLoading(false);
            setCurrentUser(user);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
        setCurrentUser(user);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  // sign in with google

  const signInWithGoogle = () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // sign up functionality

  const signup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   login functionality

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const updateUser = (name, url, email) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
      email: email,
    });
  };

  // update profile

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
    updateUser,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
