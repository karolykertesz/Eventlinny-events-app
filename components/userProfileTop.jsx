import classes from "../components/UI/ui-modules/userprofile.module.css";
import react, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import FirebaseClient from "../helpers/firebase";
import firebase from "firebase";
import { auth, useAuth } from "../components/Layout/UserContext";
FirebaseClient();

const UserProfileTop = ({ querry }) => {
  const router = useRouter();
  const [userInct, setUser] = useState();
  useEffect(() => {
    return async () => {
      const user = await firebase.auth().currentUser;
      if (user && querry) {
        setUser({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
        });
      } else {
        // router.push("/login");
      }
    };
  }, []);
  console.log(userInct);
  return (
    <Fragment>
      <div className={classes.cover}>
        {userInct && (
          <ul>
            <li>{userInct.name}</li>
            <li>{userInct.email}</li>
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default UserProfileTop;
