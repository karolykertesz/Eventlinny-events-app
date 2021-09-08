import React, { useState, useEffect } from "react";
import firebase from "firebase";
export const useSuggestion = () => {
  const [sug, setSug] = useState([]);
  useEffect(() => {
    const date = new Date();
    const randomL = () => {
      const randomLength = Math.floor(Math.random() * 4 + 1);
      return randomLength;
    };
    const docref = firebase
      .firestore()
      .collection("user_add_events")
      .where("starts", ">=", date)
      .limit(randomL())
      .onSnapshot((snap) => {
        snap.forEach((i) => {
          setSug((prev) => [
            ...prev,
            {
              id: i.id,
              attendies: i.data().attendies.length,
              category: i.data().category,
              location: i.data().location,
              starts: i.data().starts,
            },
          ]);
        });
      });
    return () => docref();
  }, []);
  return {
    sug,
  };
};
