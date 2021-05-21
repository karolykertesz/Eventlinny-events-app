import react from "react";
import Link from "next/link";
import styled from "styled-components";
import classes from "../components/UI/ui-modules/drop.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../components/Layout/UserContext";

const DropDown = ({ cls }) => {
  const [user, setUser] = useState();
  const userObj = useAuth().user;
  const uid = userObj.uid;
  useEffect(() => {
    setUser(userObj);
  }, [userObj]);

  return (
    <CoverDiv>
      <div className={cls ? classes.top : classes.hide}>
        <ul>
          <li className={classes.name}>{userObj.name}</li>
          <li>
            <Link href={`/userpage/${userObj.uid}`}>your profile</Link>
          </li>
          <li>
            <Link href="/login">Notification</Link>
          </li>
          <li>
            <Link href="/create/[cret]">create an event</Link>
          </li>
          <li>
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
