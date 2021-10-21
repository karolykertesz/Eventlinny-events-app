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
          if (snap.data().location) {
            setLocation({
              location: snap.data().location,
              countryCode: snap.data().country_code,
            });
          } else {
            setLocation({
              location: "loc",
              countryCode: "HU",
            });
          }
        } else {
          setLocation({
            location: "loc",
            countryCode: "HU",
          });
        }
      });
    return () => dataref();
  }, [setLocation]);
  return {
    location,
  };
};
