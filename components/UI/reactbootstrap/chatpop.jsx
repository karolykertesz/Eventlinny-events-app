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

const ChatPop = (props) => {
  const setR = props.setR;

  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [pass, setPass] = useState();
  const [error, setError] = useState(null);
  const [room, setRoom] = useState();
  const [isEmail, setIsemail] = useState(false);
  const user = useAuth().user && useAuth().user;

  const checkEmail = useCallback(async () => {
    setError(null);
    if (!room) {
      setError("Room name cannot be Empty");
      return;
    }
    const value = await validate.single(room, {
      presence: true,
      format: {
        pattern: /^[a-zA-Z0-9_.-]*$/,
      },
      length: { minimum: 3 },
    });

    if (typeof value !== "undefined") {
      setError("Invalid Room name values");
      return;
    }
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
      const value = await validate.single(pass, {
        presence: true,
        format: {
          pattern: /^[a-zA-Z0-9_.-]*$/,
        },
        length: { minimum: 6 },
      });

      if (typeof value !== "undefined") {
        setLoading(false);
        setError("invalid characters");
        return;
      }
      const docref = await firebase
        .firestore()
        .collection("private_chat")
        .doc(room);
      await docref
        .set(
          {
            password: pass,
            host: user && user.email,
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
          setIsemail(false);
        });
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
                    aria-describedby="basic-addon1"
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
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Invitation Email Address"
                    aria-describedby="basic-addon1"
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
