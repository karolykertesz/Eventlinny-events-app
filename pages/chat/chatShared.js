import React, { useState } from "react";
import firebase from "firebase";
import classes from "../../components/UI/ui-modules/publicchat.module.css";
import singOut from "../../helpers/firebase-hooks/chat-hooks";
import Image from "next/image";
import MessageHolder from "../../components/UI/messageholder";
const Shared = (props) => {
  const [addtext, setAddtext] = useState();
  const { type, id, user, messages, currImage } = props;
  const createNewmessage = async (e) => {
    e.preventDefault();
    const docref = firebase
      .firestore()
      .collection(type)
      .doc(id)
      .collection("messages");
    await docref.add({
      text: addtext,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      added_by: user.uid,
    });
    setAddtext("");
  };
  return (
    <div className={classes.cover}>
      <button
        className={classes.btn}
        onClick={() => singOut(user && user.uid, id, type)}
      >
        sign out
      </button>
      {messages && <MessageHolder messages={messages} uid={user.uid} />}
      <div className={classes.formInput}>
        <form onSubmit={createNewmessage} className={classes.form}>
          <input
            type="text"
            value={addtext || ""}
            onChange={(e) => setAddtext(e.target.value)}
            className={classes.input}
          />
          <button className={classes.button}>Add</button>
        </form>
        <div className={classes.imgHolder}>
          <Image
            width="20px"
            height="20px"
            src={currImage ? currImage : "/images/noimage.svg"}
          />
          <p>{user && user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Shared;
