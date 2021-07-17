import React, { useState, useEffect } from "react";
import firebase from "firebase";
import classes from "./UI/ui-modules/singleInput.module.css";
import { Pi, Buttondiv } from "../pages/userpage/edit/location";
import { useRouter } from "next/router";
const Singleinput = ({ item }) => {
  const router = useRouter();
  const [updateItem, setUpdateItem] = useState("");
  const [thank, setThank] = useState(false);
  const [message, setMessage] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const getuser = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => getuser();
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    if (item === "email" && user) {
      return user
        .updateEmail(updateItem)
        .then(() => {
          return user
            .sendEmailVerification()
            .then(() => {
              setThank(true);
              setMessage("Email varificaton sent!!");
            })
            .then(() => console.log("Email set"));
        })
        .catch((err) => setMessage(err.message));
    }
    if (item === "name" && user) {
      return user
        .updateProfile({
          displayName: updateItem,
        })
        .then(async () => {
          const dataref = firebase
            .firestore()
            .collection("user_aditional")
            .doc(user && user.uid);
          await dataref.update({
            name: updateItem,
          });
        })
        .then(() => {
          setThank(true);
          setMessage("Your name has been updated");
        })
        .then(() => console.log("name set"))
        .catch((err) => {
          throw new Error(err);
        });
    }
    if (item === "bio" && user) {
      const docref = firebase
        .firestore()
        .collection("user_aditional")
        .doc(user.uid);
      return docref
        .update({
          bio: updateItem,
        })
        .then(() => {
          setThank(true);
          setMessage("Your bio is set!!");
        });
    }
  };
  return (
    <div className={classes.holder}>
      {!thank ? (
        <div className={classes.divContainer}>
          <p> Update your {item}</p>
          <form onSubmit={formSubmit}>
            <div className={classes.container}>
              {item !== "bio" ? (
                <input
                  type={item === "email" ? "email" : "text"}
                  placeholder={
                    item === "email"
                      ? "Your email goes here"
                      : "Your Name goes here"
                  }
                  value={updateItem}
                  onChange={(e) => setUpdateItem(e.target.value)}
                />
              ) : (
                <textarea
                  placeholder="Enter Your Bio"
                  value={updateItem}
                  onChange={(e) => setUpdateItem(e.target.value)}
                  rows="4"
                  cols="50"
                />
              )}
            </div>
            <button className={classes.btn + " " + classes.update}>
              Update
            </button>
          </form>
          <Pi>{message && message}</Pi>
        </div>
      ) : (
        <div className={classes.divContainer}>
          <Pi>Thank You, {message && message}</Pi>
          <Buttondiv>
            <button
              className={classes.btn}
              onClick={() => router.push("/events/first")}
            >
              Go Back
            </button>
          </Buttondiv>
        </div>
      )}
    </div>
  );
};

export default Singleinput;
