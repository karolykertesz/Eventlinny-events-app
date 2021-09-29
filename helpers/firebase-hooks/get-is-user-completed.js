import React, { useState, useEffect } from "react";
import firebase from "firebase";
export const useIsCompleted = (id = "h") => {
  const [completed, setComleted] = useState(false);
  useEffect(() => {
    const docref = firebase
      .firestore()
      .collection("user_aditional")
      .doc(id)
      .onSnapshot((snap) => {
        if (snap.exists) {
          if (snap.data().pref_events) {
            setComleted(true);
          }
        }
        return () => docref();
      });
  }, [setComleted, id]);
  return {
    completed,
  };
};
