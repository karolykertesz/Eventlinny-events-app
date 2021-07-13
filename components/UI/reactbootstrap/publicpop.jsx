import React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import classes from "../ui-modules/publicpop.module.css";
const PublicPop = (props) => {
  const popover = (
    <Popover>
      <Popover.Title as="h3" className={classes.title}>
        {props.title}
      </Popover.Title>
      <Popover.Content className={classes.body}>
        {props.content}
      </Popover.Content>
    </Popover>
  );
  return (
    <div>
      <OverlayTrigger
        placement="bottom"
        overlay={popover}
        delay={{ show: 250, hide: 400 }}
      >
        <button className={classes.btnTriger}>{props.children}</button>
      </OverlayTrigger>
    </div>
  );
};
export default PublicPop;
