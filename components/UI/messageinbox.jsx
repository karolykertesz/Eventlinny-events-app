import React, { useState, useEffect, useCallback, Fragment } from "react";
import classes from "../UI/ui-modules/message.inbox.module.css";
import Bin from "../UI/icons/trash-bin";
import { BiPaperPlane } from "react-icons/bi";
import { IconContext } from "react-icons";
import MessageInboxItem from "./messageInboxItem";
const MessageInbox = (props) => {
  const { added, user, messId, messages } = props;
  const filteredMessage = messages.filter((mes) => mes.id === messId);
  const [messageText, setMessage] = useState();
  const messi = messages && messages[0];

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
            <div className={classes.bin}>
              <Bin color="white" width="40px" />
            </div>
          </div>
        </div>
        <div className={classes.inner}>
          {messages && (
            <MessageInboxItem
              filtered={!filteredMessage ? messi : filteredMessage[0]}
              user={user}
              messId={messId}
            />
          )}
        </div>
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
                  onClick={() => {}}
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
