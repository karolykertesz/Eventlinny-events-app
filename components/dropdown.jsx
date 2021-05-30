import react from "react";
import Link from "next/link";
import styled from "styled-components";
import classes from "../components/UI/ui-modules/drop.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../components/Layout/UserContext";
import windowLocation from "../helpers/location";

const DropDown = ({ cls, setShow }) => {
  const [user, setUser] = useState();
  const userObj = useAuth().user;
  const uid = userObj && userObj.uid;

  useEffect(() => {
    const unsubscribe = () => setUser(userObj);
    return unsubscribe;
  }, [userObj]);

  return (
    <CoverDiv>
      <div className={cls ? classes.top : classes.hide}>
        <ul>
          <li className={classes.name}>{userObj && userObj.name}</li>
          <li onClick={() => setShow(false)}>
            <Link href={`/userpage/${uid}`}>your profile</Link>
          </li>
          <li onClick={() => setShow(false)}>
            <Link href="/login">Notification</Link>
          </li>
          <li onClick={() => setShow(false)}>
            <Link href={`/userpage/edit/createEvent/${uid}`}>
              create an event
            </Link>
          </li>
          <li onClick={() => setShow(false)}>
            <Link href="/logout">sign Out</Link>
          </li>
        </ul>
      </div>
    </CoverDiv>
  );
};
export default DropDown;

const CoverDiv = styled.div`
  width: 400px;
`;
