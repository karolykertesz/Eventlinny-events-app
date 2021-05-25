import react, { useReducer, useState, useEffect } from "react";
import firebase from "firebase";
import Link from "next/link";
import classes from "../components/UI/ui-modules/userpage.module.css";
import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";
import { getUserdata } from "../helpers/helpers";
const Userpage = ({ user, userInfo, location }) => {
  const [userPrefs, setUserPrefs] = useState();
  const userAdditional = "";
  const filtereduser = user && user;
  const userInfoNames = userInfo && userInfo.map((item) => item.name);
  const userLocation = location && location.location;
  const countryCode = location && location.countryCode.toUpperCase();

  const deleteElement = async (element) => {
    const docref = firebase
      .firestore()
      .collection("cookies")
      .doc(user && user.uid);
    await docref
      .update({
        pref_events: firebase.firestore.FieldValue.arrayRemove(element),
      })
      .then(() => {
        alert("Done");
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <>
      {!user || !location || !userInfo ? (
        <div>Loadin ...</div>
      ) : (
        <div className={classes.top}>
          <div className={classes.inner}>
            <ul className={classes.userInfo}>
              <li>
                <p>Name:</p>
                <span> {filtereduser && filtereduser.name}</span>
                <p>
                  <Link href="/userpage/edit/name?col=auth">Change ...</Link>
                </p>
              </li>
              <li>
                <p>email:</p>
                <span>{filtereduser.email}</span>
                <p>
                  <Link href="/userpage/edit/email?col=auth">Change ...</Link>
                </p>
              </li>
              <li>
                <p>Your Location: </p>
                <span>{userLocation}</span>
                <span>
                  <Link
                    href={`/userpage/edit/location?def=${countryCode}&uid=${user.uid}`}
                  >
                    Change ...
                  </Link>
                </span>
              </li>
              <li>
                <p>Birthday:</p>
                <span>
                  {userAdditional.birthday ? userAdditional.birthday : ""}
                </span>
                <p>
                  <Link href="/userpage/edit/birthday?col=users">
                    {userAdditional.birthday
                      ? "change.."
                      : "Add birthday date.."}
                  </Link>
                </p>
              </li>
              <li>
                <p>Bio:</p>
                <span>{userAdditional.bio ? userAdditional.bio : ""}</span>
                <p>
                  <Link href="/userpage/edit/bio?col=users">
                    {userAdditional.bio ? "change.." : "Add your bio.."}
                  </Link>
                </p>
              </li>
              <li>
                <p>language:</p>
                <span>
                  {userAdditional.language ? userAdditional.language : ""}
                </span>
                <p>
                  <Link href="/userpage/edit/bio?col=users">
                    {userAdditional.language
                      ? "change.."
                      : "Add your prefered language.."}
                  </Link>
                </p>
              </li>
            </ul>
            <p className={classes.singleP}>Your preferencess:</p>
            <ul className={classes.list}>
              {userInfo &&
                userInfo.map((item) => (
                  <li key={item.id} className={classes.listitem}>
                    {item.name}
                    <IconContext.Provider value={{ className: classes.icon }}>
                      <div onClick={() => deleteElement(item.id)}>
                        <VscChromeClose />
                      </div>
                    </IconContext.Provider>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Userpage;
