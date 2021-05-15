import Link from "next/link";
import firebase from "firebase";
import { useEffect, useState } from "react";
import classes from "./main-header.module.css";
import styled from "styled-components";
import { useRouter } from "next/router";
import FirebaseClient from "../../helpers/firebase";
import { IconContext } from "react-icons";
import { BsFillPersonFill } from "react-icons/bs";
import DropDown from "../../components/dropdown";

FirebaseClient();
const Header = () => {
  const [userS, setUserS] = useState();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      return firebase.auth().onAuthStateChanged(async (user) => {
        const session = await fetch("/api/users/validateSesion");
        const status = await session.status;
        if (status === 200 && user) {
          setUserS(user);
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
    if (status === 200) {
      window.location.href = "/login";
      return;
    }
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

      {userS !== undefined ? (
        <div className={classes.navLinks}>
          <Link href="/startup">Event pick</Link>
          <Link href="/events">All Events</Link>
          <Link href="/events">All Events</Link>

          <IconWrap onClick={() => setShow(!show)}>
            <IconContext.Provider
              value={{
                className: classes.icon,
                size: "25px",
              }}
            >
              <BsFillPersonFill />
            </IconContext.Provider>
          </IconWrap>
          <Link href="/login">
            <span className={classes.link} onClick={() => userSignOut()}>
              Sign Out
            </span>
          </Link>
          <DropDown cls={show} uid={1} />
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

const IconWrap = styled.span`
  padding: auto 0;
  display: inline;
  margin-top: 10px;
  padding-top: 3px;
  float: right;
  @media (max-width: 600px) {
    left: 10px;
    top: 200px;
    position: absolute;
  }
`;
