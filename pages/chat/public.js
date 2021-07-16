import React, { useEffect, useState, useCallback } from "react";
import firebase from "firebase";
import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import { useRouter } from "next/router";
import classes from "../../components/UI/ui-modules/publicchat.module.css";

const Public = () => {
  useRedirect();
  const user = useAuth().user;
  const router = useRouter();
  const id = router.query.id;
  const [data, setdata] = useState();
  const [userData, setUserData] = useState();
  const [messages, Setmessages] = useState();
  const [addtext, setAddtext] = useState();

  const singOut = async () => {
    const dataref = firebase
      .firestore()
      .collection("public_chat")
      .doc(id && id);
    await dataref
      .update({
        active_users: firebase.firestore.FieldValue.arrayRemove(
          user && user.uid
        ),
      })
      .then(() => router.push("/chat/main"));
  };
  const getdataOnce = useCallback(async () => {
    const dataref = await firebase
      .firestore()
      .collection("public_chat")
      .doc(id && id);
    await dataref.get().then(async (doc) => {
      setdata({
        id: doc.id,
        ...doc.data(),
      });
    });
    await dataref
      .collection("messages")
      .orderBy("created_at")
      .limit(30)
      .onSnapshot(async (doc) => {
        const arr = [];
        const size = doc.size;
        if (size > 0) {
          doc.forEach((item) => {
            arr.push({
              id: item.id,
              created_at: item.data().created_at,
              text: item.data().text,
              added_by: item.data().added_by,
            });
          });
        }
        await Setmessages(arr);
      });
  }, [setdata]);
  const createNewmessage = async (e) => {
    e.preventDefault();
    const docref = firebase
      .firestore()
      .collection("public_chat")
      .doc(id && id)
      .collection("messages");
    await docref.add({
      text: addtext,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      added_by: user && user.uid,
    });
  };
  useEffect(() => {
    getdataOnce();
  }, [getdataOnce]);
  return (
    <div className={classes.top}>
      <div className={classes.cover}>
        <button className={classes.btn} onClick={() => singOut()}>
          sign out
        </button>
        <div className={classes.msgHolder}>
          {messages && messages.map((item) => <p key={item.id}>{item.text}</p>)}
        </div>
        <div>
          <form onSubmit={createNewmessage}>
            <input
              type="text"
              value={addtext || ""}
              onChange={(e) => setAddtext(e.target.value)}
            />
            <button>Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Public;
