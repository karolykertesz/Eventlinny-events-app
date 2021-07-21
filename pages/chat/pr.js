import React, { useEffect, useCallback, useState } from "react";
import { useRedirect } from "../../helpers/validatehelp";
import useBanned from "../../helpers/checkBanned";
import { useAuth } from "../../components/Layout/UserContext";
import { useRouter } from "next/router";
import firebase from "firebase";
import Shared from "./chatShared";

const Pr = () => {
  useRedirect();
  const isBanned = useBanned();
  const router = useRouter();
  const id = router.query.chi;
  const user = useAuth().user;
  const [data, setdata] = useState();
  const [messages, Setmessages] = useState();
  const [currImage, setUserImage] = useState();
  const [signedIn, setSigned] = useState(true);
  const checkInSigned = useCallback(() => {
    return firebase
      .firestore()
      .collection("private_chat")
      .doc(id)
      .get()
      .then(async (doc) => {
        const act_usr = await doc.data().active_users;
        if (act_usr && act_usr.indexOf(user && user.uid) > -1) {
          setSigned(true);
        } else {
          setSigned(false);
        }
      });
  }, [setSigned]);
  useEffect(() => {
    checkInSigned();
  }, [checkInSigned]);

  const getdataOnce = useCallback(async () => {
    const dataref = await firebase
      .firestore()
      .collection("private_chat")
      .doc(id && id);
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
  }, [Setmessages]);

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
  if (isBanned) {
    return <div>You have Been banned from Chat</div>;
  }
  if (!signedIn) {
    return (window.location = "/chat/private");
  }
  return (
    <div style={{ position: "relative" }}>
      <Shared
        type="private_chat"
        id={id && id}
        messages={messages && messages.length > 0 ? messages : null}
        user={user && user}
        currImage={currImage && currImage}
      />
    </div>
  );
};
export default Pr;
