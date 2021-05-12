import Link from "next/link";
import firebase from "firebase";
import { useContext, useEffect, useState } from "react";
import classes from "./main-header.module.css";
import styled from "styled-components";
import { useRouter } from "next/router";
import FirebaseClient from "../../helpers/firebase";
import { useAuth } from "../Layout/UserContext";
FirebaseClient();
const Header = () => {
  const [userS, setUserS] = useState();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      return firebase.auth().onAuthStateChanged(async (user) => {
        const session = await fetch("/api/users/validateSesion");
        const status = await session.status;
        if (status === 200) {
          return setUserS(true);
        } else {
          return setUserS(undefined);
        }
      });
    };
    return getUser();
  }, []);
  const userSignOut = async () => {
    await setUserS(undefined);
    const mess = await fetch("api/users/logout");
    const status = await mess.status;
    status === 200 && router.push("/login");
  };
  return (
    <div className={classes.nav}>
      <input type="checkbox" id="nav-check" className={classes.navCheck} />
      <div className={classes.navHeader}>
        <div className={classes.navTitle}>Eventlinny</div>
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

      {userS ? (
        <div className={classes.navLinks}>
          <Link href="/startup">Event pick</Link>
          <Link href="/events">All Events</Link>
          <Link href="/events">All Events</Link>
          <Link href="/events">All Events</Link>
          <Link href="/login">
            <span className={classes.link} onClick={() => userSignOut()}>
              Sign Out
            </span>
          </Link>
        </div>
      ) : (
        <div className={classes.navLinks}>
          <Link href="/login">Log in</Link>
          <Link href="/signup">Sign up</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
