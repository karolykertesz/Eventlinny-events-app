import classes from "../components/UI/ui-modules/userprofile.module.css";
import react, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
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
