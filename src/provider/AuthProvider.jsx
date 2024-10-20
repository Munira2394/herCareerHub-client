import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import useAxiosSecureHook from "../hook/useAxiosSecureHook";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecureHook();
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = async () => {
    setLoading(true);
    const { data } = await axios("http://localhost:5000/logout", {
      withCredentials: true,
    });
    console.log("logout token", data);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setLoading(true);
        const url = `/user/${currentUser?.email}`;
        axiosSecure
          .get(url)
          .then((res) => {
            const userFromDatabase = res.data;
            setUser((prevUser) => ({
              ...prevUser,
              role: userFromDatabase.role,
              verification: userFromDatabase.verification,
            }));
          })
          .catch((error) => {
            console.error("Error fetching user role:", error);
          });
      }

      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(JSON.stringify(user?.role), "user set outside useEffect");

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,

    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
