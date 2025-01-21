import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //log out user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //log in user with email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //update a user profile

  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  useEffect(() => {
    const unSubscribe = () => {
      onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);

        if (currentUser?.email) {
          axios
            .post(`${import.meta.env.VITE_API_URL}/jwt`, {
              email: currentUser.email,
            })
            .then((res) => {
              if (res.data.token) {
                localStorage.setItem("token", res.data.token);
              }
            });
        } else {
          localStorage.removeItem("token");
        }
        setLoading(false);
      });
    };
    return () => unSubscribe();
  }, []);
  console.log("current User --->", user);
  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    googleSignIn,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
