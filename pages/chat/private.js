import React, { useState, useRef, useEffect } from "react";
import { useRedirect } from "../../helpers/validatehelp";
import useBanned from "../../helpers/checkBanned";
import classes from "../../components/UI/ui-modules/private.chat.login.module.css";
import { useAuth } from "../../components/Layout/UserContext";
import { useRouter } from "next/router";
import firebase from "firebase";
import validate from "validate.js";
import { constraints } from "../../helpers/validators/privatechat";
const Private = () => {
  useRedirect();
  const isBanned = useBanned();
  const user = useAuth().user;
  const router = useRouter();
  const [room, setRoom] = useState();
  const [password, setPass] = useState();
  const [error, setError] = useState();
  const formRef = useRef();
  if (isBanned) {
    return (
      <div classname={classes.banned}>You have Been banned from chat!!</div>
    );
  }
  const formsubmit = async (e) => {
    e.preventDefault();
    const value = validate({ room, password }, constraints);
    if (value) {
      return setError("Invalid Input values!!!");
    }
    const baseRef = firebase
      .firestore()
      .collection("private_chat_users")
      .doc(room.trim().toLowerCase());

    await baseRef.get().then(async (doc) => {
      if (doc.exists) {
        const verified = await doc.data().verified;
        if (verified.indexOf(user.email) > -1) {
          return firebase
            .firestore()
            .collection("private_chat")
            .doc(room.trim().toLowerCase())
            .get()
            .then((cd) => {
              const pass = cd.data().password;
              if (pass === password.toString()) {
                router.push(`/chat/pr?chi=${room}`);
              } else {
                setError("invalid Password");
              }
            });
        } else {
          return setError("Sorry Your Email wasn't verified ,yet!");
        }
      } else {
        return setError("Invalid Room Name");
      }
    });
  };
  return (
    <div className={classes.top}>
      <div className={classes.cover}>
        <div className={classes.form}>
          <form onSubmit={formsubmit} className={classes.formInn}>
            <input
              type="text"
              placeholder="enter your room name"
              autoComplete="false"
              value={room || ""}
              onChange={(e) => setRoom(e.target.value)}
            />
            <input
              type="password"
              placeholder="enter your password"
              autoComplete="false"
              value={password || ""}
              onChange={(e) => setPass(e.target.value)}
            />
            <input type="hidden" ref={formRef} />
            <button>Send</button>
          </form>
          {error && (
            <div className={classes.error}>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Private;
