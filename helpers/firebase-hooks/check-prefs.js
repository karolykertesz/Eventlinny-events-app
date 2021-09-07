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
        if (!uid) return;
        if (!snap.data() || !snap.data().pref_events) {
          router.push("/startup");
        }
      });
    return () => check();
  }, [uid]);
};
