import Link from "next/link";
import firebase from "firebase";
import { useEffect, useState, Fragment, useCallback } from "react";
import classes from "./main-header.module.css";
import styled from "styled-components";
import { useRouter } from "next/router";
import FirebaseClient from "../../helpers/firebase";
import { IconContext } from "react-icons";
import { BsFillPersonFill, BsViewStacked } from "react-icons/bs";
import DropDown from "../../components/dropdown";
import MobileLogout from "../UI/mobillogout";
import { useAuth } from "../Layout/UserContext";

FirebaseClient();
const Header = () => {
  const [userS, setUserS] = useState();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setUserS(undefined);
      }
      setUserS(user);
    });
    return;
  }, []);
  useEffect(() => {
    validate();
  }, []);

  const validate = async () => {
    const mess = await fetch("/api/users/validateSesion");
    const status = await mess.status;
    if (status === 400) {
      setUserS(null);
    }
  };

  const sout = async () => {
    try {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          setUserS(null);
        })
        .then(() => {
          return (window.location.href = "/login");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
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
      {userS ? (
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
  margin-top: 10px;
  padding-top: 3px;
  float: right;
  @media (max-width: 600px) {
    left: 10px;
    top: 200px;
    position: absolute;
  }
`;
