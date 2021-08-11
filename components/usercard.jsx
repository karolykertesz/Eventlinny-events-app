import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import classes from "../components/UI/ui-modules/user.module.css";
import { useAuth } from "../components/Layout/UserContext";
import firebase from "firebase";
const UserCard = (props) => {
  const { user, events, id } = props;
  const [admin, setAdmin] = useState();

  const getUserdata = useCallback(async () => {
    if (id) {
      const getData = firebase.functions().httpsCallable("getuserData");
      await getData({ uid: id }).then((result) => {
        setAdmin(result.data.user);
      });
    }
  }, [setAdmin]);

  const LastSigned = new Date(admin && admin.lastSignInTime).toLocaleDateString(
    "de-De",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );
  const created = new Date(admin && admin.creationTime).toLocaleDateString(
    "de-De",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  useEffect(() => {
    getUserdata();
  }, [getUserdata]);
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
        <p>Birthday: {user.birthday ? user.birthday : "No Birthday added"}</p>
        <p>Events Added: {events ? events.length : "(0)"}</p>
        <p>Account Created: {admin && created}</p>
        <p>Last Visit: {admin && LastSigned}</p>
      </div>
    </div>
  );
};

export default UserCard;
