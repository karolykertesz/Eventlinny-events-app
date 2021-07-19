import react, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRedirect } from "../../helpers/validatehelp";
import classes from "../../components/UI/ui-modules/main.chat.module.css";
import firebase from "firebase";
import Loader from "../../components/UI/loader";
import useBanned from "../../helpers/checkBanned";
const Main = () => {
  useRedirect();
  const isBanned = useBanned();
  const [pubCount, setPub] = useState();
  const [privCount, setPriv] = useState();
  const setNumbers = useCallback(async () => {
    const docrefPub = firebase
      .firestore()
      .collection("chat_rooms_counter")
      .doc("public");
    const docrefPriv = firebase
      .firestore()
      .collection("chat_rooms_counter")
      .doc("private");
    await docrefPub.onSnapshot((doc) => {
      const total = doc.data().total;
      setPub(total);
    });
    await docrefPriv.onSnapshot((doc) => {
      const total = doc.data().total;
      setPriv(total);
    });
  }, [pubCount, setPriv]);
  console.log(privCount);
  useEffect(() => {
    setNumbers();
  }, [setNumbers]);
  const PublicLinkHelper = (props) => {
    if (pubCount && pubCount > 0) {
      return <Link href="/chat/publiclist">{props.children}</Link>;
    } else {
      return <div className={classes.inactive}>{props.children}</div>;
    }
  };
  const PrivateLinkHelper = (props) => {
    if (privCount && privCount > 0) {
      return <Link href="/chat/private">{props.children}</Link>;
    } else {
      return <div className={classes.inactive}>{props.children}</div>;
    }
  };
  if (!privCount || !pubCount) {
    return <Loader />;
  }
  if (isBanned) {
    return (
      <div className={classes.banned}>
        <p>You are banned From chat</p>
      </div>
    );
  }
  return (
    <div className={classes.cover}>
      <p className={classes.intro}>
        Choose Public or Private chat ,the number indicates the amount of chat
        rooms
      </p>
      <div className={classes.top}>
        <PublicLinkHelper>
          <div className={classes.divCover}>
            <p>Public</p>
            <div className={classes.holder}>
              <div className={classes.img}>
                <Image src={`/images/start.jpg`} width="45px" height="45px" />
                <div className={classes.counter}>{pubCount && pubCount}</div>
              </div>
            </div>
          </div>
        </PublicLinkHelper>
        <PrivateLinkHelper>
          <div className={classes.divCover}>
            <p>Private</p>
            <div className={classes.holder}>
              <div className={classes.img}>
                <Image src={`/images/start.jpg`} width="45px" height="45px" />
                <div className={classes.counter}>{privCount && privCount}</div>
              </div>
            </div>
          </div>
        </PrivateLinkHelper>
      </div>
    </div>
  );
};

export default Main;
