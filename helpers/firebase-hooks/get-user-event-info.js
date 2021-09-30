import React, { useEffect, useState } from "react";
import firebase from "firebase";
export const useUserEventInfo = (id = "u") => {
  const [user, setUser] = useState();
  useEffect(() => {
    const userRef = firebase
      .firestore()
      .collection("user_aditional")
      .doc(id)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const data = snap.data();
          setUser({
            name: data.name,
            imgUrl: data.image_url ? data.image_url : "/images/noimage.svg",
            language: data.language ? data.language : null,
            bio: data.bio ? data.bio : null,
          });
        }
      });
    return () => userRef();
  }, [id, setUser]);
  return {
    user,
  };
};
