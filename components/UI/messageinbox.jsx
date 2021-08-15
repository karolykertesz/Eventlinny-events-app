import React, { useState, useEffect, useCallback } from "react";
import classes from "../UI/ui-modules/message.inbox.module.css";
import Bin from "../UI/icons/trash-bin";

const MessageInbox = (props) => {
  const { added, user } = props;
  return (
    <div className={classes.top}>
      <div
        className={
          added ? classes.header : classes.header + " " + classes.colorHeader
        }
      >
        <p> {user.name}</p>
        <div className={classes.bin}>
          <Bin color="white" width="40px" />
        </div>
      </div>
    </div>
  );
};

export default MessageInbox;
