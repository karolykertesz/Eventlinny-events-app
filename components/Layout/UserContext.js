import { useContext, createContext, useState, useEffect } from "react";
import FirebaseClient from "../../helpers/firebase";
import firebase from "firebase/app";
import "firebase/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  FirebaseClient();
  const [user, setUser] = useState();
  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async function (user) {
      if (!user) {
        setUser(null);
        return;
      } else {
        setUser(user);
        return;
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
