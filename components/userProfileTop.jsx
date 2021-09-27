import classes from "../components/UI/ui-modules/userprofile.module.css";
import react, { Fragment, useEffect, useState } from "react";
import FirebaseClient from "../helpers/firebase";
import firebase from "firebase";
FirebaseClient();

const UserProfileTop = ({ user, querry }) => {
  console.log(querry);
  return (
    <Fragment>
      <div className={classes.cover}>
        {user && (
          <ul>
            <li>{user.name}</li>
            <li>{user.email}</li>
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default UserProfileTop;
