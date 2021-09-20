import firebase from "firebase";
import React, { useState, useEffect } from "react";

const useMessages = (uid) => {
  const [messages, setMessage] = useState();
  useEffect(() => {
    const docref = firebase
      .firestore()
      .collection("user_aditional")
      .doc(uid)
      .collection("conversations")
      .onSnapshot((snap) => {
        if (snap.size > 0) {
          const docArray = [];
          snap.forEach((doc) => {
            docArray.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setMessage(docArray);
        }
      });
    return () => docref();
  }, []);
  return {
    messages,
  };
};
export default useMessages;
