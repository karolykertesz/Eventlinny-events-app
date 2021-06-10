import react, { useState, useEffect, Fragment } from "react";
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
    <Fragment>
      {!user || !location || !userInfo ? (
        <div>Loadin ...</div>
      ) : (
        <div className={classes.top}>
          <div className={classes.inner}>
            <table className={classes.usertable}>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }}>Your Personal Details</td>
                  <td></td>
                  <td>
                    {imgUrl ? (
                      <>
                        <Image
                          width={100}
                          height={100}
                          src={imgUrl}
                          quality={100}
                        />
                      </>
                    ) : (
                      <CoverRow>
                        <FileInput type="file" onChange={fileChange} />
                        <Pi style={{ textTransform: "uppercase" }}>
                          Add Image
                        </Pi>
                        <IconCover height="60px" width="50px">
                          <UserIcon />
                        </IconCover>
                      </CoverRow>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{filtereduser && filtereduser.name}</td>
                  <td>
                    <Link href="/userpage/edit/name">Change ...</Link>
                  </td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{filtereduser.email}</td>
                  <td>
                    <Link href="/userpage/edit/email">Change ...</Link>
                  </td>
                </tr>
                <tr>
                  <th>Location:</th>
                  <td>{userLocation}</td>
                  <td>
                    <Link href="/userpage/edit/email">Change ...</Link>
                  </td>
                </tr>
                <tr>
                  <th>Birthday:</th>
                  <td>
                    {userAdditional.birthday
                      ? userAdditional.birthday
                      : "Add your birthday.."}
                  </td>
                  <td>
                    <Link href={`/userpage/edit/birthday?uid=${user.uid}`} ui>
                      {userAdditional.birthday
                        ? "change.."
                        : "Add birthday date.."}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>Bio:</th>
                  <td>{userAdditional.bio ? userAdditional.bio : ""}</td>
                  <td>
                    <Link href="/userpage/edit/bio">
                      {userAdditional.bio ? "change.." : "Add your bio.."}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>Language:</th>
                  <td>
                    {userAdditional.language
                      ? userAdditional.language
                      : "Add Your Language"}
                  </td>
                  <td>
                    <Link href={`/userpage/edit/language?uid=${user.uid}`}>
                      {userAdditional.language
                        ? "change.."
                        : "Add your prefered language.."}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>

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
    </Fragment>
  );
};

export default Userpage;
