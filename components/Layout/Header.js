import Link from "next/link";
import { useContext } from "react";
import classes from "./main-header.module.css";
import { UserContext } from "./Layout";
import styled from "styled-components";
import { useRouter } from "next/router";

const Header = ({ user }) => {
  const router = useRouter();
  // const user = useContext(UserContext);
  const userSignOut = async () => {
    const mess = await fetch("/users/logout");
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
        </label>
      </div>

      {user ? (
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
