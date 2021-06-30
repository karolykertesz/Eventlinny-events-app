import { useContext, createContext, useState, useEffect, useRef } from "react";
import FirebaseClient from "../../helpers/firebase";
import firebase from "firebase/app";
import "firebase/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const modeRef = useRef(true);
  FirebaseClient();
  const [user, setUser] = useState();
  useEffect(async () => {
    await firebase.auth().onAuthStateChanged(function (use) {
      if (use && modeRef.current) {
        setUser({ uid: use.uid, name: use.displayName, email: use.email });
        return;
      } else {
        if (modeRef.current) {
          setUser(undefined);
          return;
        }
      }
    });
    return () => {
      modeRef.current = false;
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
