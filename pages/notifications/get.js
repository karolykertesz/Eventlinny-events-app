import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from "react";
import classes from "../../components/UI/ui-modules/notification.get.module.css";
import { useRouter } from "next/router";
import { categories } from "../../data";
import firebase from "firebase";
import NotiItem from "../../components/UI/notificationItem";
import Loader from "../../components/UI/loader";
import { addtocategories } from "../../helpers/notihelpers/addtocategories";
import { useAuth } from "../../components/Layout/UserContext";
import { useRedirect } from "../../helpers/validatehelp";

const GetNote = () => {
  useRedirect();
  const modeRef = useRef(true);
  const router = useRouter();
  const id = router.query.id;
  const filteredCat = categories.filter((i) => i !== "create");
  const [cat, setCat] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [arrayUpdated, setUpdated] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useAuth().user;
  const email = user ? user.email : null;
  const setItem = (item) => {
    if (cat.includes(item)) {
      let newArray = cat.filter((i) => i !== item);
      setCat(newArray);
    } else {
      cat.push(item);
    }
    setIsOn(!isOn);
  };

  // const dt = filteredCat.filter((item, inx) => !arr.includes(item));
  const getNotiz = useCallback(async () => {
    const docref = await firebase
      .firestore()
      .collection("user_aditional")
      .doc(id);
    await docref.onSnapshot(async (doc) => {
      let noteArray = (await doc.data().notification_pref)
        ? doc.data().notification_pref
        : [];

      if (noteArray.length > 0) {
        const arrayUpdate = await filteredCat.filter(
          (item) => !doc.data().notification_pref.includes(item)
        );
        await setUpdated(arrayUpdate);
      } else {
        setUpdated(filteredCat);
      }
    });
  }, [id, setUpdated]);
  useEffect(() => {
    getNotiz();
    return () => {
      modeRef.current = false;
    };
  }, [getNotiz]);
  const sendNoti = async () => {
    setLoading(true);
    try {
      const dataref = await firebase
        .firestore()
        .collection("user_aditional")
        .doc(id && id);
      await dataref
        .get()
        .then(async (doc) => {
          if (doc.data().notification_pref) {
            cat.forEach((item) => {
              dataref.update({
                notification_pref:
                  firebase.firestore.FieldValue.arrayUnion(item),
              });
            });
          } else {
            await dataref.update({
              notification_pref: [...cat],
            });
          }
        })
        .then(() => {
          addtocategories(email && email, cat);
          setLoading(false);
          setIsOn(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={classes.coverDiv}>
      <div className={classes.head}>
        {arrayUpdated.length > 0 ? (
          <Fragment>
            <p>Would You like to recive Notifications?</p>
            <p>Select from Remaining Categories Below!!</p>
          </Fragment>
        ) : (
          <Fragment>
            <p>You Have selected All Categories</p>
          </Fragment>
        )}
      </div>
      <div className={classes.body}>
        {arrayUpdated &&
          arrayUpdated.map((item) => (
            <div
              className={classes.btn}
              onClick={() => setItem(item)}
              key={item}
            >
              <div className={classes.btnDiv}>{item}</div>
            </div>
          ))}
      </div>
      <div className={classes.footer}>
        {cat.length > 0 && arrayUpdated.length > 0 ? (
          <div>
            <button className={classes.btnSend} onClick={sendNoti}>
              Send
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default GetNote;
