import firebase from "firebase";
import react, { useState } from "react";
import { language } from "../data";
import classes from "./UI/ui-modules/locationState.module.css";
import { Pi, Buttondiv } from "../pages/userpage/edit/location";
import { useRouter } from "next/router";
const Languagepicker = ({ uid }) => {
  const router = useRouter();
  const [selected, setselected] = useState();
  const [message, setmassage] = useState();
  const [isSet, setisSet] = useState(false);
  const formSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      const docref = firebase.firestore().collection("user_aditional").doc(uid);
      return docref
        .update({
          language: selected,
        })
        .then(() => {
          setmassage("Your Prefered language set!");
          setisSet(true);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {!isSet ? (
        <div className={classes.cover}>
          <Pi>Add Your Language</Pi>
          <div className={classes.container}>
            <form onSubmit={formSubmit}>
              <select
                onChange={(e) => setselected(e.target.value)}
                className={classes.mainselection}
              >
                {language.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <Buttondiv>
                <button className={classes.btn}>Add Your Language</button>
              </Buttondiv>
            </form>
          </div>
        </div>
      ) : (
        <div className={classes.cover}>
          <Pi>{message && message}</Pi>
          <Buttondiv>
            <button
              className={classes.btn + " " + classes.update}
              onClick={() => router.push("/events")}
            >
              GO BACK
            </button>
          </Buttondiv>
        </div>
      )}
    </>
  );
};

export default Languagepicker;
