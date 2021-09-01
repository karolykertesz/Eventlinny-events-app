import firebase from "firebase";
import React, { useState, useEffect } from "react";

export const useStaticData = (uid) => {
  if (!uid) return;
  const [data, setData] = useState();
  let useritems = await firebase.firestore().collection("cookies").doc(uid);

  useEffect(() => {}, []);
  return {
    data,
  };
};
