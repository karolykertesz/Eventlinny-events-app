import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import classes from "../components/UI/ui-modules/user.module.css";
const UserCard = (props) => {
  const { user, events } = props;

  return (
    <div className={classes.container}>
      <div className={classes.topCont}>
        <div className={classes.imageHolder}>
          <Image
            width="80px"
            height="80px"
            quality={100}
            src={user.imgUrl}
            alt="user image"
          />
        </div>
      </div>
      <div className={classes.buttCont}>
        <h4>{user.name}</h4>
        <p>Bio:{user.bio ? user.bio : "No Bio Shared"}</p>
        <p>Language: {user.language ? user.language : "No language shared"}</p>
        <p>Events Added: {events ? events.length : "(0)"}</p>
      </div>
    </div>
  );
};

export default UserCard;
