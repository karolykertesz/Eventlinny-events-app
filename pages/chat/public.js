import React, { useEffect, useState, useCallback } from "react";
import firebase from "firebase";
import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import { useRouter } from "next/router";
import classes from "../../components/UI/ui-modules/publicchat.module.css";
import Image from "next/image";
import ChatItem from "../../components/UI/chatitem";
import Loader from "../../components/UI/loader";
import { singOut } from "../chat/chat-hooks";
import Shared from "./chatShared";

const Public = () => {
  useRedirect();
  const user = useAuth().user;
  const router = useRouter();
  const id = router.query.id;
  const [data, setdata] = useState();
  const [messages, Setmessages] = useState();
  const [currImage, setUserImage] = useState();
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

  const setUser = async () => {
    const dataref = firebase
      .firestore()
      .collection("user_aditional")
      .doc(user && user.uid);
    await dataref.get().then(async (doc) => {
      if (doc.exists) {
        const data = await doc.data();
        const imageUrl = data.image_url
          ? data.image_url
          : "/images/noimage.svg";
        setUserImage(imageUrl);
      }
    });
  };
  useEffect(() => {
    getdataOnce();
  }, [getdataOnce]);
  useEffect(() => {
    setUser();
  }, []);
  if (!data || !user) {
    return <Loader />;
  }
  return (
    <div className={classes.top}>
      <Shared
        type="public_chat"
        id={id && id}
        messages={messages && messages.length > 0 ? messages : null}
        user={user && user}
        currImage={currImage && currImage}
      />
    </div>
  );
};
export default Public;
