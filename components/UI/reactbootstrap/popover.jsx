import React from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import classes from "../ui-modules/popover.module.css";
import Table from "react-bootstrap/Table";

export const PopButton = (props) => {
  const popover = (
    <Popover id="popover-basic" {...props} className={classes.top}>
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
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="warning" className="text-white text-uppercase">
          {props.text}
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export const TablePopOver = (props) => {
  const popover = (
    <Popover id="popover-basic" {...props} className={classes.top}>
      <Popover.Title as="h3" className={classes.title}>
        Your Event
      </Popover.Title>
      <Popover.Content className={classes.body}>
        <Table responsive className={classes.table}>
          <thead>
            <tr>
              <th>Your eventlinny Event</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>category</td>
              <td>{props.category}</td>
            </tr>
            <tr>
              <td>events starts</td>
              <td>{props.start}</td>
            </tr>
            <tr>
              <td>Event Ends</td>
              <td>{props.end}</td>
            </tr>
            <tr>
              <td>Event Location</td>
              <td>
                {props.location}/{props.country}
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td colSpan="3">{props.description}</td>
            </tr>
          </tbody>
        </Table>
      </Popover.Content>
    </Popover>
  );
  return (
    <div>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <button className={classes.btn}>My Event</button>
      </OverlayTrigger>
    </div>
  );
};
