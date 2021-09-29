import Link from "next/link";
import firebase from "firebase";
import { useEffect, useState, Fragment, useCallback, useRef } from "react";
import classes from "./main-nav.module.css";

import { useRouter } from "next/router";
import ButtonPop from "../UI/buttonpop";
import { useAuth } from "../Layout/UserContext";
import BigLoader from "../UI/BigLoader";
import Image from "next/image";
import { useIsCompleted } from "../../helpers/firebase-hooks/get-is-user-completed";

const Header = () => {
  const user = useAuth().user;
  const modeRef = useRef(true);
  const [userS, setUserS] = useState();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = useCallback(async () => {
    const mess = await fetch("/api/users/validateSesion");
    const status = await mess.status;
    if (status === 200) {
      setUserS(true);
    } else if (status !== 200) setUserS(false);
  }, [setUserS]);
  useEffect(() => {
    validate();
    return () => {
      modeRef.current = false;
    };
  }, [validate]);

  const sout = async () => {
    setLoading(true);
    const cancelChat = firebase.functions().httpsCallable("signCheckOut");
    await cancelChat();
    return firebase
      .auth()
      .signOut()
      .then(async () => {
        const logo = await fetch("/api/users/logout");
      })
      .then(() => {
        setUserS(false);
      })
      .then(() => setLoading(false))
      .then(() => (window.location.href = "/login"))
      .catch((err) => console.log(err));
  };
  const { completed } = useIsCompleted(user && user.uid);
  if (loading) {
    return <BigLoader />;
  }
  return (
    <nav className={classes.nav}>
      <input type="checkbox" className={classes.toggle} id="nav-toggle" />
      <div className={classes.logo}>
        <a href={userS !== false ? "/events/first" : "#"}>
          <Image src="/images/e.png" width="30px" height="30px" />
        </a>
      </div>
      <div className={classes.links}>
        <span
          style={{ display: "flex" }}
          className={!completed ? classes.visHid : ""}
        >
          <Link href="/chat/main">Chats</Link>
          <Link href="/events">All Events</Link>
          <Link href="/events/find">Find an Event</Link>
          <Link href="/events/archive">Archive</Link>
        </span>
        <span onClick={() => sout()}>
          <Link href="#">Sign Out</Link>
        </span>
        <span className={!completed ? classes.visHid : ""}>
          <Link href="/events/archive">
            <ButtonPop>Your profile</ButtonPop>
          </Link>
        </span>
      </div>
      <label htmlFor="nav-toggle" className={classes.iconToggle}>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
      </label>
    </nav>
  );
};

export default Header;

// const IconWrap = styled.span`
//   padding: auto 0;
//   display: inline;
//   color: papayawhip;
//   margin-top: 10px;
//   padding-top: 3px;
//   height: 30px;
//   cursor: pointer;
//   float: right;
//   @media (max-width: 600px) {
//     /* left: 10px; */
//     /* top: 200px; */
//     position: absolute;
//     color: peru;
//     display: block;
//     cursor: pointer;
//     margin: 0;
//     padding: 0;
//     font-size: 40px;
//     right: 0;
//   }
// `;
