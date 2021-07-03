import React, { useState, useCallback } from "react";
import validate from "validate.js";
import { useAuth } from "../../Layout/UserContext";
import {
  Popover,
  Form,
  InputGroup,
  OverlayTrigger,
  FormControl,
  Button,
} from "react-bootstrap";
import classes from "../../UI/ui-modules/chatpop.module.css";
import firebase from "firebase";
import Tinyspinner from "../tinyspinner";
import { v4 as uuid_v4 } from "uuid";

const ChatPop = (props) => {
  const setR = props.setR;

  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [roomDone, setRoomDone] = useState(false);
  const [done, setDone] = useState(false);
  const [pass, setPass] = useState();
  const [error, setError] = useState(null);
  const [room, setRoom] = useState();
  const [isEmail, setIsemail] = useState(false);
  const user = useAuth().user && useAuth().user;
  const createRoom = async () => {
    if (!room) {
      setError("Room name cannot be Empty Or password cannot be empty");
      return;
    }
    const value = await validate.single(room, {
      presence: true,
      format: {
        pattern: "[^<>{}()]+",
      },
      length: { minimum: 3 },
    });
    const passvalue = await validate.single(pass, {
      presence: true,
      format: {
        pattern: "[^<>{}()]+",
      },
      length: { minimum: 6 },
    });
    if (typeof value !== "undefined" || typeof passvalue !== "undefined") {
      setError("Invalid Characters or length");
      return;
    }
    setLoading(true);
    const docref = await firebase
      .firestore()
      .collection("private_chat")
      .doc(room);
    await docref
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          setError(
            "There is a private room on this name,Plase select a different Name!!"
          );
          return;
        } else {
          await docref
            .set(
              {
                password: pass,
                host: user && user.email,
                linkVerif: uuid_v4(),
                createrUid: user && user.uid,
                users: [
                  {
                    email: user && user.email,
                    isVerified: true,
                  },
                ],
              },
              {
                merge: true,
              }
            )
            .then(() => {
              setLoading(false);
              setRoomDone(true);
            });
        }
      })
      .then(() => {
        setLoading(false);
      });
  };
  const checkEmail = useCallback(async () => {
    setError(null);

    const docRef = firebase.firestore().collection("user_aditional");
    setLoading(true);
    return docRef
      .where("email", "==", email.trim().toLowerCase())
      .limit(1)
      .get()
      .then((doc) => {
        let dt;
        doc.forEach((i) => {
          dt = i;
        });
        return dt;
      })
      .then(async (dt) => {
        if (typeof dt == "undefined") {
          setError("No Email Found in Eventlinny Database");
          setLoading(false);
          return;
        } else {
          const docref = await firebase
            .firestore()
            .collection("private_chat")
            .doc(room);
          await docref.get().then((doc) => {
            if (doc.exists) {
              docref
                .update({
                  users: firebase.firestore.FieldValue.arrayUnion({
                    email: email,
                    isVerified: false,
                  }),
                })
                .then(() => {
                  setLoading(false);
                  setError("Email verified and sent");
                  setIsemail(false);
                  return;
                });
            } else {
              setLoading(false);
              setDone(true);
              setIsemail(true);
            }
          });
        }
      });
  }, [email]);
  const formSubmit = async (e) => {
    e.preventDefault();
    if (!done && !pass) {
      checkEmail();
      return;
    }
    if (pass && done && room) {
      setLoading(true);

      // .then(() => {
      //   setLoading(false);
      //   setIsemail(false);
      //   setDone(false);
      //   setEmail("");
      // });
    }
  };
  // XWSfgOoaeGYzRSxXaoE1uhCWmg52
  // carlo3030@hotmail.hu
  const popover = (
    <Popover id="popover-basic" className={classes.top}>
      <Popover.Title as="h3" className={classes.title}>
        {!done ? "Add invitation Email and Room name" : "Add Private Password"}
      </Popover.Title>
      <Popover.Content>
        {!loading ? (
          <Form onSubmit={formSubmit}>
            <InputGroup className="mb-3">
              {!isEmail && (
                <div className={classes.room}>
                  <FormControl
                    placeholder="Add Your Chat Room Name"
                    type="text"
                    value={room || ""}
                    onChange={(e) => setRoom(e.target.value)}
                    className={classes.input}
                  />
                </div>
              )}

              {!done && (
                <div className={classes.control}>
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Invitation Email Address"
                    type="email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.input}
                  />
                </div>
              )}
              {done && (
                <FormControl
                  placeholder="Create password"
                  type="password"
                  value={pass || ""}
                  onChange={(e) => setPass(e.target.value)}
                  className={classes.input}
                />
              )}
            </InputGroup>
            <button type="submit" className={classes.formButton}>
              {!done ? "send" : "create Your password and send"}
            </button>
          </Form>
        ) : (
          <div className={classes.tiny}>
            <Tinyspinner />
          </div>
        )}
        {done && <div className={classes.sent}>Email Verified</div>}
        {error && (
          <div>
            <p className={classes.error}>{error}</p>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
  return (
    <div>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button className={classes.popBtn}>{props.btntitle}</Button>
      </OverlayTrigger>
    </div>
  );
};
export default ChatPop;
