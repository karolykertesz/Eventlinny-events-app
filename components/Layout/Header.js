import Link from "next/link";
import firebase from "firebase";
import { useEffect, useState, Fragment, useCallback, useRef } from "react";
import classes from "./main-header.module.css";
import styled from "styled-components";
import { useRouter } from "next/router";
import FirebaseClient from "../../helpers/firebase";
import MobileLogout from "../UI/mobillogout";
import ButtonPop from "../UI/buttonpop";

FirebaseClient();
const Header = () => {
  const modeRef = useRef(true);
  const [userS, setUserS] = useState();
  const router = useRouter();
  const [show, setShow] = useState(false);

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

  const sout = () => {
    return firebase
      .auth()
      .signOut()
      .then(async () => {
        const logo = await fetch("/api/users/logout");
      })
      .then(() => {
        setUserS(false);
      })
      .then(() => (window.location.href = "/login"))
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.nav}>
      <input type="checkbox" id="nav-check" className={classes.navCheck} />
      <div className={classes.navHeader}>
        <div className={classes.navTitle}>
          <Link href="/events/first">Eventlinny</Link>
        </div>
      </div>

      <div className={classes.navBtn}>
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      {userS !== false ? (
        <div className={classes.navLinks}>
          <Link href="/chat/main">Chats</Link>
          <Link href="/events">All Events</Link>
          <Link href="/events/find">Find an Event</Link>
          <Link href="/events/archive">Archive</Link>
          <ButtonPop />
          <span className={classes.link} onClick={() => sout()}>
            Sign Out
          </span>
        </div>
      ) : (
        <Fragment>
          <MobileLogout />
        </Fragment>
      )}
    </div>
  );
};

export default Header;

const IconWrap = styled.span`
  padding: auto 0;
  display: inline;
  color: papayawhip;
  margin-top: 10px;
  padding-top: 3px;
  height: 30px;
  cursor: pointer;
  float: right;
  @media (max-width: 600px) {
    /* left: 10px; */
    /* top: 200px; */
    position: absolute;
    color: peru;
    display: block;
    cursor: pointer;
    margin: 0;
    padding: 0;
    font-size: 40px;
    right: 0;
  }
`;
