import firebase from "firebase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  Accordion,
  Button,
  Link,
  useAccordionToggle,
  Form,
} from "react-bootstrap";
import Plus from "../icons/plus";
import classes from "../ui-modules/accordion.module.css";
import { useAuth } from "../../Layout/UserContext";

const CustomToggle = ({ children, eventKey }) => {
  const toggleButton = useAccordionToggle(eventKey, () => {
    console.log("h");
  });
  return (
    <div onClick={toggleButton} className={classes.top}>
      {children}
    </div>
  );
};

const AddCommentsAccordion = (props) => {
  const id = props.docId;
  const user = props.user;
  const [text, settext] = useState();
  const [dis, setDis] = useState(false);
  const userid = useAuth().user && useAuth().user.uid;
  const sendsummit = (e) => {
    e.preventDefault();
    setDis(true);
    const docref = firebase.firestore().collection("comments").doc(id);
    const date = new Date();
    return docref
      .update({
        replies: firebase.firestore.FieldValue.arrayUnion({
          id: uuidv4(),
          what: text,
          when: date,
          who: userid,
          likes: [],
        }),
      })
      .then(() => setDis(false))
      .then(() => alert("You Got It"));
  };
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header style={{ backgroundColor: "rgb(218, 197, 169)" }}>
          <CustomToggle eventKey="0">
            <span style={{ width: "30px", height: "30px" }}>
              <Plus />
            </span>
            Add comments
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className={classes.body}>
            <Form onSubmit={sendsummit}>
              <Form.Group>
                <Form.Label>Add Comment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your comment"
                  onChange={(e) => settext(e.target.value)}
                  value={text}
                  className={classes.input}
                />
                <Button
                  className={classes.button}
                  // onClick={() => sendsummit()}
                  disabled={dis}
                  type="submit"
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AddCommentsAccordion;
