import React, { useEffect, useState, useCallback } from "react";
import firebase from "firebase";
import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import { useRouter } from "next/router";
import classes from "../../components/UI/ui-modules/publicchat.module.css";
import Image from "next/image";
import ChatItem from "../../components/UI/chatitem";
import Loader from "../../components/UI/loader";

const Public = () => {
  useRedirect();
  const user = useAuth().user;
  const router = useRouter();
  const id = router.query.id;
  const [data, setdata] = useState();
  const [userData, setUserData] = useState();
  const [messages, Setmessages] = useState();
  const [addtext, setAddtext] = useState();
  const [currImage, setUserImage] = useState();

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
    setAddtext("");
  };
  const setUser = useCallback(async () => {
    const dataref = await firebase
      .firestore()
      .collection("user_aditional")
      .doc(user && user.uid);
    await dataref.get().then(async (doc) => {
      const imageUrl = doc.data().image_url
        ? doc.data().image_url
        : "/images/noimage.svg";
      setUserImage(imageUrl);
    });
  }, [setUserImage]);
  useEffect(() => {
    getdataOnce();
  }, [getdataOnce]);
  useEffect(() => {
    setUser();
  }, [setUser]);
  if (!data || !user) {
    return <Loader />;
  }
  return (
    <div className={classes.top}>
      <div className={classes.cover}>
        <div className={classes.msgHolder}>
          {messages &&
            messages.map((item) => (
              <div key={item.id}>
                <ChatItem item={item} uid={user && user.uid} />
              </div>
            ))}
        </div>
        <button className={classes.btn} onClick={() => singOut()}>
          sign out
        </button>

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
    </div>
  );
};
export default Public;
