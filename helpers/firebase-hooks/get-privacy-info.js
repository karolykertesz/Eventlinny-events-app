import firebase from "firebase";
import React, { useState, useEffect } from "react";
export const usePrivacy = (id = "u") => {
  const [privacy, setPrivacy] = useState(true);

  useEffect(() => {
    const pr = firebase
      .firestore()
      .collection("user_aditional")
      .doc(id)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const dt = snap.data();
          if (dt.policy === true) {
            return;
          } else {
            setPrivacy(false);
          }
        } else {
          setPrivacy(false);
        }
      });
    return () => pr();
  }, [setPrivacy, id]);
  return {
    privacy,
  };
};
