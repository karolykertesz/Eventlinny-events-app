import React, { useState, useEffect } from "react";
import firebase from "firebase";
export const useUserInfo = (uid) => {
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const userRef = firebase
      .firestore()
      .collection("user_aditional")
      .doc(uid)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const data = snap.data();
          setUserInfo(data);
        }
      });
    return () => userRef();
  }, [uid]);
  return {
    userInfo,
  };
};
