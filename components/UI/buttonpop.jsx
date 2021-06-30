import React from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "../UI/ui-modules/buttonpop.module.css";
import Link from "next/link";
import { useAuth } from "../Layout/UserContext";

const ButtonPop = () => {
  const user = useAuth().user && useAuth().user;
  const popover = (
    <Popover id="popover-basic" className={classes.top}>
      <Popover.Title as="h2" className="text-warning text-uppercase">
        Your Profile
      </Popover.Title>
      <Popover.Content>
        <Card>
          <Card.Header className={classes.header}>
            <Card.Title>{user && user.name}</Card.Title>
          </Card.Header>
          <Card.Body className={classes.body}>
            <div className={classes.link}>
              <Link href={`/userpage/${user && user.uid}`}>Your Info</Link>
            </div>
            <div className={classes.link}>
              <Link href={`/userpage/edit/createEvent/${user && user.uid}`}>
                create an event
              </Link>
            </div>
            <div className={classes.link}>
              <Link href={`/events/calendar/${user && user.uid}`}>
                Go Premium
              </Link>
            </div>
            <div className={classes.link}>
              <Link href={`/events/calendar/${user && user.uid}`}>
                Create chat
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button
        aria-pressed="false"
        className={classes.popButton}
        style={{
          backgroundColor: "#c49e7d",
          border: "none",
          outline: "none",
          boxShadow: "none",
          fontSize: "16px",
          fontWeight: "500",
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "papayawhip",
          textAlign: "center",
          textTransform: "capitalize",
          // marginTop: "3px",
        }}
      >
        your Profile
      </Button>
    </OverlayTrigger>
  );
};
export default ButtonPop;