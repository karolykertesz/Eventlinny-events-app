import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../components/Layout/UserContext";
import { useRouter } from "next/router";
import firebase from "firebase";
import BigLoader from "../../components/UI/BigLoader";
import classes from "../../components/UI/ui-modules/message.main.module.css";
import { BiPaperPlane } from "react-icons/bi";
import { IconContext } from "react-icons";
import { useRedirect } from "../../helpers/validatehelp";
import { IoArrowUndoOutline } from "react-icons/io5";
import { validate } from "validate.js";
import { v4 as uuid_v4 } from "uuid";
import { setNotifications } from "../../data";
import Image from "next/image";

const Message = () => {
  useRedirect();
  const router = useRouter();
  const id = router.query.i;
  const currentUser = useAuth().user;
  const currentEmail = currentUser && currentUser.email;
  const uid = currentUser && currentUser.uid;
  const [userDet, setDetails] = useState();
  const [message, addMessage] = useState();
  const [error, setError] = useState();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const getUserDetails = useCallback(async () => {
    const docref = firebase.firestore().collection("user_aditional").doc(id);
    await docref.get().then(async (user) => {
      const data = await user.data();
      if (data) {
        await setDetails({
          email: data.email,
          name: data.name,
          id: data.id,
          url: data.image_url ? data.image_url : "/images/noimage.svg",
        });
      }
    });
  }, [setDetails]);
  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);
  const sendMessage = async () => {
    setError("");
    addMessage("");
    setLoading(true);
    if (!message) {
      setLoading(false);
      setError("No Message added!!!");
      return;
    }
    const value = validate.single(message, {
      format: {
        pattern: "[^<>{}()]+",
      },
    });
    if (value) {
      setLoading(false);
      setError("Invalid characters");
      return;
    }

    const currentRef = await firebase.firestore().collection("user_aditional");
    const docId = uuid_v4();
    const userArr = [uid, id];
    const notificationText = `Hi ${
      userDet && userDet.name
    } you received a new message from ${
      currentUser && currentUser.name
    } check Your messages`;
    const promises = userArr.map((item) =>
      currentRef.doc(item).collection("conversations")
    );
    return Promise.all(promises)
      .then((docs) => {
        docs.forEach((dt) => {
          dt.doc(docId).set({
            added_by: uid,
            recived: id,
            created_at: new Date(),
            text: message,
            replies: [],
          });
        });
      })
      .then(() => setLoading(false))
      .then(async () => {
        const r = await setNotifications(id, docId, notificationText);
      })
      .then(() => setError("Your Message Sent"))
      .then(async () => {
        const sendEmail = firebase
          .functions()
          .httpsCallable("notificationEmail");
        await sendEmail({
          email: userDet && userDet.email,
          sender: currentUser.name,
          receiver: userDet && userDet.name,
        }).then(() => {
          setSent(true);
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  if (loading) {
    return <BigLoader />;
  }
  return (
    <div className={classes.cover}>
      {sent && (
        <div
          className={classes.arrow}
          onClick={() => router.push("/events/first")}
        >
          <p>Go back</p>
          <IconContext.Provider value={{ className: classes.arrowIcon }}>
            <IoArrowUndoOutline />
          </IconContext.Provider>
        </div>
      )}
      <div className={classes.top}>
        <div className={classes.header}>
          <Image
            src={userDet ? userDet.url : "/images/noimage.svg"}
            width="50px"
            height="50px"
            quality={100}
          />
          {userDet ? (
            <p>Your message to {userDet.name}</p>
          ) : (
            <p>Send Your message</p>
          )}
        </div>
        <div className="input-group">
          <input
            type="text"
            className={classes.input + " " + "form-control"}
            placeholder="Your message....."
            value={message || ""}
            onChange={(e) => addMessage(e.target.value)}
          />
          <div className="input-group-append">
            <span
              className={classes.group + " " + "input-group-text"}
              onClick={() => sendMessage()}
            >
              <IconContext.Provider
                value={{
                  style: {
                    width: "25px",
                    height: "25px",
                    color: "#fff",
                  },
                }}
              >
                <BiPaperPlane />
              </IconContext.Provider>
            </span>
          </div>
        </div>
        <div className={classes.error}>{error && error}</div>
      </div>
    </div>
  );
};
export default Message;
