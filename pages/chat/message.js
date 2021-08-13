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
      console.log(value);
    }
  };
  if (loading) {
    return <BigLoader />;
  }
  return (
    <div className={classes.top}>
      <div className={classes.header}>
        {sent && (
          <div>
            <IconContext.Provider value={{ className: classes.arrowIcon }}>
              <IoArrowUndoOutline />
            </IconContext.Provider>
          </div>
        )}
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
            <IconContext.Provider value={{ className: classes.icon }}>
              <BiPaperPlane />
            </IconContext.Provider>
          </span>
        </div>
      </div>
      <div className={classes.error}>{error && error}</div>
    </div>
  );
};
export default Message;
