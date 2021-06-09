import react, { useState, useEffect } from "react";
import firebase from "firebase";
import Link from "next/link";
import Image from "next/image";
import classes from "../components/UI/ui-modules/userpage.module.css";
import { VscChromeClose, VscDiffAdded } from "react-icons/vsc";
import { IconContext } from "react-icons";
import {
  Pi,
  IconCover,
  CoverRow,
  FileInput,
} from "../components/UI/styledindex";
import UserIcon from "../components/UI/icons/user-icon";

const Userpage = ({ user, userInfo, location, userAdditional, imgUrl }) => {
  const [userPrefs, setUserPrefs] = useState();
  const filtereduser = user && user;
  const userInfoNames = userInfo && userInfo.map((item) => item.name);
  const userLocation = location && location.location;
  const countryCode = location && location.countryCode.toUpperCase();
  console.log(imgUrl, "gjj");
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
  const fileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(user && user.uid)
      .update({
        image_url: fileUrl,
      })
      .then(() => alert("Upploded"))
      .catch((err) => console.log(err));
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
                {!imgUrl ? (
                  <CoverRow>
                    <IconCover height="100px" width="100px">
                      <UserIcon />
                    </IconCover>
                    <CoverRow>
                      <Pi style={{ textTransform: "uppercase" }}>Add Image</Pi>
                      <IconCover height="40px" width="40px" marginRight="50px">
                        <FileInput type="file" onChange={fileChange} />
                      </IconCover>
                    </CoverRow>
                  </CoverRow>
                ) : (
                  <div className={classes.imgCont}>
                    <img width={130} height={130} src={imgUrl} />
                  </div>
                )}
              </li>
              <li>
                <p>Name:</p>
                <span> {filtereduser && filtereduser.name}</span>
                <p>
                  <Link href="/userpage/edit/name">Change ...</Link>
                </p>
              </li>
              <li>
                <p>email:</p>
                <span>{filtereduser.email}</span>
                <p>
                  <Link href="/userpage/edit/email">Change ...</Link>
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
                {
                  <span>
                    {userAdditional.birthday ? userAdditional.birthday : ""}
                  </span>
                }
                <p>
                  <Link href={`/userpage/edit/birthday?uid=${user.uid}`} ui>
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
                  <Link href="/userpage/edit/bio">
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
                  <Link href={`/userpage/edit/language?uid=${user.uid}`}>
                    {userAdditional.language
                      ? "change.."
                      : "Add your prefered language.."}
                  </Link>
                </p>
              </li>
            </ul>

            <div className={classes.iconHolder}>
              <p className={classes.singleP}>YOUR PREFERENCES:</p>
              <Link href={`/userpage/edit/addNewPref/${user.uid}`}>
                <span
                  className={classes.pref}
                  onClick={() => console.log("hh")}
                >
                  <IconContext.Provider
                    value={{ className: classes.icon + " " + classes.secicon }}
                  >
                    <VscDiffAdded />
                  </IconContext.Provider>
                  <p>Add PREFERENCES</p>
                </span>
              </Link>
            </div>
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
            <div className={classes.everet}>
              <Link href={`/events/calendar/${user.uid}`}>
                Your Added Events Click to wiew
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Userpage;
