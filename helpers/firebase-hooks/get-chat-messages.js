import React, { useState, useEffect } from "react";
import firebase from "firebase";
export const useChatMsessages = (id, type) => {
  const [messages, setMessages] = useState();
  const chatType = type === "public" ? "public_chat" : "private_chat";
  useEffect(() => {
    const docref = firebase
      .firestore()
      .collection(chatType)
      .doc(id)
      .collection("messages")
      .orderBy("created_at")
      .limit(30)
      .onSnapshot((snap) => {
        const snapArr = [];
        if (snap.size > 0) {
          snap.forEach((item) => {
            snapArr.push({
              id: item.id,
              created_at: item.data().created_at,
              text: item.data().text,
              added_by: item.data().added_by,
            });
          });
        }
        return setMessages(snapArr);
      });
    return () => docref();
  }, [id, setMessages]);
  return {
    messages,
  };
};
