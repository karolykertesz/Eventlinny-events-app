import React, { useEffect } from "react";
import firebase from "firebase";

export const useUserStart = (user, location) => {
  const uid = user && user.uid;
  const name = user && user.name;
  const email = user && user.email;
  useEffect(() => {
    const baseref = firebase.firestore().collection("user_aditional");
    const docref = firebase
      .firestore()
      .collection("user_aditional")
      .doc(uid)
      .onSnapshot(async (snap) => {
        if (!snap.exists && user) {
          await baseref.doc(uid).set({
            name: name,
            email: email,
          });
        }

        if (location) {
          const locationFetch = await fetch("/api/users/createPref", {
            method: "POST",
            body: JSON.stringify({
              location: location && location,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          const status = await locationFetch.status;
          if (status !== 200 || status !== 201) {
            return;
          }
        }
      });
    return () => docref();
  }, []);
};
