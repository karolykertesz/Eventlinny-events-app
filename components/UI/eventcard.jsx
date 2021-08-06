import React, { useState } from "react";
import classes from "../UI/ui-modules/event.card.module.css";
import Image from "next/image";
import AddressIcon from "../UI/icons/address-icon";
import DateIcon from "../UI/icons/date-icon";
import UsersIcon from "../UI/icons/users";
import User from "../UI/icons/user-icon";
import Globe from "../UI/icons/globe";
import Plus from "../UI/icons/plus";
import TopImage from "./topimage";
import { useAuth } from "../Layout/UserContext";
import firebase from "firebase";
import Tinyspinner from "./tinyspinner";
const Eventcard = (props) => {
  const {
    url,
    category,
    desc,
    created_by,
    address,
    attendies,
    date,
    added_by,
    id,
  } = props;
  const smartDate =
    date &&
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  const user = useAuth().user;
  const uid = user && user.uid;
  const isSigned = attendies.indexOf(uid && uid) > -1 ? true : false;
  const [signedUp, setSigned] = useState(isSigned);
  const [loading, setLoading] = useState(false);
  const signUp = () => {
    setLoading(true);
    return firebase
      .firestore()
      .collection("user_add_events")
      .doc(id)
      .update({
        attendies: firebase.firestore.FieldValue.arrayUnion(uid && uid),
      })
      .then(() => setSigned(true))
      .then(() => setLoading(false));
  };
  if (loading) {
    return <Tinyspinner width="200px" height="200px" />;
  }
  return (
    <div className={classes.top}>
      <div className={classes.card + " " + classes.middle}>
        <div className={classes.front}>
          <Image
            src={url}
            alt={category}
            width="350px"
            height="450px"
            quality={100}
          />
        </div>
        <div className={classes.back}>
          <div className={classes.backContent + " " + classes.middle}>
            <div className={classes.logo}>
              <Image src="/images/e.png" width="80px" height="80px" />
            </div>
            <h3>{desc}</h3>
            <div className={classes.backHolder}>
              <div className={classes.iconHolder}>
                <p>{category}</p>
                <Globe width="30px" height="30px" />
              </div>
              <div className={classes.iconHolder + " " + classes.user}>
                <p>{created_by}</p>
                <TopImage added_by={added_by} />
              </div>
              <div className={classes.iconHolder}>
                <p>{attendies.length}</p>
                <UsersIcon width="30px" height="30px" />
              </div>
              <div className={classes.iconHolder}>
                <p>{smartDate}</p>
                <DateIcon width="30px" height="30px" />
              </div>
              <div className={classes.iconHolder}>
                <p>{address}</p>
                <AddressIcon width="30px" height="30px" />
              </div>
              {!signedUp && (
                <div
                  className={classes.iconHolder + " " + classes.sup}
                  onClick={() => signUp()}
                >
                  <p>Sign Up</p>
                  <Plus width="30px" height="30px" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventcard;
