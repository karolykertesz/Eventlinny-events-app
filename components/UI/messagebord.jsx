import React, { useState } from "react";
import classes from "../UI/ui-modules/message.bord.module.css";
import firebase from "firebase";
import MessageSideBar from "./messagesidebar";
import MessageInbox from "./messageinbox";
const MessageBord = (props) => {
  const { messages, user } = props;
  const [added, setAdded] = useState(false);

  return (
    <div className={added ? classes.top : classes.top + " " + classes.c}>
      <div className={classes.holder}>
        <MessageSideBar added={added} setAdded={setAdded} messages={messages} />
        <MessageInbox added={added} user={user} messages={messages} />
      </div>
    </div>
  );
};

export default MessageBord;
