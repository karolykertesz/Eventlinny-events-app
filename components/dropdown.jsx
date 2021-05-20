import react from "react";
import Link from "next/link";
import styled from "styled-components";
import classes from "../components/UI/ui-modules/drop.module.css";
import { useEffect, useState } from "react";
import gettoken from "../helpers/gettoken";

const DropDown = ({ cls }) => {
  const [user, setUser] = useState();
  const uid = user !== undefined ? user.userIn.uid : undefined;

  useEffect(() => {
    const getTo = async () => {
      const user = await gettoken();
      setUser(user);
    };
    getTo();
    return;
  }, []);
  return (
    <CoverDiv>
      <div className={cls ? classes.top : classes.hide}>
        <ul>
          <li>
            <Link href={`/userpage/${uid}`}>your profile</Link>
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
