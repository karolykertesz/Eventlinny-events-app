import React, { useState, useEffect } from "react";
import firebase from "firebase";

export const useUserCurrentLocation = (uid = "w") => {
  const [location, setLocation] = useState();
  useEffect(() => {
    const dataref = firebase
      .firestore()
      .collection("cookies")
      .doc(uid)
      .onSnapshot((snap) => {
        if (snap.exists) {
          setLocation({
            location: snap.data().location,
            countryCode: snap.data().country_code,
          });
        }
      });
    return () => dataref();
  }, [setLocation]);
  return {
    location,
  };
};
