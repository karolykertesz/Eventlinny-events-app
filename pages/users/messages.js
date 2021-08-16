import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase";
import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import MessageBord from "../../components/UI/messagebord";

const Messages = () => {
  useRedirect();
  const user = useAuth().user;
  const uid = user && user.uid;
  const [messages, setMessages] = useState();
  const getMessages = useCallback(async () => {
    const docref = await firebase
      .firestore()
      .collection("user_aditional")
      .doc(uid)
      .collection("conversations");
    await docref.onSnapshot((doc) => {
      if (doc.size > 0) {
        const docArray = [];
        doc.forEach((d) => {
          const id = d.id;
          docArray.push({
            id,
            ...d.data(),
          });
        });
        return setMessages(docArray);
      }
    });
  }, [setMessages]);
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <div>
      {messages && <MessageBord messages={messages} user={user && user} />}
    </div>
  );
};

export default Messages;
