import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classes from "../ui-modules/modal.module.css";

const Reactmodal = (props) => {
  return (
    <div>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
        className={classes.top}
        {...props}
      >
        <Modal.Header closeButton className={classes.head}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className={classes.title}
          >
            Notifications
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.body}>
          <p>Would you Like to have a remainder?</p>
        </Modal.Body>
        <Modal.Footer className={classes.footer}>
          <Button onClick={props.onHide} className="btn-danger">
            Close
          </Button>
          <Button onClick={props.add} className="btn-success">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reactmodal;
