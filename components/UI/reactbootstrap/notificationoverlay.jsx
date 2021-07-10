import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import classes from "../ui-modules/notification.pop.module.css";

const NotificationOvarlay = (props) => {
  const { body } = props;
  const timeCreated = new Date(body).toLocaleDateString("EN-hu", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" className={classes.title}>
        Click Me to see the Whole Notification!
      </Popover.Title>
      <Popover.Content className={classes.body}>
        Notification created on: {timeCreated}
      </Popover.Content>
    </Popover>
  );
  return (
    <div>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={popover}
      >
        {props.children}
      </OverlayTrigger>
    </div>
  );
};
export default NotificationOvarlay;
