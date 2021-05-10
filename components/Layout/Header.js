import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import classes from "./main-header.module.css";
import { UserContext } from "./Layout";
import styled from "styled-components";
import { useRouter } from "next/router";

const Header = ({ user }) => {
  const [userS, setUserS] = useState();
  const closeButton = () => {
    setClose(!close);
  };
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      try {
        const mess = await fetch("/api/users/valuser");
        const status = await mess.status;
        if (status === 200) {
          setUserS(true);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    };
    return getUser();
  }, [userS]);
  const userSignOut = async () => {
    const mess = await fetch("api/users/logout");
    const status = await mess.status;
    setUserS(undefined);
    status === 200 && router.push("/login");
  };
  return (
    <div className={classes.nav}>
      <input type="checkbox" id="nav-check" className={classes.navCheck} />
      <div className={classes.navHeader}>
        <div className={classes.navTitle}>Eventlinny</div>
      </div>

      <div className={classes.navBtn}>
        <label htmlFor="nav-check" onClick={() => setClose(!close)}>
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
