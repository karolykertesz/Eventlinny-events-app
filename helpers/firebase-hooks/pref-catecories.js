import React, { useState, useEffect } from "react";
import firebase from "firebase";
export const useCategories = (uid) => {
  const [pref, setPref] = useState([]);
  useEffect(() => {
    const categories = firebase
      .firestore()
      .collection("user_aditional")
      .doc(uid)
      .onSnapshot((snap) => {
        if (!uid) return;
        const data = snap.data();
        if (data.pref_events) {
          setPref(data.pref_events);
        }
      });
    return () => categories();
  }, [uid]);
  return {
    pref,
  };
};
