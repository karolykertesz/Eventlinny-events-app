import React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import classes from "../ui-modules/publicpop.module.css";
const PublicPop = (props) => {
  const { item } = props;
  const popover = (
    <Popover>
      <Popover.Title as="h3" className={classes.title}>
        {item.category}
      </Popover.Title>
      <Popover.Content className={classes.body}>
        <table>
          <thead>
            <tr>
              <td>Host: {item.host}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id: {item.id}</td>
            </tr>
            <tr>
              <td>Current Users: {item.active_users.length}</td>
            </tr>
          </tbody>
        </table>
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
