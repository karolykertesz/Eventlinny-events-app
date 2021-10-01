import React, { useEffect } from "react";
import firebase from "firebase";

export const useUserStart = (user = "k", location = []) => {
  console.log(user);
  useEffect(() => {
    const baseref = firebase.firestore().collection("user_aditional");
    const docref = firebase
      .firestore()
      .collection("user_aditional")
      .doc(user && user.uid)
      .onSnapshot(async (snap) => {
        if (!snap.exists && user.uid && location) {
          await baseref.doc(user.uid).set({
            name: user.name,
            email: user.email,
            policy: false,
          });
        }

        if (location.length > 0) {
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
