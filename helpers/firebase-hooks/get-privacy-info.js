import firebase from "firebase";
import React, { useState, useEffect } from "react";
export const usePrivacy = (id = "u") => {
  const [privacy, setPrivacy] = useState(false);

  useEffect(() => {
    const pr = firebase
      .firestore()
      .collection("user_aditional")
      .doc(id)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const dt = snap.data();
          if (dt.policy === true) {
            setPrivacy(true);
          }
        }
      });
    return () => pr();
  }, [setPrivacy, id]);
  return {
    privacy,
  };
};
