import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRedirect } from "../../helpers/validatehelp";
import useBanned from "../../helpers/checkBanned";
import classes from "../../components/UI/private.chat.login.module.css";
import { useAuth } from "../../components/Layout/UserContext";
import { useRouter } from "next/router";
import firebase from "firebase";
import validate from "validate.js";
import { constraints } from "../../helpers/validators/privatechat";
import Loader from "../../components/UI/loader";
const Private = () => {
  useRedirect();
  const isBanned = useBanned();
  const user = useAuth().user;
  const router = useRouter();
  const [room, setRoom] = useState();
  const [password, setPass] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const fetchTokken = useCallback(async () => {
    const mess = await fetch("/api/users/helpers/csrf");
    const { secret } = await mess.json();
    formRef.current.value = await secret;
  }, []);
  const formsubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!room || !password) {
      setLoading(false);
      return setError("Room Or Password cant't be empty");
    }
    const value = validate({ room, password }, constraints);
    if (value) {
      setLoading(false);
      return setError("Invalid Input values!!!");
    }
    const mess = await fetch("/api/users/helpers/csrf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secret: formRef.current.value }),
    });
    const status = await mess.status;
    if (status !== 200) {
      setLoading(false);
      return setError("Please refresh the page");
    }
    const baseRef = firebase
      .firestore()
      .collection("private_chat_users")
      .doc(room.trim().toLowerCase());
    const secRef = firebase
      .firestore()
      .collection("private_chat")
      .doc(room.trim().toLowerCase());
    await baseRef.get().then(async (doc) => {
      if (doc.exists) {
        const verified = await doc.data().verified;
        if (verified && verified.indexOf(user && user.email) > -1) {
          return secRef.get().then(async (cd) => {
            const pass = cd.data().password;
            if (pass === password.toString()) {
              await secRef.update({
                active_users: firebase.firestore.FieldValue.arrayUnion(
                  user.uid
                ),
              });
              await setLoading(false);
              await router.push(`/chat/pr?chi=${room}`);
            } else {
              setLoading(false);
              setError("invalid Password");
            }
          });
        } else {
          setLoading(false);
          return setError("Sorry Your Email wasn't verified ,yet!");
        }
      } else {
        setLoading(false);
        return setError("Invalid Room Name");
      }
    });
  };

  useEffect(() => {
    fetchTokken();
  }, [fetchTokken]);
  if (isBanned) {
    return (
      <div classname={classes.banned}>You have Been banned from chat!!</div>
    );
  }
  if (loading) {
    return <Loader />;
  }
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
