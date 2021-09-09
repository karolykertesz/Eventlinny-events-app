import React, { useState, useEffect } from "react";
import firebase from "firebase";
export const useChatData = (id) => {
  const [chatData, setChat] = useState();
  useEffect(() => {
    const dataref = firebase
      .firestore()
      .collection("public_chat")
      .doc(id)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const data = snap.data();
          const id = snap.id;
          setChat({ id, ...data });
        }
      });
  }, [id]);
  return {
    chatData,
  };
};
