import Link from "next/link";
import firebase from "firebase";
import { useEffect, useState } from "react";
import classes from "./main-header.module.css";
import styled from "styled-components";
import { useRouter } from "next/router";
import FirebaseClient from "../../helpers/firebase";
import { IconContext } from "react-icons";
import { BsDisplay, BsFillPersonFill } from "react-icons/bs";
import DropDown from "../../components/dropdown";
import Dimension from "../../helpers/dimension";
import MobileLogout from "../UI/mobillogout";
// import getUser from "../../pages/api/users/helpers/currentuser";

FirebaseClient();
const Header = () => {
  const [userS, setUserS] = useState();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { width } = Dimension();

  // const mobile = width > 600 ? classes.navBtn : classes.noneD;
  // const links = width > 600 ? classes.navLinks : classes.close;

  useEffect(() => {
    const getUser = async () => {
      const session = await fetch("/api/users/validateSesion");
      const status = await session.status;
      if (status === 200) {
        setUserS(true);
        return;
      } else {
        setUserS(undefined);
        return;
      }
    };
    getUser();
  }, []);

  const sout = async () => {
    await setUserS(undefined);
    const out = await fetch("api/users/logout");
    return firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = "/login";
      })
      .catch((err) => console.log(err));
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
      {userS !== "undifined" ? (
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
          <span>
            <span className={classes.link} onClick={() => sout()}>
              Sign Out
            </span>
          </span>
          <DropDown cls={show} uid={1} />
        </div>
      ) : width > 599 && userS === undefined ? (
        <div className={classes.navLinks}>
          <Link href="/login">Log in</Link>
          <Link href="/signup">Sign up</Link>
        </div>
      ) : (
        <MobileLogout />
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
