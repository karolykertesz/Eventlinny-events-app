import React, { useState, useEffect, useCallback, Fragment } from "react";
import classes from "../UI/ui-modules/message.inbox.module.css";
import Bin from "../UI/icons/trash-bin";
import { BiPaperPlane } from "react-icons/bi";
import { IconContext } from "react-icons";
import MessageInboxItem from "./messageInboxItem";
import firebase from "firebase";
import TinySpinner from "../UI/tinyspinner";
import { isTSMethodSignature } from "@babel/types";

const MessageInbox = (props) => {
  const { added, user, messId, messages } = props;
  const filteredMessage =
    messages && messages.filter((mes) => mes.id === messId);
  const [messageText, setMessage] = useState();
  const [error, setError] = useState();
  const [loading, setloading] = useState(false);
  const [dis, setDis] = useState(false);
  const messi = messages && messages[0];
  const deleteMassage = () => {};
  const addMessage = () => {
    setError(null);
    if (!filteredMessage || !messageText) {
      setError("You need to select a message or add text");
      return;
    }
    setloading(true);
    setDis(true);
    const { added_by, recived } = filteredMessage[0];
    const arr = [added_by, recived];
    const userInfo = firebase.firestore().collection("user_aditional");
    const promises = arr.map((d) =>
      userInfo.doc(d).collection("conversations").doc(messId)
    );
    return Promise.all(promises)
      .then((items) => {
        items.forEach((item) => {
          item.update({
            replies: firebase.firestore.FieldValue.arrayUnion({
              added_by: user && user.uid,
              created_at: firebase.firestore.Timestamp.now(),
              recived: added_by !== user.uid ? added_by : recived,
              input: messageText,
            }),
          });
        });
      })
      .then(() => {
        setloading(false);
        setDis(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        setDis(false);
        setMessage("");
      });
  };
  return (
    <Fragment>
      <div className={classes.cover}>
        <div className={classes.top}>
          <div
            className={
              added
                ? classes.header
                : classes.header + " " + classes.colorHeader
            }
          >
            <p> {user.name}</p>
            <p className={classes.error}>{error && error}</p>

            <div className={classes.bin} onClick={() => {}}>
              <Bin color="white" width="40px" />
            </div>
          </div>
        </div>
        {!loading ? (
          <div className={classes.inner}>
            {messages && (
              <MessageInboxItem
                filtered={!filteredMessage ? messi : filteredMessage[0]}
                user={user}
                messId={messId}
                added={added}
              />
            )}
          </div>
        ) : (
          <div className={classes.spinner}>
            <TinySpinner width="200px" height="200px" />
          </div>
        )}

        <div className={classes.holder}>
          <div
            className={
              added
                ? classes.inputDiv
                : classes.inputDiv + " " + classes.colorHeader
            }
          >
            <div className={classes.inputCover + " " + "input-group"}>
              <input
                type="text"
                className={classes.input + " " + "form-control"}
                placeholder="Your message....."
                value={messageText || ""}
                disabled={dis}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="input-group-append">
                <span
                  className={
                    added
                      ? classes.group + " " + "input-group-text"
                      : classes.group +
                        " " +
                        "input-group-text" +
                        " " +
                        classes.colorHeader
                  }
                  onClick={() => addMessage()}
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MessageInbox;
