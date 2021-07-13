import react, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRedirect } from "../../helpers/validatehelp";
import classes from "../../components/UI/ui-modules/main.chat.module.css";
import firebase from "firebase";
const Main = () => {
  useRedirect();
  const [pubCount, setPub] = useState();
  const [privCount, setPriv] = useState();
  const setNumbers = useCallback(async () => {
    const docref = firebase.firestore().collection("chat_rooms_counter");
    await docref
      .doc("public")
      .get()
      .then((doc) => {
        const total = doc.data().total;
        setPub(total);
      })
      .then(async () => {
        await docref
          .doc("private")
          .get()
          .then((doc) => {
            const total = doc.data().total;
            setPriv(total);
          });
      });
  }, [pubCount, setPriv]);
  useEffect(() => {
    setNumbers();
  }, [setNumbers]);
  return (
    <div className={classes.cover}>
      <p className={classes.intro}>
        Choose Public or Private chat ,the number indicates the amount of chat
        rooms
      </p>
      <div className={classes.top}>
        <Link href="/chat/publiclist">
          <div className={classes.divCover}>
            <p>Public</p>
            <div className={classes.holder}>
              <div className={classes.img}>
                <Image src={`/images/start.jpg`} width="45px" height="45px" />
                <div className={classes.counter}>{pubCount && pubCount}</div>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/chat/private">
          <div className={classes.divCover}>
            <p>Private</p>
            <div className={classes.holder}>
              <div className={classes.img}>
                <Image src={`/images/start.jpg`} width="45px" height="45px" />
                <div className={classes.counter}>{privCount && privCount}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Main;
