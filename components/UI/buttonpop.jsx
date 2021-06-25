import React from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "../UI/ui-modules/buttonpop.module.css";
import Link from "next/link";

const ButtonPop = () => {
  const popover = (
    <Popover id="popover-basic" className={classes.top}>
      <Popover.Title as="h2" className="text-warning text-uppercase">
        Your Profile
      </Popover.Title>
      <Popover.Content>
        <Card>
          <Card.Header className={classes.header}>
            <Card.Title>click to navigate</Card.Title>
          </Card.Header>
          <Card.Body></Card.Body>
        </Card>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button
        className={classes.popButton}
        style={{
          backgroundColor: "#c49e7d",
          border: "none",
          outline: "none",
          boxShadow: "rgba(0,0,0,0.2)",
        }}
      >
        your Profile
      </Button>
    </OverlayTrigger>
  );
};
export default ButtonPop;
