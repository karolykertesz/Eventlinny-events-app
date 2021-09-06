import React, { useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase";
export const useCheckcatSet = (uid) => {
  const router = useRouter();
  useEffect(() => {
    const check = firebase
      .firestore()
      .collection("user_aditional")
      .doc(uid)
      .onSnapshot((snap) => {
        if (!snap.exists) {
          router.push("/startup");
        }
        const data = snap.data();

        if (!data.pref_events) {
          router.push("/statup");
        }
      });
    return () => check();
  }, [uid]);
};
