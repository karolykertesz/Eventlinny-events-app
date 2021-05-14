import react from "react";
import Link from "next/link";
import styled from "styled-components";
import classes from "../components/UI/ui-modules/drop.module.css";
const DropDown = ({ cls, uid }) => {
  return (
    <CoverDiv>
      <div className={cls ? classes.top : classes.hide}>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>Notifications</li>
          <li>Your Events</li>
          <li>Sign Out</li>
        </ul>
      </div>
    </CoverDiv>
  );
};
export default DropDown;

const CoverDiv = styled.div`
  width: 400px;
`;
