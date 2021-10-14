import react, { useState, useEffect, Fragment } from "react";
import firebase from "firebase";
import Link from "next/link";
import Image from "next/image";
import classes from "../components/UI/ui-modules/userpage.module.css";
import { VscChromeClose, VscDiffAdded } from "react-icons/vsc";
import { IconContext } from "react-icons";
import Plus from "../components/UI/icons/plus";
import { useRouter } from "next/router";
import BigLoader from "../components/UI/BigLoader";
import {
  Pi,
  IconCover,
  CoverRow,
  FileInput,
} from "../components/UI/styledindex";
import UserIcon from "../components/UI/icons/user-icon";

const Userpage = ({ user, userInfo, location, userAdditional, imgUrl }) => {
  const router = useRouter();
  const [userPrefs, setUserPrefs] = useState();
  const filtereduser = user && user;
  const userLocation = location && location.location;

  const countryCode = location && location.countryCode.toUpperCase();
  const createDisplaylocation = () => {
    if (!userLocation) {
      return "";
    }
    const splitLoc = userLocation.split(",");
    return [splitLoc[0], splitLoc[splitLoc.length - 1]].join(",");
  };
  const deleteElement = async (element) => {
    const docref = firebase
      .firestore()
      .collection("user_aditional")
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
        <BigLoader />
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
                      <div>
                        <Image
                          width={100}
                          height={100}
                          src={imgUrl}
                          quality={100}
                        />
                      </div>
                    ) : (
                      <CoverRow>
                        <FileInput type="file" onChange={fileChange} />
                        <IconCover height="50px" width="50px">
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
                    <span className={classes.desk}>
                      <Link href="/userpage/edit/name">Change ...</Link>
                    </span>
                    <span
                      className={classes.mobil}
                      onClick={() => router.push("/userpage/edit/name")}
                    >
                      <Plus width="30px" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{filtereduser.email}</td>
                  <td>
                    <span className={classes.desk}>
                      <Link href="/userpage/edit/email">Change ...</Link>
                    </span>
                    <span
                      className={classes.mobil}
                      onClick={() => router.push("/userpage/edit/email")}
                    >
                      <Plus width="30px" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Location:</th>
                  <td>{createDisplaylocation()}</td>
                  <td>
                    <span className={classes.desk}>
                      <Link
                        href={`/userpage/edit/location?def=${countryCode}&uid=${user.uid}`}
                      >
                        Change ...
                      </Link>
                    </span>
                    <span
                      className={classes.mobil}
                      onClick={() =>
                        router.push(
                          `/userpage/edit/location?def=${countryCode}&uid=${user.uid}`
                        )
                      }
                    >
                      <Plus width="30px" />
                    </span>
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
                    <span className={classes.desk}>
                      <Link href={`/userpage/edit/birthday?uid=${user.uid}`}>
                        {userAdditional.birthday
                          ? "change.."
                          : "Add birthday date.."}
                      </Link>
                    </span>
                    <span
                      className={classes.mobil}
                      onClick={() =>
                        router.push(`/userpage/edit/birthday?uid=${user.uid}`)
                      }
                    >
                      <Plus width="30px" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Bio:</th>
                  <td>{userAdditional.bio ? userAdditional.bio : ""}</td>
                  <td>
                    <span className={classes.desk}>
                      <Link href="/userpage/edit/bio">
                        {userAdditional.bio ? "change.." : "Add your bio.."}
                      </Link>
                    </span>
                    <span
                      className={classes.mobil}
                      onClick={() => router.push("/userpage/edit/bio")}
                    >
                      <Plus width="30px" />
                    </span>
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
                    <span className={classes.desk}>
                      <Link href={`/userpage/edit/language?uid=${user.uid}`}>
                        {userAdditional.language
                          ? "change.."
                          : "Add your prefered language.."}
                      </Link>
                    </span>
                    <span
                      className={classes.mobil}
                      onClick={() =>
                        router.push(`/userpage/edit/language?uid=${user.uid}`)
                      }
                    >
                      <Plus width="30px" />
                    </span>
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
                  <p className={classes.secPi}>Add PREFERENCES</p>
                </span>
              </Link>
            </div>
            <ul className={classes.list}>
              {userInfo &&
                userInfo.map((item) => (
                  <li key={item} className={classes.listitem}>
                    {item}
                    <IconContext.Provider value={{ className: classes.icon }}>
                      <div onClick={() => deleteElement(item)}>
                        <VscChromeClose />
                      </div>
                    </IconContext.Provider>
                  </li>
                ))}
            </ul>
            <div className={classes.everet}>
              <Link href={`/events/calendar/${user.uid}`}>
                Your Added Events Click to view
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Userpage;
