import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase";
import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import MessageBord from "../../components/UI/messagebord";

const Messages = () => {
  const user = useAuth().user;
  const uid = user && user.uid;
  const [messages, setMessages] = useState();
  console.log(messages, "hhh");
  const getMessages = useCallback(async () => {
    const docref = await firebase
      .firestore()
      .collection("user_aditional")
      .doc(uid)
      .collection("conversations");
    await docref.get().then((doc) => {
      if (doc.size > 0) {
        const docArray = [];
        doc.forEach((d) => {
          const id = d.id;
          docArray.push({
            id,
            ...d.data(),
          });
        });
        setMessages(docArray);
      }
    });
  }, [setMessages]);
  useRedirect();
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <div>
      {messages && <MessageBord messages={messages} uid={uid && uid} />}
    </div>
  );
};

export default Messages;
