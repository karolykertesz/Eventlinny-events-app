import React, { useState } from "react";
import classes from "../UI/ui-modules/message.bord.module.css";
import firebase from "firebase";
import MessageSideBar from "./messagesidebar";
import MessageInbox from "./messageinbox";
const MessageBord = (props) => {
  const { messages, uid } = props;
  const [added, setAdded] = useState(false);

  return (
    <div className={classes.top}>
      <div className={classes.holder}>
        <MessageSideBar added={added} setAdded={setAdded} />
        <MessageInbox />
      </div>
    </div>
  );
};

export default MessageBord;
