import React, { useEffect, useState, useCallback } from "react";
import firebase from "firebase";
import { useAuth } from "../components/Layout/UserContext";

const useBanned = () => {
  const user = useAuth().user;
  const [banned, setBanned] = useState(false);
  const checkBanned = useCallback(async () => {
    const dataRef = await firebase
      .firestore()
      .collection("banned_users")
      .doc(user && user.uid);
    await dataRef.onSnapshot(async (doc) => {
      if (doc.exists) {
        await setBanned(true);
      }
    });
  });
  useEffect(() => {
    checkBanned();
  }, [checkBanned]);
  return banned;
};

export default useBanned;
